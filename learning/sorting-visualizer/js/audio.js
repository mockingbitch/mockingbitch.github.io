/**
 * audio.js — Âm thanh phụ hoạ (tuỳ chọn).
 *
 * Mỗi phần tử được ánh xạ thành một cao độ: giá trị càng lớn thì tiếng
 * càng cao. Nghe thì vui, nhưng nó thật sự có ích khi học: bubble sort
 * nghe như tiếng "răng cưa" lặp đi lặp lại, còn merge sort nghe rõ từng
 * đoạn quét lên đều đặn.
 *
 * AudioContext chỉ được tạo sau một thao tác chuột/phím của người dùng
 * (yêu cầu của trình duyệt), nên hàm khởi tạo được gọi lười.
 */

export function createAudio() {
  let ctx = null;
  let enabled = false;
  let lastPlay = 0;

  function ensure() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  /**
   * @param {number} value    giá trị phần tử
   * @param {number} maxValue giá trị lớn nhất (để chuẩn hoá cao độ)
   * @param {string} kind     'compare' | 'swap' | 'write'
   */
  function ping(value, maxValue, kind = 'compare') {
    if (!enabled) return;
    const ac = ensure();
    if (!ac) return;

    const now = ac.currentTime;
    if (now - lastPlay < 0.012) return;      // chống chói tai khi chạy nhanh
    lastPlay = now;

    const ratio = Math.max(0, Math.min(1, value / (maxValue || 1)));
    const freq = 180 + ratio * 900;

    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = kind === 'swap' ? 'triangle' : 'sine';
    osc.frequency.value = freq;

    const peak = kind === 'swap' ? 0.16 : 0.08;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(peak, now + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

    osc.connect(gain).connect(ac.destination);
    osc.start(now);
    osc.stop(now + 0.1);
  }

  return {
    ping,
    get enabled() { return enabled; },
    set enabled(v) { enabled = v; if (v) ensure(); },
  };
}
