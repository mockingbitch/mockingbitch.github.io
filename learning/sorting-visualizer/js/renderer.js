/**
 * renderer.js — Vẽ trạng thái mảng lên <canvas>.
 *
 * Renderer là hàm THUẦN theo nghĩa: cùng một `state` thì luôn vẽ ra cùng
 * một khung hình. Nó không biết gì về thuật toán, chỉ biết đọc state:
 *   array, sorted, range, pivot, marks, step
 *
 * Màu lấy từ biến CSS nên trang tự đổi màu theo chế độ sáng/tối mà
 * renderer không cần biết gì thêm.
 */

export function createRenderer(canvas) {
  const ctx = canvas.getContext('2d');
  let colors = readColors(canvas);
  let width = 0, height = 0;

  function readColors(el) {
    const cs = getComputedStyle(el);
    const get = (name, fallback) => (cs.getPropertyValue(name).trim() || fallback);
    return {
      bar:        get('--bar', '#7c8db5'),
      barCompare: get('--bar-compare', '#f5a524'),
      barSwap:    get('--bar-swap', '#e5484d'),
      barSorted:  get('--bar-sorted', '#30a46c'),
      barPivot:   get('--bar-pivot', '#8e4ec6'),
      rangeBg:    get('--range-bg', 'rgba(124,141,181,.14)'),
      label:      get('--label', '#334'),
      muted:      get('--muted', '#8a93a6'),
      hold:       get('--hold', '#0091ff'),
      panel:      get('--panel', '#ffffff'),
    };
  }

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    width = Math.max(1, Math.floor(rect.width));
    height = Math.max(1, Math.floor(rect.height));
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    colors = readColors(canvas);
  }

  /**
   * @param {object} state    trạng thái từ steps.js
   * @param {object} opts     { maxValue, tween } — tween ∈ [0,1] cho hiệu ứng đổi chỗ
   */
  function draw(state, opts = {}) {
    const a = state.array;
    const n = a.length;
    const maxValue = opts.maxValue || Math.max(1, ...a);
    const tween = opts.tween == null ? 1 : opts.tween;

    ctx.clearRect(0, 0, width, height);
    if (n === 0) return;

    const padX = 10;
    const footer = 46;                     // chỗ cho nhãn giá trị & các làn con trỏ
    const plotW = width - padX * 2;
    const plotH = height - footer - 8;
    const slot = plotW / n;
    const gap = Math.min(4, Math.max(0.5, slot * 0.16));
    const barW = Math.max(1, slot - gap);
    const xOf = (i) => padX + i * slot + gap / 2;
    const hOf = (v) => Math.max(2, (v / maxValue) * plotH);
    const baseY = height - footer;

    // 1. Nền của đoạn đang được xử lý
    if (state.range) {
      const [from, to] = state.range;
      ctx.fillStyle = colors.rangeBg;
      ctx.fillRect(xOf(from) - gap / 2, 4, (to - from + 1) * slot, baseY - 4 + 6);
    }

    const step = state.step;
    const active = new Set();
    let swapPair = null;
    if (step) {
      if (step.op === 'compare') { active.add(step.i); active.add(step.j); }
      if (step.op === 'swap')    { swapPair = [step.i, step.j]; }
      if (step.op === 'write')   { active.add(step.i); }
    }

    const colorOf = (i) => {
      if (state.pivot === i) return colors.barPivot;
      if (swapPair && (i === swapPair[0] || i === swapPair[1])) return colors.barSwap;
      if (active.has(i)) return step && step.op === 'write' ? colors.barSwap : colors.barCompare;
      if (state.sorted.has(i)) return colors.barSorted;
      return colors.bar;
    };

    // 2. Các cột
    const showValues = barW >= 16;
    ctx.textAlign = 'center';
    ctx.font = '600 11px ui-monospace, SFMono-Regular, Menlo, monospace';

    // Hai cột đang đổi chỗ luôn gặp nhau đúng điểm giữa quãng đường, nên nếu
    // cả hai cùng trượt dưới đất thì chúng đè lên nhau. Cách xử lý: cột THẤP
    // hơn được nhấc bổng bay qua đầu cột cao hơn, và được vẽ sau cùng.
    const animating = swapPair && tween < 1;
    let flyer = -1, runner = -1, flyLift = 0;
    if (animating) {
      const [p, q] = swapPair;
      const flyFirst = a[p] <= a[q];
      flyer = flyFirst ? p : q;
      runner = flyFirst ? q : p;
      const clearance = hOf(a[runner]) + 10;              // đủ cao để vượt hẳn cột kia
      flyLift = Math.min(clearance, baseY - hOf(a[flyer]) - 4);
    }

    const order = [];
    for (let i = 0; i < n; i++) if (i !== flyer && i !== runner) order.push(i);
    if (animating) order.push(runner, flyer);   // cột bay vẽ cuối → nằm trên cùng

    for (const i of order) {
      let x = xOf(i);
      let lift = 0;

      if (animating) {
        const other = i === flyer ? runner : i === runner ? flyer : -1;
        if (other >= 0) x = lerp(xOf(other), xOf(i), tween);
        if (i === flyer) lift = arc(tween) * flyLift;
      }

      const h = hOf(a[i]);
      const y = baseY - h - lift;

      ctx.fillStyle = colorOf(i);
      roundRect(ctx, x, y, barW, h, Math.min(3, barW / 3));
      ctx.fill();

      // Cột đang bay được viền bằng màu nền: hai cột cùng màu đỏ, nếu không
      // viền thì lúc chồng nhau trông như một khối duy nhất.
      if (i === flyer) {
        ctx.strokeStyle = colors.panel;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      if (showValues) {
        ctx.fillStyle = colors.label;
        ctx.fillText(String(a[i]), xOf(i) + barW / 2, baseY + 13);
      }
    }

    // 3. "Quân bài" đang cầm trên tay (insertion / shell sort)
    const marks = state.marks || {};
    if (marks.hold) {
      const at = clamp(marks.hold.at, 0, n - 1);
      const h = hOf(marks.hold.value);
      const x = xOf(at);
      const y = baseY - h - 24;
      ctx.save();
      ctx.globalAlpha = 0.28;
      ctx.fillStyle = colors.hold;
      roundRect(ctx, x, y, barW, h, Math.min(3, barW / 3));
      ctx.fill();
      ctx.restore();
      ctx.strokeStyle = colors.hold;                 // viền nét đứt để không lẫn với cột thật
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 3]);
      roundRect(ctx, x, y, barW, h, Math.min(3, barW / 3));
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = colors.hold;
      ctx.font = '700 10px ui-monospace, SFMono-Regular, Menlo, monospace';
      ctx.fillText(`⇩${marks.hold.value}`, x + barW / 2, y - 4);
    }

    // 4. Con trỏ i / j / min / mid / gap dưới chân cột
    const pointers = [];
    if (marks.i != null && marks.i >= 0)   pointers.push(['i', marks.i, colors.muted]);
    if (marks.j != null && marks.j >= 0)   pointers.push(['j', marks.j, colors.barCompare]);
    if (marks.min != null)                 pointers.push(['min', marks.min, colors.barSorted]);
    if (marks.mid != null)                 pointers.push(['mid', marks.mid, colors.barPivot]);
    if (state.pivot != null)               pointers.push(['chốt', state.pivot, colors.barPivot]);

    ctx.font = '700 10px ui-monospace, SFMono-Regular, Menlo, monospace';
    const laneY0 = baseY + (showValues ? 26 : 14);
    const lanes = [];                 // lanes[k] = danh sách khoảng x đã bị chiếm ở làn k

    for (const [name, idx, color] of pointers) {
      if (idx < 0 || idx >= n) continue;
      const cx = xOf(idx) + barW / 2;
      const half = ctx.measureText(name).width / 2 + 3;

      // Tìm làn đầu tiên còn trống để nhãn không đè lên nhau
      let lane = 0;
      while (lanes[lane] && lanes[lane].some(([l, r]) => cx - half < r && cx + half > l)) lane++;
      (lanes[lane] ||= []).push([cx - half, cx + half]);

      const y = laneY0 + lane * 11;
      ctx.fillStyle = color;
      ctx.fillText(name, cx, y);
      ctx.beginPath();                                  // mũi tên luôn chỉ đúng cột
      ctx.moveTo(cx, laneY0 - 12);
      ctx.lineTo(cx - 3.5, laneY0 - 7);
      ctx.lineTo(cx + 3.5, laneY0 - 7);
      ctx.closePath();
      ctx.fill();
    }
  }

  return { draw, resize, get colors() { return colors; } };
}

/* --------------------------- tiện ích nhỏ --------------------------- */

const lerp = (a, b, t) => a + (b - a) * t;
const arc = (t) => Math.sin(Math.PI * t);           // 0 → 1 → 0, tạo hình vòng cung
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

function roundRect(ctx, x, y, w, h, r) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.lineTo(x + w - rr, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + rr);
  ctx.lineTo(x + w, y + h);
  ctx.lineTo(x, y + h);
  ctx.lineTo(x, y + rr);
  ctx.quadraticCurveTo(x, y, x + rr, y);
  ctx.closePath();
}
