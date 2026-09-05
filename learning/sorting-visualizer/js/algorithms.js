/**
 * algorithms.js — 9 thuật toán sắp xếp, mỗi cái là một GENERATOR.
 *
 * Quy ước:
 *   - `run(a)` nhận BẢN SAO của mảng và được phép sửa trực tiếp lên nó.
 *   - Mỗi khi làm một việc đáng kể, nó `yield` ra một bước (xem steps.js).
 *   - Thứ tự bắt buộc: `yield` bước MÔ TẢ trước, rồi mới thực sự sửa mảng.
 *     Lý do: lời thuyết minh trong bước phải đọc được giá trị *trước* khi
 *     thay đổi, còn phần phát lại sẽ tự áp dụng thay đổi khi tới bước đó.
 *   - `pseudocode` là mảng dòng; `line` trong mỗi bước là chỉ số dòng đó.
 *
 * Nhờ generator, thuật toán "tạm dừng" được ở giữa vòng lặp mà không cần
 * viết lại thành máy trạng thái — đây là lý do chính chọn generator thay
 * vì setTimeout lồng nhau hay callback.
 */

import { compare, swap, write, sorted, range, pivot, aux, note } from './steps.js';

/* ------------------------------------------------------------------ *
 * 1. Bubble Sort — nổi bọt
 * ------------------------------------------------------------------ */

const BUBBLE_CODE = [
  'for i ← 0 … n-2:',
  '    swapped ← false',
  '    for j ← 0 … n-2-i:',
  '        if a[j] > a[j+1]:',
  '            swap(a[j], a[j+1]); swapped ← true',
  '    // phần tử lớn nhất đã "nổi" về cuối đoạn',
  '    a[n-1-i] đã đúng vị trí',
  '    if not swapped: break    // dừng sớm khi đã xong',
  'hoàn tất',
];

function* bubbleSort(a) {
  const n = a.length;
  if (n < 2) { yield sorted(0, n - 1, 8, 'Mảng có ≤ 1 phần tử nên đã sắp xếp.'); return; }

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    yield note(1, `Lượt quét ${i + 1}: đặt cờ swapped = false.`, { i });

    for (let j = 0; j < n - 1 - i; j++) {
      yield compare(j, j + 1, 3, `So sánh a[${j}] = ${a[j]} với a[${j + 1}] = ${a[j + 1]}.`, { j });
      if (a[j] > a[j + 1]) {
        yield swap(j, j + 1, 4, `${a[j]} > ${a[j + 1]} → đổi chỗ, phần tử lớn hơn trôi sang phải.`, { j });
        const t = a[j]; a[j] = a[j + 1]; a[j + 1] = t;
        swapped = true;
      }
    }

    yield sorted(n - 1 - i, n - 1 - i, 6,
      `Hết lượt: phần tử lớn nhất của đoạn đã nổi tới a[${n - 1 - i}] = ${a[n - 1 - i]} → chốt vị trí.`);

    if (!swapped) {
      yield sorted(0, n - 1, 7, 'Cả lượt không đổi chỗ lần nào → mảng đã có thứ tự, dừng sớm.');
      return;
    }
  }
  yield sorted(0, n - 1, 8, 'Hoàn tất.');
}

/* ------------------------------------------------------------------ *
 * 2. Selection Sort — chọn trực tiếp
 * ------------------------------------------------------------------ */

const SELECTION_CODE = [
  'for i ← 0 … n-2:',
  '    min ← i                       // ứng viên nhỏ nhất',
  '    for j ← i+1 … n-1:',
  '        if a[j] < a[min]: min ← j',
  '    if min ≠ i: swap(a[i], a[min])',
  '    a[i] đã đúng vị trí',
  'hoàn tất',
];

function* selectionSort(a) {
  const n = a.length;

  for (let i = 0; i < n - 1; i++) {
    let min = i;
    yield range(i, n - 1, 1,
      `Tìm phần tử nhỏ nhất trong đoạn chưa sắp xếp a[${i}..${n - 1}]; tạm coi a[${i}] = ${a[i]} là nhỏ nhất.`,
      { i, min });

    for (let j = i + 1; j < n; j++) {
      yield compare(j, min, 3, `So sánh a[${j}] = ${a[j]} với ứng viên a[${min}] = ${a[min]}.`, { i, j, min });
      if (a[j] < a[min]) {
        min = j;
        yield note(3, `a[${j}] = ${a[j]} nhỏ hơn → ứng viên nhỏ nhất mới là chỉ số ${j}.`, { i, j, min });
      }
    }

    if (min !== i) {
      yield swap(i, min, 4, `Đưa phần tử nhỏ nhất ${a[min]} về đầu đoạn chưa sắp xếp (vị trí ${i}).`, { i, min });
      const t = a[i]; a[i] = a[min]; a[min] = t;
    } else {
      yield note(4, `a[${i}] vốn đã là nhỏ nhất → không cần đổi chỗ (tiết kiệm 1 lần ghi).`, { i, min });
    }
    yield sorted(i, i, 5, `a[${i}] = ${a[i]} chốt vị trí vĩnh viễn.`);
  }
  yield range(null, null, 6, 'Hoàn tất.');
  yield sorted(0, n - 1, 6, 'Hoàn tất: phần tử cuối cùng hiển nhiên đã đúng chỗ.');
}

/* ------------------------------------------------------------------ *
 * 3. Insertion Sort — chèn (giống xếp bài trên tay)
 * ------------------------------------------------------------------ */

const INSERTION_CODE = [
  '// a[0] coi như đoạn đã sắp xếp',
  'for i ← 1 … n-1:',
  '    key ← a[i]                    // rút "quân bài" ra',
  '    j ← i - 1',
  '    while j ≥ 0 and a[j] > key:',
  '        a[j+1] ← a[j]        // dịch phải, tạo chỗ trống',
  '        j ← j - 1',
  '    a[j+1] ← key            // đặt quân bài vào đó',
  'hoàn tất',
];

function* insertionSort(a) {
  const n = a.length;
  yield sorted(0, 0, 0, 'Một phần tử thì luôn có thứ tự → coi a[0] là đoạn đã sắp xếp.');

  for (let i = 1; i < n; i++) {
    const key = a[i];
    let j = i - 1;
    yield note(2, `Rút a[${i}] = ${key} ra làm "quân bài" cần chèn vào đoạn a[0..${i - 1}].`,
      { i, hold: { value: key, at: i } });

    while (j >= 0) {
      yield compare(j, j, 4, `So sánh a[${j}] = ${a[j]} với key = ${key}.`,
        { i, j, hold: { value: key, at: j + 1 } });
      if (a[j] <= key) {
        yield note(4, `a[${j}] = ${a[j]} ≤ key → dừng, đã tìm được chỗ chèn.`,
          { i, j, hold: { value: key, at: j + 1 } });
        break;
      }
      yield write(j + 1, a[j], 5, `a[${j}] = ${a[j]} > key → dịch nó sang phải một ô.`,
        { i, j, hold: { value: key, at: j } });
      a[j + 1] = a[j];
      j--;
    }

    yield write(j + 1, key, 7, `Đặt key = ${key} vào ô trống ở vị trí ${j + 1}.`, { i, hold: { value: key, at: j + 1 } });
    a[j + 1] = key;
    yield sorted(0, i, 7, `Đoạn a[0..${i}] giờ đã có thứ tự.`);
  }
  yield sorted(0, n - 1, 8, 'Hoàn tất.');
}

/* ------------------------------------------------------------------ *
 * 4. Shell Sort — insertion sort theo bước nhảy giảm dần
 * ------------------------------------------------------------------ */

const SHELL_CODE = [
  'gap ← n / 2',
  'while gap > 0:',
  '    for i ← gap … n-1:        // các dãy cách nhau gap ô',
  '        temp ← a[i];  j ← i',
  '        while j ≥ gap and a[j-gap] > temp:',
  '            a[j] ← a[j-gap];  j ← j - gap',
  '        a[j] ← temp',
  '    gap ← gap / 2                 // thu nhỏ bước nhảy',
  'hoàn tất  // lượt gap = 1 chỉ còn chỉnh vài chỗ nhỏ',
];

function* shellSort(a) {
  const n = a.length;

  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    yield note(1, `Bước nhảy gap = ${gap}: sắp xếp các dãy con gồm những phần tử cách nhau ${gap} ô.`, { gap });

    for (let i = gap; i < n; i++) {
      const temp = a[i];
      let j = i;
      yield note(3, `Lấy temp = a[${i}] = ${temp}, so ngược lại theo bước nhảy ${gap}.`,
        { i, gap, hold: { value: temp, at: i } });

      while (j >= gap) {
        yield compare(j - gap, j, 4, `So sánh a[${j - gap}] = ${a[j - gap]} với temp = ${temp}.`,
          { i, j, gap, hold: { value: temp, at: j } });
        if (a[j - gap] <= temp) break;
        yield write(j, a[j - gap], 5, `a[${j - gap}] > temp → nhảy nó lên ${gap} ô, tới vị trí ${j}.`,
          { i, j, gap, hold: { value: temp, at: j - gap } });
        a[j] = a[j - gap];
        j -= gap;
      }

      yield write(j, temp, 6, `Đặt temp = ${temp} vào vị trí ${j}.`, { i, j, gap });
      a[j] = temp;
    }
    yield note(7, `Xong gap = ${gap}. Mảng đã "gần đúng thứ tự" hơn → lượt sau ít việc hơn hẳn.`, { gap });
  }
  yield sorted(0, n - 1, 8, 'Hoàn tất: lượt cuối gap = 1 chỉ còn phải chỉnh vài chỗ nhỏ.');
}

/* ------------------------------------------------------------------ *
 * 5. Merge Sort — chia để trị, trộn hai nửa đã sắp xếp
 * ------------------------------------------------------------------ */

const MERGE_CODE = [
  'mergeSort(lo, hi):',
  '    if lo ≥ hi: return        // đoạn ≤ 1 đã có thứ tự',
  '    mid ← (lo + hi) / 2',
  '    mergeSort(lo, mid)            // sắp xếp nửa trái',
  '    mergeSort(mid+1, hi)          // sắp xếp nửa phải',
  '    merge(lo, mid, hi):',
  '        i ← lo;  j ← mid+1;  tmp ← []',
  '        while i ≤ mid and j ≤ hi:',
  '            tmp += (a[i] ≤ a[j] ? a[i++] : a[j++])',
  '        nối phần còn lại của nửa chưa hết vào tmp',
  '        chép tmp trở lại a[lo..hi]',
];

function* mergeSort(a) {
  yield* msort(a, 0, a.length - 1);
  yield range(null, null, 10, 'Hoàn tất.');
  yield sorted(0, a.length - 1, 10, 'Hoàn tất: hai nửa cuối cùng đã được trộn thành một mảng có thứ tự.');
}

function* msort(a, lo, hi) {
  if (lo > hi) return;
  yield range(lo, hi, 0, `Gọi mergeSort trên đoạn a[${lo}..${hi}].`, { lo, hi });
  if (lo === hi) {
    yield note(1, `Đoạn a[${lo}..${hi}] chỉ có 1 phần tử → hiển nhiên đã có thứ tự, quay lui.`, { lo, hi });
    return;
  }
  const mid = (lo + hi) >> 1;
  yield note(2, `Chia đôi tại mid = ${mid}: nửa trái a[${lo}..${mid}], nửa phải a[${mid + 1}..${hi}].`, { lo, hi, mid });
  yield* msort(a, lo, mid);
  yield* msort(a, mid + 1, hi);
  yield* mergeRanges(a, lo, mid, hi);
}

function* mergeRanges(a, lo, mid, hi) {
  yield range(lo, hi, 5, `Trộn hai đoạn đã có thứ tự: a[${lo}..${mid}] và a[${mid + 1}..${hi}].`, { lo, hi, mid });

  const tmp = [];
  let i = lo, j = mid + 1;

  while (i <= mid && j <= hi) {
    yield compare(i, j, 8, `So sánh a[${i}] = ${a[i]} với a[${j}] = ${a[j]} → lấy phần tử nhỏ hơn ra trước.`, { i, j, mid });
    if (a[i] <= a[j]) { tmp.push(a[i]); i++; } else { tmp.push(a[j]); j++; }
  }
  while (i <= mid) {
    yield note(9, `Nửa phải đã hết → lấy nốt a[${i}] = ${a[i]} từ nửa trái.`, { i, mid });
    tmp.push(a[i]); i++;
  }
  while (j <= hi) {
    yield note(9, `Nửa trái đã hết → lấy nốt a[${j}] = ${a[j]} từ nửa phải.`, { j, mid });
    tmp.push(a[j]); j++;
  }

  for (let k = 0; k < tmp.length; k++) {
    yield write(lo + k, tmp[k], 10, `Chép ${tmp[k]} từ mảng tạm về a[${lo + k}].`, { i: lo + k });
    a[lo + k] = tmp[k];
  }
  yield note(10, `Đoạn a[${lo}..${hi}] đã có thứ tự.`, { lo, hi });
}

/* ------------------------------------------------------------------ *
 * 6. Quick Sort — phân hoạch Lomuto quanh phần tử chốt
 * ------------------------------------------------------------------ */

const QUICK_CODE = [
  'quickSort(lo, hi):',
  '    if lo ≥ hi: return',
  '    p ← partition(lo, hi)     // chốt về đúng chỗ',
  '    quickSort(lo, p-1)            // vùng nhỏ hơn chốt',
  '    quickSort(p+1, hi)        // vùng lớn hơn chốt',
  '',
  'partition(lo, hi):                // sơ đồ Lomuto',
  '    pivot ← a[hi];  i ← lo - 1',
  '    for j ← lo … hi-1:',
  '        if a[j] ≤ pivot: i ← i+1; swap(a[i], a[j])',
  '    swap(a[i+1], a[hi]);  return i+1',
];

function* quickSort(a) {
  yield* qsort(a, 0, a.length - 1);
  yield range(null, null, 10, 'Hoàn tất.');
  yield sorted(0, a.length - 1, 10, 'Hoàn tất: mọi phần tử chốt đều đã về đúng chỗ.');
}

function* qsort(a, lo, hi) {
  if (lo > hi) return;
  if (lo === hi) {
    yield sorted(lo, lo, 1, `Đoạn a[${lo}..${hi}] chỉ có 1 phần tử → đã đúng chỗ.`);
    return;
  }
  yield range(lo, hi, 0, `quickSort trên đoạn a[${lo}..${hi}].`, { lo, hi });
  const p = yield* partitionLomuto(a, lo, hi);
  yield sorted(p, p, 2, `Chốt ${a[p]} đã nằm đúng vị trí cuối cùng là ${p}; hai bên xử lý độc lập.`);
  yield* qsort(a, lo, p - 1);
  yield* qsort(a, p + 1, hi);
}

function* partitionLomuto(a, lo, hi) {
  const pv = a[hi];
  yield pivot(hi, 7, `Chọn chốt = a[${hi}] = ${pv} (phần tử cuối đoạn).`, { lo, hi });
  let i = lo - 1;

  for (let j = lo; j < hi; j++) {
    yield compare(j, hi, 9, `So sánh a[${j}] = ${a[j]} với chốt ${pv}.`, { i, j, lo, hi });
    if (a[j] <= pv) {
      i++;
      if (i !== j) {
        yield swap(i, j, 9, `a[${j}] ≤ chốt → đưa về cuối vùng "nhỏ hơn" bằng cách đổi với a[${i}].`, { i, j, lo, hi });
        const t = a[i]; a[i] = a[j]; a[j] = t;
      } else {
        yield note(9, `a[${j}] ≤ chốt và vốn đã nằm đúng vùng "nhỏ hơn" → chỉ cần mở rộng vùng.`, { i, j, lo, hi });
      }
    } else {
      yield note(9, `a[${j}] > chốt → để nguyên, nó thuộc vùng "lớn hơn".`, { i, j, lo, hi });
    }
  }

  yield swap(i + 1, hi, 10, `Đặt chốt vào ranh giới hai vùng: đổi a[${i + 1}] với a[${hi}].`, { i: i + 1, lo, hi });
  const t = a[i + 1]; a[i + 1] = a[hi]; a[hi] = t;
  yield pivot(null, 10, `Phân hoạch xong: mọi thứ bên trái ≤ ${pv} ≤ mọi thứ bên phải.`);
  return i + 1;
}

/* ------------------------------------------------------------------ *
 * 7. Heap Sort — dựng max-heap rồi rút dần phần tử lớn nhất
 * ------------------------------------------------------------------ */

const HEAP_CODE = [
  '// giai đoạn 1: biến mảng thành max-heap',
  'for i ← n/2-1 … 0:  siftDown(i, n)',
  '// giai đoạn 2: rút dần gốc (phần tử lớn nhất) về cuối',
  'for end ← n-1 … 1:',
  '    swap(a[0], a[end])            // max về đúng chỗ',
  '    siftDown(0, end)          // khôi phục max-heap',
  '',
  'siftDown(i, size):',
  '    l ← 2i+1;  r ← 2i+2;  largest ← i',
  '    if l < size and a[l] > a[largest]: largest ← l',
  '    if r < size and a[r] > a[largest]: largest ← r',
  '    if largest ≠ i: swap(a[i], a[largest]); đi xuống',
];

function* heapSort(a) {
  const n = a.length;
  yield note(0, 'Giai đoạn 1 — coi mảng như cây nhị phân: con của i là 2i+1 và 2i+2. Ta biến nó thành max-heap.');

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    yield note(1, `Sàng xuống từ nút ${i} (nút trong cuối cùng chưa xử lý).`, { i });
    yield* siftDown(a, i, n);
  }
  yield note(2, 'Đã có max-heap: a[0] là phần tử lớn nhất toàn mảng.');

  for (let end = n - 1; end > 0; end--) {
    yield swap(0, end, 4, `Đưa gốc a[0] = ${a[0]} (lớn nhất trong heap) về cuối heap, vị trí ${end}.`, { i: 0, j: end });
    const t = a[0]; a[0] = a[end]; a[end] = t;
    yield sorted(end, end, 4, `a[${end}] = ${a[end]} chốt vị trí, thu nhỏ heap còn ${end} phần tử.`);
    yield note(5, `Gốc mới có thể vi phạm tính chất heap → sàng xuống để khôi phục.`, { i: 0 });
    yield* siftDown(a, 0, end);
  }
  yield sorted(0, n - 1, 5, 'Hoàn tất.');
}

function* siftDown(a, i, size) {
  while (true) {
    const l = 2 * i + 1, r = 2 * i + 2;
    let largest = i;

    if (l < size) {
      yield compare(l, largest, 8, `So sánh con trái a[${l}] = ${a[l]} với a[${largest}] = ${a[largest]}.`, { i, j: l });
      if (a[l] > a[largest]) largest = l;
    }
    if (r < size) {
      yield compare(r, largest, 9, `So sánh con phải a[${r}] = ${a[r]} với a[${largest}] = ${a[largest]}.`, { i, j: r });
      if (a[r] > a[largest]) largest = r;
    }
    if (largest === i) {
      yield note(10, `a[${i}] đã lớn hơn cả hai con → tính chất heap thoả mãn, dừng sàng.`, { i });
      return;
    }

    yield swap(i, largest, 10, `Con a[${largest}] = ${a[largest]} lớn hơn cha a[${i}] = ${a[i]} → đổi chỗ rồi đi xuống tiếp.`, { i, j: largest });
    const t = a[i]; a[i] = a[largest]; a[largest] = t;
    i = largest;
  }
}

/* ------------------------------------------------------------------ *
 * 8. Counting Sort — đếm phân phối, không so sánh
 * ------------------------------------------------------------------ */

const COUNTING_CODE = [
  'max ← giá trị lớn nhất của a',
  'count[0..max] ← 0',
  'for x in a:  count[x] += 1        // đếm tần suất',
  'for v ← 1 … max:  count[v] += count[v-1]   // cộng dồn',
  'for i ← n-1 … 0:              // ngược → giữ ổn định',
  '    count[a[i]] ← count[a[i]] - 1',
  '    out[ count[a[i]] ] ← a[i]',
  'chép out về a',
];

function* countingSort(a) {
  const n = a.length;
  if (n === 0) return;

  let max = a[0];
  for (let i = 1; i < n; i++) {
    yield compare(i, i, 0, `Tìm giá trị lớn nhất: xét a[${i}] = ${a[i]} (lớn nhất hiện tại ${max}).`, { i });
    if (a[i] > max) max = a[i];
  }

  const count = new Array(max + 1).fill(0);
  yield aux({ label: `count[0..${max}] — tần suất`, values: count.slice(), highlight: -1 }, 1,
    `Tạo mảng đếm count có ${max + 1} ô, tất cả bằng 0.`);

  for (let i = 0; i < n; i++) {
    count[a[i]]++;
    yield aux({ label: `count[0..${max}] — tần suất`, values: count.slice(), highlight: a[i] }, 2,
      `Gặp giá trị ${a[i]} → count[${a[i]}] tăng lên ${count[a[i]]}.`, { i });
  }

  for (let v = 1; v <= max; v++) {
    count[v] += count[v - 1];
    yield aux({ label: `count — cộng dồn (vị trí kết thúc)`, values: count.slice(), highlight: v }, 3,
      `Cộng dồn: count[${v}] = ${count[v]} → có ${count[v]} phần tử ≤ ${v}, nên giá trị ${v} kết thúc ở vị trí ${count[v] - 1}.`);
  }

  const out = new Array(n);
  for (let i = n - 1; i >= 0; i--) {
    const v = a[i];
    count[v]--;
    out[count[v]] = v;
    yield aux({ label: `count — cộng dồn (vị trí kết thúc)`, values: count.slice(), highlight: v }, 6,
      `Đặt a[${i}] = ${v} vào ô ${count[v]} của mảng kết quả, rồi giảm count[${v}] để phần tử ${v} tiếp theo đứng ngay trước nó (đây chính là chỗ tạo ra tính ổn định).`, { i });
  }

  for (let i = 0; i < n; i++) {
    yield write(i, out[i], 7, `Chép kết quả về: a[${i}] = ${out[i]}.`, { i });
    a[i] = out[i];
    yield sorted(i, i, 7, `a[${i}] đã đúng chỗ.`);
  }
  yield aux(null, 7,
    'Hoàn tất. Thứ tự được quyết định hoàn toàn bằng chỉ số mảng, không phải bằng việc so sánh ' +
    'hai phần tử với nhau — bộ đếm "So sánh" ở trên chỉ đến từ lượt quét tìm giá trị lớn nhất.');
}

/* ------------------------------------------------------------------ *
 * 9. Radix Sort (LSD, cơ số 10) — counting sort lặp theo từng chữ số
 * ------------------------------------------------------------------ */

const RADIX_CODE = [
  'max ← giá trị lớn nhất của a',
  'for exp ← 1, 10, 100, … khi max/exp > 0:',
  '    count[0..9] ← 0',
  '    for x in a:  count[ (x/exp) % 10 ] += 1',
  '    for d ← 1 … 9:  count[d] += count[d-1]',
  '    for i ← n-1 … 0:            // ngược → giữ ổn định',
  '        out[ --count[(a[i]/exp)%10] ] ← a[i]',
  '    chép out về a   // xong tới chữ số vừa xét',
];

function* radixSort(a) {
  const n = a.length;
  if (n === 0) return;

  let max = a[0];
  for (let i = 1; i < n; i++) {
    yield compare(i, i, 0, `Tìm giá trị lớn nhất để biết cần duyệt bao nhiêu chữ số: a[${i}] = ${a[i]}.`, { i });
    if (a[i] > max) max = a[i];
  }

  const digitName = (exp) => (exp === 1 ? 'đơn vị' : exp === 10 ? 'chục' : exp === 100 ? 'trăm' : `10^${String(exp).length - 1}`);

  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    const count = new Array(10).fill(0);
    yield aux({ label: `count[0..9] — hàng ${digitName(exp)}`, values: count.slice(), highlight: -1 }, 2,
      `Lượt mới: sắp xếp theo chữ số hàng ${digitName(exp)} (exp = ${exp}).`);

    for (let i = 0; i < n; i++) {
      const d = Math.floor(a[i] / exp) % 10;
      count[d]++;
      yield aux({ label: `count[0..9] — hàng ${digitName(exp)}`, values: count.slice(), highlight: d }, 3,
        `a[${i}] = ${a[i]} có chữ số hàng ${digitName(exp)} là ${d} → count[${d}] = ${count[d]}.`, { i });
    }

    for (let d = 1; d < 10; d++) {
      count[d] += count[d - 1];
      yield aux({ label: `count[0..9] — cộng dồn`, values: count.slice(), highlight: d }, 4,
        `Cộng dồn: count[${d}] = ${count[d]}.`);
    }

    const out = new Array(n);
    for (let i = n - 1; i >= 0; i--) {
      const d = Math.floor(a[i] / exp) % 10;
      count[d]--;
      out[count[d]] = a[i];
      yield aux({ label: `count[0..9] — cộng dồn`, values: count.slice(), highlight: d }, 6,
        `Đưa a[${i}] = ${a[i]} (chữ số ${d}) vào ô ${count[d]} của kết quả lượt này.`, { i });
    }

    for (let i = 0; i < n; i++) {
      yield write(i, out[i], 7, `Chép về: a[${i}] = ${out[i]}.`, { i });
      a[i] = out[i];
    }
    yield note(7, `Xong hàng ${digitName(exp)}: mảng đã có thứ tự theo mọi chữ số từ hàng đơn vị tới hàng này.`);
  }

  yield aux(null, 7, 'Hoàn tất.');
  yield sorted(0, n - 1, 7,
    'Hoàn tất: sau lượt của chữ số cao nhất, toàn mảng đã có thứ tự — mà không lần nào ' +
    'phải so sánh hai phần tử với nhau để xếp thứ tự.');
}

/* ------------------------------------------------------------------ *
 * Danh mục
 * ------------------------------------------------------------------ */

export const ALGORITHMS = [
  { id: 'bubble',    name: 'Bubble Sort',    vi: 'Sắp xếp nổi bọt',       family: 'so sánh', pseudocode: BUBBLE_CODE,    run: bubbleSort },
  { id: 'selection', name: 'Selection Sort', vi: 'Sắp xếp chọn',          family: 'so sánh', pseudocode: SELECTION_CODE, run: selectionSort },
  { id: 'insertion', name: 'Insertion Sort', vi: 'Sắp xếp chèn',          family: 'so sánh', pseudocode: INSERTION_CODE, run: insertionSort },
  { id: 'shell',     name: 'Shell Sort',     vi: 'Sắp xếp Shell',         family: 'so sánh', pseudocode: SHELL_CODE,     run: shellSort },
  { id: 'merge',     name: 'Merge Sort',     vi: 'Sắp xếp trộn',          family: 'so sánh', pseudocode: MERGE_CODE,     run: mergeSort },
  { id: 'quick',     name: 'Quick Sort',     vi: 'Sắp xếp nhanh',         family: 'so sánh', pseudocode: QUICK_CODE,     run: quickSort },
  { id: 'heap',      name: 'Heap Sort',      vi: 'Sắp xếp vun đống',      family: 'so sánh', pseudocode: HEAP_CODE,      run: heapSort },
  { id: 'counting',  name: 'Counting Sort',  vi: 'Sắp xếp đếm phân phối', family: 'phân phối', pseudocode: COUNTING_CODE, run: countingSort },
  { id: 'radix',     name: 'Radix Sort',     vi: 'Sắp xếp cơ số',         family: 'phân phối', pseudocode: RADIX_CODE,    run: radixSort },
];

export function getAlgorithm(id) {
  return ALGORITHMS.find((x) => x.id === id) || ALGORITHMS[0];
}

/**
 * Chạy hết generator và thu về mảng các bước.
 * Có `limit` để phòng trường hợp một thuật toán mới bị lỗi vòng lặp vô hạn.
 */
export function recordSteps(algorithm, input, limit = 400000) {
  const work = input.slice();
  const steps = [];
  for (const s of algorithm.run(work)) {
    steps.push(s);
    if (steps.length >= limit) break;
  }
  return { steps, result: work };
}
