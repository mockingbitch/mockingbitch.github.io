/**
 * steps.js — "Ngôn ngữ chung" giữa thuật toán và phần hiển thị.
 *
 * Ý tưởng cốt lõi của cả project:
 *
 *   Thuật toán KHÔNG vẽ gì cả. Nó chỉ *kể lại* những gì nó làm, dưới dạng
 *   một chuỗi "bước" (step) rất nhỏ và rất cụ thể: "tôi so sánh a[3] với
 *   a[4]", "tôi đổi chỗ a[3] và a[4]", "tôi ghi 42 vào a[7]"...
 *
 *   Phần hiển thị đọc chuỗi bước đó và vẽ lại. Nhờ tách đôi như vậy:
 *     - Thuật toán viết y hệt sách giáo khoa, không dính DOM/Canvas.
 *     - Tua tới / tua lui / chạy chậm / chạy nhanh chỉ là việc phát lại
 *       cùng một chuỗi bước ở tốc độ khác nhau.
 *     - Muốn thêm thuật toán mới: viết thêm 1 generator, không sửa UI.
 *
 * Một bước là object thuần:
 *   { op, ...tham số, line, text, marks }
 *     op    : loại thao tác (xem bảng bên dưới)
 *     line  : dòng mã giả đang được thực thi (để tô sáng pseudocode)
 *     text  : lời thuyết minh tiếng Việt cho bước này
 *     marks : con trỏ phụ để vẽ nhãn (i, j, min, mid, hold, ...)
 *
 * Bảng thao tác:
 *   compare(i, j)      chỉ đọc, không đổi mảng   → đếm số phép so sánh
 *   swap(i, j)         đổi chỗ hai phần tử
 *   write(i, value)    ghi đè một ô (chèn / trộn / chép về)
 *   sorted(from, to)   đánh dấu đoạn đã đúng thứ tự (tô xanh, cộng dồn)
 *   range(from, to)    đoạn đang được xử lý (nền mờ); null = xoá
 *   pivot(i)           vị trí phần tử chốt; null = xoá
 *   aux(payload)       mảng phụ (counting/radix sort) để vẽ dải bên dưới
 *   note()             không đổi trạng thái, chỉ để giải thích một nhịp
 */

export const compare = (i, j, line, text, marks = null) => ({ op: 'compare', i, j, line, text, marks });
export const swap    = (i, j, line, text, marks = null) => ({ op: 'swap', i, j, line, text, marks });
export const write   = (i, value, line, text, marks = null) => ({ op: 'write', i, value, line, text, marks });
export const sorted  = (from, to, line, text, marks = null) => ({ op: 'sorted', from, to, line, text, marks });
export const range   = (from, to, line, text, marks = null) => ({ op: 'range', from, to, line, text, marks });
export const pivot   = (i, line, text, marks = null) => ({ op: 'pivot', i, line, text, marks });
export const aux     = (payload, line, text, marks = null) => ({ op: 'aux', aux: payload, line, text, marks });
export const note    = (line, text, marks = null) => ({ op: 'note', line, text, marks });

/** Trạng thái đầy đủ của màn hình tại một thời điểm phát lại. */
export function createState(initial) {
  return {
    array: initial.slice(),
    sorted: new Set(),   // các chỉ số đã nằm trong đoạn có thứ tự
    range: null,         // [from, to] đoạn đang xử lý
    pivot: null,         // chỉ số phần tử chốt
    aux: null,           // { label, values, highlight }
    marks: null,         // con trỏ phụ của bước hiện tại
    line: -1,            // dòng mã giả đang sáng
    text: '',            // lời thuyết minh
    step: null,          // chính bước vừa áp dụng (renderer cần biết op)
    stats: { comparisons: 0, swaps: 0, writes: 0, reads: 0 },
  };
}

/**
 * Áp dụng đúng MỘT bước lên trạng thái. Đây là "máy ảo" của visualizer:
 * tua tới = gọi thêm một lần; tua lui = dựng lại từ đầu rồi gọi k lần
 * (rất rẻ, vì mỗi bước chỉ là vài phép gán).
 */
export function applyStep(state, step) {
  const a = state.array;
  const st = state.stats;

  switch (step.op) {
    case 'compare':
      st.comparisons++;
      st.reads += 2;
      break;

    case 'swap': {
      const t = a[step.i];
      a[step.i] = a[step.j];
      a[step.j] = t;
      st.swaps++;
      st.writes += 2;
      st.reads += 2;
      break;
    }

    case 'write':
      a[step.i] = step.value;
      st.writes++;
      break;

    case 'sorted':
      for (let k = step.from; k <= step.to; k++) state.sorted.add(k);
      break;

    case 'range':
      state.range = step.from == null ? null : [step.from, step.to];
      break;

    case 'pivot':
      state.pivot = step.i;
      break;

    case 'aux':
      state.aux = step.aux;
      break;

    case 'note':
    default:
      break;
  }

  state.marks = step.marks || null;
  state.line = step.line ?? -1;
  state.text = step.text || '';
  state.step = step;
}

/** Dựng lại trạng thái sau khi đã áp dụng `count` bước đầu tiên. */
export function replay(initial, steps, count) {
  const state = createState(initial);
  const n = Math.max(0, Math.min(count, steps.length));
  for (let k = 0; k < n; k++) applyStep(state, steps[k]);
  return state;
}
