/**
 * player.js — "Đầu phát" cho chuỗi bước.
 *
 * Toàn bộ animation quy về một bài toán rất đơn giản: ta có một băng gồm
 * N bước; con trỏ `position` cho biết đã áp dụng bao nhiêu bước.
 *
 *   chạy tiếp  = position + 1  (áp dụng thêm 1 bước, rất rẻ)
 *   tua lui    = dựng lại trạng thái từ đầu rồi áp dụng position bước
 *   kéo thanh trượt = y hệt tua lui, tới vị trí bất kỳ
 *
 * Vì trạng thái luôn dựng lại được từ (mảng gốc + k bước đầu tiên), ta
 * không cần lưu ảnh chụp nào, cũng không cần viết hàm "undo" cho từng
 * thao tác — nguồn sự thật duy nhất là chuỗi bước.
 *
 * Vòng lặp thời gian dùng requestAnimationFrame với bộ tích luỹ thời gian,
 * nên tốc độ phát không phụ thuộc tần số quét màn hình.
 */

import { createState, applyStep, replay } from './steps.js';

const MAX_STEPS_PER_FRAME = 4000;   // chặn treo trình duyệt khi tua cực nhanh

export function createPlayer({ onFrame, onFinish }) {
  let initial = [];
  let steps = [];
  let state = createState([]);
  let position = 0;
  let playing = false;
  let speed = 12;          // số bước mỗi giây
  let acc = 0;             // thời gian tích luỹ chưa tiêu thụ (ms)
  let last = 0;
  let raf = 0;

  function load(initialArray, stepList) {
    stop();
    initial = initialArray.slice();
    steps = stepList;
    position = 0;
    state = createState(initial);
    emit();
  }

  function emit(tween = 1) {
    onFrame(state, { tween, position, total: steps.length, playing });
  }

  function stepDuration() {
    return 1000 / speed;
  }

  function forward(count = 1) {
    let moved = 0;
    while (moved < count && position < steps.length) {
      applyStep(state, steps[position]);
      position++;
      moved++;
    }
    return moved;
  }

  function seek(pos) {
    const target = Math.max(0, Math.min(pos, steps.length));
    if (target === position) return;
    if (target > position) {
      forward(target - position);            // đi tới: áp dụng tiếp
    } else {
      state = replay(initial, steps, target); // đi lui: dựng lại từ đầu
      position = target;
    }
    emit();
  }

  function tick(now) {
    if (!playing) return;
    const dt = Math.min(100, now - last);
    last = now;
    acc += dt;

    const dur = stepDuration();
    let budget = MAX_STEPS_PER_FRAME;
    while (acc >= dur && position < steps.length && budget-- > 0) {
      applyStep(state, steps[position]);
      position++;
      acc -= dur;
    }
    if (budget <= 0) acc = 0;

    if (position >= steps.length) {
      playing = false;
      acc = 0;
      emit(1);
      if (onFinish) onFinish();
      return;
    }

    // Tỉ lệ hoàn thành của bước vừa áp dụng → dùng cho hiệu ứng trượt khi đổi chỗ
    const tween = dur > 60 ? Math.min(1, acc / Math.min(dur, 260)) : 1;
    emit(tween);
    raf = requestAnimationFrame(tick);
  }

  function play() {
    if (playing || steps.length === 0) return;
    if (position >= steps.length) seek(0);
    playing = true;
    last = performance.now();
    acc = 0;
    raf = requestAnimationFrame(tick);
    emit(1);
  }

  function pause() {
    if (!playing) return;
    playing = false;
    cancelAnimationFrame(raf);
    emit(1);
  }

  function stop() {
    playing = false;
    cancelAnimationFrame(raf);
    acc = 0;
  }

  return {
    load,
    play,
    pause,
    stop,
    toggle: () => (playing ? pause() : play()),
    next: () => { if (forward(1)) emit(1); },
    prev: () => seek(position - 1),
    seek,
    reset: () => seek(0),
    end: () => seek(steps.length),
    setSpeed: (v) => { speed = Math.max(0.5, v); },
    get speed() { return speed; },
    get playing() { return playing; },
    get position() { return position; },
    get total() { return steps.length; },
    get state() { return state; },
    get steps() { return steps; },
  };
}
