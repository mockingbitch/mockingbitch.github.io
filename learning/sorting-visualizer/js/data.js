/**
 * data.js — Sinh dữ liệu đầu vào.
 *
 * Dạng dữ liệu quan trọng không kém thuật toán: cùng một thuật toán có
 * thể nhanh gấp trăm lần hoặc chậm thảm hại chỉ vì mảng đầu vào có hình
 * dạng khác. Mỗi dạng dưới đây làm lộ ra một tính chất khác nhau:
 *
 *   ngẫu nhiên   → trường hợp trung bình
 *   gần sắp xếp  → insertion / bubble toả sáng (O(n)); quicksort bắt đầu đuối
 *   đã sắp xếp   → trường hợp XẤU NHẤT của quicksort chốt-cuối
 *   đảo ngược    → trường hợp xấu nhất của insertion / bubble
 *   ít giá trị   → lộ vấn đề của phân hoạch Lomuto khi có nhiều khoá trùng
 */

export const MIN_VALUE = 5;
export const MAX_VALUE = 100;

const randInt = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));

export const DISTRIBUTIONS = [
  {
    id: 'random',
    label: 'Ngẫu nhiên',
    hint: 'Trường hợp trung bình — mốc so sánh mặc định.',
    make: (n) => Array.from({ length: n }, () => randInt(MIN_VALUE, MAX_VALUE)),
  },
  {
    id: 'nearly',
    label: 'Gần như đã sắp xếp',
    hint: 'Chỉ vài cặp bị đảo. Insertion Sort gần như tuyến tính ở đây.',
    make: (n) => {
      const a = ramp(n);
      const swaps = Math.max(1, Math.round(n * 0.06));
      for (let k = 0; k < swaps; k++) {
        const i = randInt(0, n - 1);
        const j = Math.min(n - 1, i + randInt(1, 3));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    },
  },
  {
    id: 'sorted',
    label: 'Đã sắp xếp',
    hint: 'Bubble/Insertion dừng gần như ngay. Quick Sort chốt-cuối rơi vào O(n²).',
    make: (n) => ramp(n),
  },
  {
    id: 'reversed',
    label: 'Đảo ngược',
    hint: 'Trường hợp xấu nhất của Insertion và Bubble Sort.',
    make: (n) => ramp(n).reverse(),
  },
  {
    id: 'few',
    label: 'Ít giá trị khác nhau',
    hint: 'Nhiều khoá trùng — thử với Quick Sort và để ý phân hoạch lệch.',
    make: (n) => {
      const palette = [10, 30, 55, 80, 100];
      return Array.from({ length: n }, () => palette[randInt(0, palette.length - 1)]);
    },
  },
];

function ramp(n) {
  if (n <= 1) return [MAX_VALUE];
  return Array.from({ length: n }, (_, i) =>
    Math.round(MIN_VALUE + (i * (MAX_VALUE - MIN_VALUE)) / (n - 1)));
}

export function makeArray(distributionId, n) {
  const d = DISTRIBUTIONS.find((x) => x.id === distributionId) || DISTRIBUTIONS[0];
  return d.make(n);
}

export function getDistribution(id) {
  return DISTRIBUTIONS.find((x) => x.id === id) || DISTRIBUTIONS[0];
}
