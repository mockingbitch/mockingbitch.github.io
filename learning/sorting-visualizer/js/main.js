/**
 * main.js — Nối các mảnh lại: dữ liệu → thuật toán → chuỗi bước → đầu phát → màn hình.
 *
 *   data.js       sinh mảng đầu vào
 *   algorithms.js chạy thuật toán, thu về chuỗi bước
 *   player.js     phát chuỗi bước theo thời gian
 *   renderer.js   vẽ trạng thái lên canvas
 *   file này      cập nhật phần HTML còn lại (mã giả, thuyết minh, bộ đếm)
 */

import { ALGORITHMS, getAlgorithm, recordSteps } from './algorithms.js';
import { EXPLAIN, COMPARISON_NOTE } from './explain.js';
import { DISTRIBUTIONS, getDistribution, makeArray, MAX_VALUE } from './data.js';
import { createRenderer } from './renderer.js';
import { createPlayer } from './player.js';
import { createAudio } from './audio.js';

const $ = (id) => document.getElementById(id);

const el = {
  algo: $('algo'), dist: $('dist'), size: $('size'), sizeOut: $('sizeOut'),
  speed: $('speed'), speedOut: $('speedOut'),
  shuffle: $('shuffle'), play: $('play'), next: $('next'), prev: $('prev'),
  toStart: $('toStart'), toEnd: $('toEnd'), sound: $('sound'),
  canvas: $('canvas'), aux: $('aux'), legend: $('legend'),
  scrub: $('scrub'), posOut: $('posOut'), narration: $('narration'), stats: $('stats'),
  algoName: $('algoName'), pseudocode: $('pseudocode'),
  idea: $('idea'), mechanism: $('mechanism'), complexity: $('complexity'),
  strengths: $('strengths'), weaknesses: $('weaknesses'), watch: $('watch'),
  summary: $('summary'), lowerBound: $('lowerBound'), files: $('files'),
};

const renderer = createRenderer(el.canvas);
const audio = createAudio();

let current = { algo: ALGORITHMS[0], array: [], maxValue: MAX_VALUE };
let codeLines = [];       // các <li> của mã giả
let lastLine = -1;
let auxCells = [];        // cache ô của mảng phụ

const player = createPlayer({
  onFrame: render,
  onFinish: () => updatePlayButton(),
});

/* ------------------------------------------------------------------ *
 * Khởi tạo giao diện tĩnh
 * ------------------------------------------------------------------ */

function fillSelects() {
  el.algo.innerHTML = ALGORITHMS
    .map((a) => `<option value="${a.id}">${a.name} — ${a.vi}</option>`).join('');
  el.dist.innerHTML = DISTRIBUTIONS
    .map((d) => `<option value="${d.id}">${d.label}</option>`).join('');
}

function buildLegend() {
  const items = [
    ['var(--bar)', 'chưa xét'],
    ['var(--bar-compare)', 'đang so sánh'],
    ['var(--bar-swap)', 'đang đổi chỗ / ghi'],
    ['var(--bar-pivot)', 'phần tử chốt'],
    ['var(--bar-sorted)', 'đã đúng thứ tự'],
    ['var(--hold)', 'giá trị đang cầm trên tay'],
  ];
  el.legend.innerHTML = items
    .map(([c, label]) => `<span><i style="background:${c}"></i>${label}</span>`).join('');
}

function buildSummary() {
  const head = `<thead><tr>
      <th>Thuật toán</th><th>Tốt nhất</th><th>Trung bình</th><th>Xấu nhất</th>
      <th>Bộ nhớ</th><th>Ổn định</th><th>Tại chỗ</th><th>Dùng khi</th>
    </tr></thead>`;
  const rows = ALGORITHMS.map((a) => {
    const e = EXPLAIN[a.id];
    return `<tr data-id="${a.id}">
      <td>${a.name}</td>
      <td class="mono">${e.complexity.best}</td>
      <td class="mono">${e.complexity.avg}</td>
      <td class="mono">${e.complexity.worst}</td>
      <td class="mono">${e.complexity.space}</td>
      <td>${e.stable ? '<span class="yes">có</span>' : '<span class="no">không</span>'}</td>
      <td>${e.inPlace ? '<span class="yes">có</span>' : '<span class="no">không</span>'}</td>
      <td>${e.strengths[0]}</td>
    </tr>`;
  }).join('');
  el.summary.innerHTML = head + `<tbody>${rows}</tbody>`;
  el.lowerBound.textContent = COMPARISON_NOTE.trim();
}

function buildFileList() {
  const files = [
    ['js/steps.js', 'định nghĩa “bước” và hàm áp dụng một bước lên trạng thái'],
    ['js/algorithms.js', '9 generator thuật toán + mã giả tương ứng'],
    ['js/explain.js', 'nội dung giải thích, độ phức tạp, điểm mạnh/yếu'],
    ['js/player.js', 'đầu phát: chạy, dừng, tua tới/lui, kéo thanh trượt'],
    ['js/renderer.js', 'vẽ canvas từ trạng thái (thuần, không giữ state riêng)'],
    ['js/data.js', 'sinh các dạng mảng đầu vào'],
    ['js/audio.js', 'ánh xạ giá trị thành cao độ âm thanh'],
    ['js/main.js', 'nối tất cả lại và cập nhật DOM'],
    ['test/verify.mjs', 'kiểm chứng thuật toán đúng và chuỗi bước phát lại đúng'],
  ];
  el.files.innerHTML = files.map(([f, d]) => `<li><code>${f}</code> — ${d}</li>`).join('');
}

/* ------------------------------------------------------------------ *
 * Đổi thuật toán / đổi dữ liệu
 * ------------------------------------------------------------------ */

function speedFromSlider(v) {
  // 0 → 1 bước/giây, 100 → 500 bước/giây (thang mũ để đầu thang chỉnh mượt)
  return Math.pow(500, v / 100);
}

function renderPseudocode(algo) {
  el.algoName.textContent = `· ${algo.vi}`;
  el.pseudocode.innerHTML = algo.pseudocode
    .map((line) => {
      const isComment = line.trim().startsWith('//');
      return `<li class="${isComment ? 'comment' : ''}">${escapeHtml(line) || '&nbsp;'}</li>`;
    }).join('');
  codeLines = [...el.pseudocode.children];
  lastLine = -1;
}

function renderExplain(algo) {
  const e = EXPLAIN[algo.id];
  el.idea.innerHTML = e.idea;
  el.mechanism.innerHTML = e.mechanism.map((m) => `<li>${m}</li>`).join('');
  el.complexity.innerHTML = `
    <tr><td>Trường hợp tốt nhất</td><td>${e.complexity.best}</td></tr>
    <tr><td>Trung bình</td><td>${e.complexity.avg}</td></tr>
    <tr><td>Trường hợp xấu nhất</td><td>${e.complexity.worst}</td></tr>
    <tr><td>Bộ nhớ phụ</td><td>${e.complexity.space}</td></tr>
    <tr><td>Ổn định (stable)</td><td>${e.stable ? 'có' : 'không'}</td></tr>
    <tr><td>Sắp xếp tại chỗ</td><td>${e.inPlace ? 'có' : 'không'}</td></tr>`;
  el.strengths.innerHTML = e.strengths.map((s) => `<li>${s}</li>`).join('');
  el.weaknesses.innerHTML = e.weaknesses.map((s) => `<li>${s}</li>`).join('');
  el.watch.innerHTML = e.watch;

  for (const tr of el.summary.querySelectorAll('tbody tr')) {
    tr.classList.toggle('current', tr.dataset.id === algo.id);
  }
}

/** Sinh mảng mới rồi nạp lại chuỗi bước. */
function regenerate(newArray = true) {
  const algo = getAlgorithm(el.algo.value);
  const n = Number(el.size.value);

  if (newArray || current.array.length !== n) {
    current.array = makeArray(el.dist.value, n);
  }
  current.algo = algo;
  current.maxValue = Math.max(MAX_VALUE, ...current.array);

  const { steps } = recordSteps(algo, current.array);

  renderPseudocode(algo);
  renderExplain(algo);

  el.scrub.max = String(steps.length);
  el.scrub.value = '0';
  player.load(current.array, steps);
  updatePlayButton();
}

/* ------------------------------------------------------------------ *
 * Vẽ một khung hình
 * ------------------------------------------------------------------ */

function render(state, info) {
  renderer.draw(state, { maxValue: current.maxValue, tween: info.tween });

  // dòng mã giả đang chạy
  if (state.line !== lastLine) {
    if (codeLines[lastLine]) codeLines[lastLine].classList.remove('active');
    if (codeLines[state.line]) codeLines[state.line].classList.add('active');
    lastLine = state.line;
  }

  // thuyết minh
  el.narration.innerHTML = state.text
    ? `${opBadge(state.step)}${escapeHtml(state.text)}`
    : 'Bấm <strong>Chạy</strong> để bắt đầu.';

  // bộ đếm
  const s = state.stats;
  el.stats.innerHTML = [
    ['So sánh', s.comparisons],
    ['Đổi chỗ', s.swaps],
    ['Lần ghi mảng', s.writes],
    ['Lượt truy cập', s.reads + s.writes],
  ].map(([k, v]) => `<div class="stat">${k}<b>${v.toLocaleString('vi-VN')}</b></div>`).join('');

  // thanh tua
  if (el.scrub.value !== String(info.position)) el.scrub.value = String(info.position);
  el.posOut.textContent = `bước ${info.position.toLocaleString('vi-VN')} / ${info.total.toLocaleString('vi-VN')}`;

  renderAux(state.aux);

  // âm thanh (chỉ khi chạy đủ chậm để nghe ra)
  const st = state.step;
  if (audio.enabled && info.playing && player.speed < 90 && st) {
    if (st.op === 'compare' || st.op === 'swap' || st.op === 'write') {
      const idx = st.i ?? 0;
      audio.ping(state.array[idx] ?? 0, current.maxValue, st.op);
    }
  }
}

function opBadge(step) {
  if (!step) return '';
  const map = {
    compare: ['so sánh', 'var(--bar-compare)'],
    swap: ['đổi chỗ', 'var(--bar-swap)'],
    write: ['ghi', 'var(--bar-swap)'],
    sorted: ['chốt', 'var(--bar-sorted)'],
    pivot: ['chốt phân hoạch', 'var(--bar-pivot)'],
    range: ['đoạn xử lý', 'var(--accent)'],
    aux: ['mảng đếm', 'var(--accent)'],
    note: ['ghi chú', 'var(--muted)'],
  };
  const [label, color] = map[step.op] || map.note;
  return `<b style="color:${color};font:600 11px/1 var(--mono);text-transform:uppercase;letter-spacing:.05em;margin-right:8px">${label}</b>`;
}

function renderAux(aux) {
  if (!aux) {
    if (!el.aux.hidden) { el.aux.hidden = true; auxCells = []; }
    return;
  }
  el.aux.hidden = false;
  el.aux.querySelector('.aux-label').textContent = aux.label;

  const holder = el.aux.querySelector('.aux-cells');
  if (auxCells.length !== aux.values.length) {
    holder.innerHTML = aux.values
      .map((v, i) => `<div class="aux-cell"><span class="val">${v}</span><span class="idx">${i}</span></div>`).join('');
    auxCells = [...holder.children];
  } else {
    for (let i = 0; i < aux.values.length; i++) {
      const val = String(aux.values[i]);
      const valNode = auxCells[i].firstChild;
      if (valNode.textContent !== val) valNode.textContent = val;
    }
  }
  for (let i = 0; i < auxCells.length; i++) {
    auxCells[i].classList.toggle('on', i === aux.highlight);
  }
}

function updatePlayButton() {
  const atEnd = player.position >= player.total && player.total > 0;
  el.play.textContent = player.playing ? '⏸ Dừng' : (atEnd ? '↻ Chạy lại' : '▶ Chạy');
}

/* ------------------------------------------------------------------ *
 * Sự kiện
 * ------------------------------------------------------------------ */

function bind() {
  el.algo.addEventListener('change', () => regenerate(false));   // giữ nguyên mảng để so sánh công bằng
  el.dist.addEventListener('change', () => regenerate(true));
  el.size.addEventListener('input', () => {
    el.sizeOut.textContent = el.size.value;
  });
  el.size.addEventListener('change', () => regenerate(true));

  el.speed.addEventListener('input', () => {
    const sps = speedFromSlider(Number(el.speed.value));
    player.setSpeed(sps);
    el.speedOut.textContent = `${sps < 10 ? sps.toFixed(1) : Math.round(sps)} bước/giây`;
  });

  el.shuffle.addEventListener('click', () => regenerate(true));
  el.play.addEventListener('click', () => { player.toggle(); updatePlayButton(); });
  el.next.addEventListener('click', () => { player.pause(); player.next(); updatePlayButton(); });
  el.prev.addEventListener('click', () => { player.pause(); player.prev(); updatePlayButton(); });
  el.toStart.addEventListener('click', () => { player.pause(); player.reset(); updatePlayButton(); });
  el.toEnd.addEventListener('click', () => { player.pause(); player.end(); updatePlayButton(); });

  el.sound.addEventListener('click', () => {
    audio.enabled = !audio.enabled;
    el.sound.textContent = audio.enabled ? '🔊' : '🔇';
    el.sound.setAttribute('aria-pressed', String(audio.enabled));
  });

  el.scrub.addEventListener('input', () => {
    player.pause();
    player.seek(Number(el.scrub.value));
    updatePlayButton();
  });

  document.addEventListener('keydown', (e) => {
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLSelectElement) {
      if (e.key !== ' ') return;
    }
    if (e.key === ' ') { e.preventDefault(); player.toggle(); updatePlayButton(); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); player.pause(); player.next(); updatePlayButton(); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); player.pause(); player.prev(); updatePlayButton(); }
    else if (e.key === 'r' || e.key === 'R') { regenerate(true); }
  });

  const ro = new ResizeObserver(() => {
    renderer.resize();
    renderer.draw(player.state, { maxValue: current.maxValue, tween: 1 });
  });
  ro.observe(el.canvas);

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    renderer.resize();
    renderer.draw(player.state, { maxValue: current.maxValue, tween: 1 });
  });
}

/**
 * Cho phép chia sẻ đúng một tình huống qua URL, ví dụ:
 *   ?algo=quick&dist=sorted&n=32&step=250
 * Trả về số bước cần tua tới, hoặc null.
 */
function applyUrlParams() {
  const q = new URLSearchParams(location.search);

  const algo = q.get('algo');
  if (algo && ALGORITHMS.some((a) => a.id === algo)) el.algo.value = algo;

  const dist = q.get('dist');
  if (dist && DISTRIBUTIONS.some((d) => d.id === dist)) el.dist.value = dist;

  const n = Number(q.get('n'));
  if (Number.isFinite(n) && n > 0) {
    el.size.value = String(Math.max(Number(el.size.min), Math.min(Number(el.size.max), Math.round(n))));
    el.sizeOut.textContent = el.size.value;
  }

  const step = Number(q.get('step'));
  return Number.isFinite(step) && q.has('step') ? step : null;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}

/* ------------------------------------------------------------------ *
 * Chạy
 * ------------------------------------------------------------------ */

fillSelects();
buildLegend();
buildSummary();
buildFileList();
bind();

el.sizeOut.textContent = el.size.value;
el.speed.dispatchEvent(new Event('input'));
renderer.resize();

const startStep = applyUrlParams();
regenerate(true);
if (startStep != null) { player.seek(startStep); updatePlayButton(); }
