/**
 * smoke.mjs — kiểm tra "khớp nối" giữa các mảnh, những lỗi mà test thuật toán
 * không bắt được nhưng làm trang trắng xoá khi mở trên trình duyệt:
 *
 *   1. Mọi file JS/CSS đều đúng cú pháp.
 *   2. Mọi id mà main.js gọi qua $('...') đều tồn tại trong index.html.
 *   3. Mọi đường dẫn trong index.html đều trỏ tới file có thật.
 *   4. Mọi thuật toán đều có mục giải thích trong explain.js.
 *   5. Mọi `line` trong các bước đều là chỉ số hợp lệ của mã giả
 *      (nếu không, phần tô sáng mã giả sẽ nhảy lung tung).
 *
 * Chạy:  node test/smoke.mjs
 */

import { readFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import { ALGORITHMS, recordSteps } from '../js/algorithms.js';
import { EXPLAIN } from '../js/explain.js';
import { DISTRIBUTIONS, makeArray } from '../js/data.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const problems = [];
const check = (ok, msg) => { if (!ok) problems.push(msg); };

/* 1. cú pháp -------------------------------------------------------- */
const JS_FILES = ['steps.js', 'algorithms.js', 'explain.js', 'data.js', 'renderer.js', 'player.js', 'audio.js', 'main.js'];
for (const f of JS_FILES) {
  const p = join(root, 'js', f);
  try { execFileSync(process.execPath, ['--check', p], { stdio: 'pipe' }); }
  catch (e) { problems.push(`js/${f} — lỗi cú pháp:\n${e.stderr?.toString().slice(0, 400)}`); }
}

/* 2. id trong HTML vs $('...') trong main.js ------------------------- */
const html = readFileSync(join(root, 'index.html'), 'utf8');
const mainJs = readFileSync(join(root, 'js', 'main.js'), 'utf8');

const htmlIds = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]));
const usedIds = new Set([...mainJs.matchAll(/\$\('([^']+)'\)/g)].map((m) => m[1]));
for (const id of usedIds) check(htmlIds.has(id), `main.js dùng #${id} nhưng index.html không có id đó`);

/* 3. đường dẫn tài nguyên ------------------------------------------- */
for (const m of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
  const url = m[1];
  if (url.startsWith('data:') || url.startsWith('http')) continue;
  check(existsSync(join(root, url)), `index.html trỏ tới "${url}" nhưng file không tồn tại`);
}

/* 4. thuật toán ↔ giải thích ---------------------------------------- */
for (const a of ALGORITHMS) {
  const e = EXPLAIN[a.id];
  check(!!e, `Thiếu mục giải thích cho "${a.id}" trong explain.js`);
  if (!e) continue;
  for (const k of ['idea', 'mechanism', 'complexity', 'strengths', 'weaknesses', 'watch']) {
    check(e[k] != null, `EXPLAIN.${a.id} thiếu trường "${k}"`);
  }
  for (const k of ['best', 'avg', 'worst', 'space']) {
    check(e.complexity?.[k] != null, `EXPLAIN.${a.id}.complexity thiếu "${k}"`);
  }
}

/* 5. line hợp lệ + mọi bước đều có thuyết minh ----------------------- */
for (const a of ALGORITHMS) {
  const maxLine = a.pseudocode.length - 1;
  for (const dist of DISTRIBUTIONS) {
    const { steps } = recordSteps(a, makeArray(dist.id, 24));
    for (const s of steps) {
      if (s.line == null) { problems.push(`${a.name}: có bước thiếu "line" (${s.op})`); break; }
      if (s.line < 0 || s.line > maxLine) {
        problems.push(`${a.name} (${dist.id}): line=${s.line} nằm ngoài mã giả 0..${maxLine} (op=${s.op})`);
        break;
      }
      if (!s.text) { problems.push(`${a.name}: bước ${s.op} không có lời thuyết minh`); break; }
    }
  }
}

/* kết quả ------------------------------------------------------------ */
if (problems.length === 0) {
  console.log(`  ✓ cú pháp ${JS_FILES.length} file JS`);
  console.log(`  ✓ ${usedIds.size} id DOM khớp giữa main.js và index.html`);
  console.log(`  ✓ tài nguyên trong index.html tồn tại đầy đủ`);
  console.log(`  ✓ ${ALGORITHMS.length} thuật toán đều có mục giải thích đầy đủ`);
  console.log(`  ✓ mọi bước đều có thuyết minh và trỏ đúng dòng mã giả`);
  console.log('\nSmoke test: đạt.');
} else {
  for (const p of problems) console.error('  ✗ ' + p);
  console.error(`\n${problems.length} vấn đề.`);
  process.exit(1);
}
