/**
 * verify.mjs — kiểm chứng hai thứ cho từng thuật toán:
 *
 *   1. Thuật toán sắp xếp ĐÚNG (kết quả bằng với [...a].sort()).
 *   2. Chuỗi bước nó sinh ra, khi PHÁT LẠI trên mảng gốc, cho ra đúng
 *      mảng kết quả đó. Đây mới là điều visualizer thực sự hiển thị —
 *      nếu quên `yield` một thao tác thì animation sẽ sai dù thuật toán đúng.
 *
 * Chạy:  node test/verify.mjs
 */

import { ALGORITHMS, recordSteps } from '../js/algorithms.js';
import { replay } from '../js/steps.js';

const CASES = {
  'ngẫu nhiên':        (n) => Array.from({ length: n }, () => 1 + Math.floor(Math.random() * 200)),
  'đã sắp xếp':        (n) => Array.from({ length: n }, (_, i) => i + 1),
  'đảo ngược':         (n) => Array.from({ length: n }, (_, i) => n - i),
  'toàn giá trị bằng nhau': (n) => Array.from({ length: n }, () => 7),
  'ít giá trị khác nhau':   (n) => Array.from({ length: n }, () => 1 + 10 * Math.floor(Math.random() * 4)),
  'gần như đã sắp xếp': (n) => {
    const a = Array.from({ length: n }, (_, i) => i + 1);
    if (n < 2) return a;
    for (let k = 0; k < Math.max(1, n >> 3); k++) {
      const i = Math.floor(Math.random() * n), j = Math.floor(Math.random() * n);
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  },
};

const SIZES = [0, 1, 2, 3, 7, 16, 33, 64];

const eq = (x, y) => x.length === y.length && x.every((v, i) => v === y[i]);

let pass = 0, fail = 0;
const failures = [];

for (const algo of ALGORITHMS) {
  let steps = 0;
  for (const [caseName, make] of Object.entries(CASES)) {
    for (const n of SIZES) {
      const input = make(n);
      const expected = input.slice().sort((p, q) => p - q);

      const rec = recordSteps(algo, input);
      steps += rec.steps.length;

      const replayed = replay(input, rec.steps, rec.steps.length).array;
      const label = `${algo.name} · ${caseName} · n=${n}`;

      if (!eq(rec.result, expected)) {
        fail++; failures.push(`${label} — thuật toán sai: ${rec.result} ≠ ${expected}`);
      } else if (!eq(replayed, expected)) {
        fail++; failures.push(`${label} — phát lại các bước sai: ${replayed} ≠ ${expected}`);
      } else {
        pass++;
      }
    }
  }
  console.log(`  ${fail === 0 ? '✓' : '·'} ${algo.name.padEnd(15)} ${String(steps).padStart(7)} bước đã sinh & phát lại`);
}

console.log(`\n${pass} trường hợp đạt, ${fail} lỗi.`);
for (const f of failures) console.error('  ✗ ' + f);
process.exit(fail === 0 ? 0 : 1);
