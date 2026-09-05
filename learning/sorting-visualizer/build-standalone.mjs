/**
 * build-standalone.mjs — gộp toàn bộ trang thành MỘT file HTML.
 *
 * Vì sao cần: các file js/*.js dùng ES module, mà trình duyệt chặn module
 * khi mở bằng file:// (chính sách CORS). Bản gộp không có import nào nên
 * mở trực tiếp bằng cách nhấp đúp vào file là chạy được — tiện để gửi cho
 * người khác hoặc dùng khi không có server.
 *
 * Cách gộp rất đơn giản vì các module ở đây chỉ import lẫn nhau: bỏ dòng
 * `import`, bỏ từ khoá `export`, rồi nối theo đúng thứ tự phụ thuộc.
 *
 * Dùng:
 *   node build-standalone.mjs                    → standalone.html
 *   node build-standalone.mjs out.html           → ghi ra file khác
 *   node build-standalone.mjs out.html --fragment → không kèm <html>/<head>/<body>
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const root = dirname(fileURLToPath(import.meta.url));

// Thứ tự phụ thuộc: module nào được import phải đứng trước.
const ORDER = ['steps.js', 'algorithms.js', 'explain.js', 'data.js', 'renderer.js', 'player.js', 'audio.js', 'main.js'];

function stripModuleSyntax(src, file) {
  const out = [];
  for (const line of src.split('\n')) {
    if (/^import\s.+from\s+['"].+['"];?\s*$/.test(line)) continue;      // bỏ import
    if (/^export\s*\{[^}]*\}\s*;?\s*$/.test(line)) continue;            // bỏ `export { ... }`
    out.push(line.replace(/^export\s+(?=(const|let|var|function|class|async)\b)/, ''));
  }
  const body = out.join('\n').trim();
  return `/* ==== ${file} ==== */\n${body}\n`;
}

const bundle = ORDER
  .map((f) => stripModuleSyntax(readFileSync(join(root, 'js', f), 'utf8'), `js/${f}`))
  .join('\n');

const css = readFileSync(join(root, 'css', 'style.css'), 'utf8');
let html = readFileSync(join(root, 'index.html'), 'utf8');

html = html
  .replace('<link rel="stylesheet" href="css/style.css">', `<style>\n${css}\n</style>`)
  .replace('<script type="module" src="js/main.js"></script>', `<script type="module">\n${bundle}\n</script>`);

const args = process.argv.slice(2);
const fragment = args.includes('--fragment');
const outArg = args.find((a) => !a.startsWith('--')) || 'standalone.html';

if (fragment) {
  // Chỉ giữ phần bên trong <body> + <title> + <style>, cho nơi tự bọc sẵn khung HTML.
  const title = html.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? '';
  const style = html.match(/<style>[\s\S]*?<\/style>/)?.[0] ?? '';
  const body = html.match(/<body>([\s\S]*?)<\/body>/)?.[1] ?? '';
  html = `<title>${title}</title>\n${style}\n${body}`;
}

const outPath = resolve(root, outArg);
writeFileSync(outPath, html);

const kb = (html.length / 1024).toFixed(1);
console.log(`✓ ${outArg} — ${kb} KB (${ORDER.length} module JS + CSS đã gộp${fragment ? ', dạng fragment' : ''})`);
