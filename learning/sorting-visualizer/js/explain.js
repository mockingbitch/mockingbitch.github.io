/**
 * explain.js — Phần "mô tả rõ cách hoạt động" cho từng thuật toán.
 * Tách riêng khỏi algorithms.js để phần mã thuật toán giữ được sự gọn gàng.
 */

export const EXPLAIN = {
  bubble: {
    idea:
      'Quét mảng từ trái sang phải, hễ thấy hai phần tử liền kề sai thứ tự thì đổi chỗ. ' +
      'Sau mỗi lượt quét, phần tử lớn nhất chắc chắn bị đẩy về cuối — giống bọt khí nổi lên mặt nước.',
    mechanism: [
      'Đặt cờ <code>swapped = false</code> ở đầu mỗi lượt quét.',
      'Đi từ j = 0 đến hết đoạn chưa chốt, so sánh <code>a[j]</code> với <code>a[j+1]</code>.',
      'Nếu <code>a[j] &gt; a[j+1]</code> thì đổi chỗ và bật <code>swapped = true</code>.',
      'Hết lượt, ô cuối đoạn đã chắc chắn đúng → thu ngắn đoạn cần quét đi 1.',
      'Nếu cả lượt không đổi chỗ lần nào thì mảng đã có thứ tự → dừng sớm. Đây là lý do trường hợp tốt nhất chỉ tốn O(n).',
    ],
    complexity: { best: 'O(n)', avg: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
    stable: true,
    inPlace: true,
    strengths: ['Dễ hiểu, dễ cài đặt nhất', 'Ổn định', 'Phát hiện được mảng đã sắp xếp chỉ trong 1 lượt'],
    weaknesses: ['Số phép đổi chỗ rất lớn', 'Chậm nhất nhóm O(n²) trong thực tế', 'Hầu như không dùng trong sản phẩm thật'],
    watch:
      'Để ý cạnh phải: sau mỗi lượt lại có thêm một cột chuyển xanh. Với mảng đảo ngược, ' +
      'mỗi cột phải "lết" từng bước một sang phải — đó chính là hình ảnh của O(n²).',
  },

  selection: {
    idea:
      'Chia mảng thành hai phần: bên trái đã sắp xếp, bên phải chưa. Mỗi lượt quét toàn bộ phần chưa sắp xếp ' +
      'để tìm phần tử nhỏ nhất, rồi đổi nó về đầu phần chưa sắp xếp.',
    mechanism: [
      'Đặt <code>min = i</code> (giả sử phần tử đầu đoạn chưa sắp xếp là nhỏ nhất).',
      'Duyệt j từ i+1 đến n-1, mỗi lần thấy <code>a[j] &lt; a[min]</code> thì cập nhật <code>min = j</code>.',
      'Hết vòng trong, đổi chỗ <code>a[i]</code> với <code>a[min]</code> (bỏ qua nếu chúng trùng nhau).',
      'Ranh giới phần đã sắp xếp tiến sang phải một ô. Lặp lại cho tới hết.',
    ],
    complexity: { best: 'O(n²)', avg: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
    stable: false,
    inPlace: true,
    strengths: ['Số phép GHI ít nhất: tối đa n-1 lần đổi chỗ', 'Hữu ích khi ghi dữ liệu đắt (bộ nhớ flash)', 'Thời gian chạy rất đều, dễ dự đoán'],
    weaknesses: ['Luôn O(n²) kể cả khi mảng đã sắp xếp sẵn', 'Không ổn định (cú đổi chỗ xa có thể nhảy qua phần tử bằng nhau)'],
    watch:
      'Con trỏ min bò suốt phần chưa sắp xếp rồi mới có đúng một cú đổi chỗ. So với Bubble Sort: ' +
      'số lần so sánh y hệt nhau, nhưng số lần đổi chỗ ít hơn hàng chục lần.',
  },

  insertion: {
    idea:
      'Giống cách bạn xếp bài trên tay: rút từng quân bài mới ra, dịch các quân lớn hơn sang phải để tạo chỗ trống, ' +
      'rồi đặt quân đó vào đúng vị trí trong phần đã xếp.',
    mechanism: [
      'Coi <code>a[0]</code> là đoạn đã sắp xếp.',
      'Với mỗi i từ 1 đến n-1, lưu <code>key = a[i]</code> ra một biến — ô a[i] giờ là "chỗ trống".',
      'Đi ngược từ j = i-1: chừng nào <code>a[j] &gt; key</code> thì chép <code>a[j]</code> sang <code>a[j+1]</code> (chỗ trống dịch sang trái).',
      'Khi gặp phần tử <code>≤ key</code> (hoặc hết mảng) thì đặt key vào chỗ trống.',
      'Lưu ý: đây là phép DỊCH chứ không phải đổi chỗ — mỗi lần chỉ tốn 1 phép ghi, rẻ hơn đổi chỗ (3 phép ghi).',
    ],
    complexity: { best: 'O(n)', avg: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
    stable: true,
    inPlace: true,
    strengths: [
      'Cực nhanh với mảng nhỏ hoặc gần như đã sắp xếp (O(n + số cặp nghịch thế))',
      'Ổn định, tại chỗ, chạy online (nhận thêm phần tử vẫn xử lý được)',
      'Được dùng thật: Timsort/Introsort chuyển sang insertion sort khi đoạn còn dưới ~16–32 phần tử',
    ],
    weaknesses: ['Vẫn là O(n²) với dữ liệu ngẫu nhiên cỡ lớn'],
    watch:
      'Chọn dữ liệu "gần như đã sắp xếp": mỗi quân bài chỉ lùi một hai ô là xong. Đổi sang "đảo ngược": ' +
      'mỗi quân phải lết về tận đầu mảng — đúng trường hợp xấu nhất.',
  },

  shell: {
    idea:
      'Insertion Sort nhưng so sánh những phần tử cách nhau một khoảng <code>gap</code> lớn trước. ' +
      'Nhờ đó phần tử lệch xa có thể nhảy một phát về gần đúng chỗ, thay vì lết từng ô. Gap giảm dần về 1.',
    mechanism: [
      'Bắt đầu với <code>gap = n/2</code>.',
      'Với gap hiện tại, chạy insertion sort trên từng dãy con gồm các phần tử cách nhau đúng gap ô.',
      'Chia đôi gap rồi lặp lại. Mảng ngày càng "gần đúng thứ tự" hơn.',
      'Lượt cuối cùng có gap = 1 chính là insertion sort thường — nhưng lúc này mảng đã gần sắp xếp nên rất nhanh.',
    ],
    complexity: { best: 'O(n log n)', avg: '≈ O(n^1.25)', worst: 'O(n²) (dãy gap n/2)', space: 'O(1)' },
    stable: false,
    inPlace: true,
    strengths: ['Nhanh hơn hẳn insertion sort mà vẫn ngắn gọn, không cần bộ nhớ phụ', 'Hợp cho hệ nhúng, thư viện nhỏ'],
    weaknesses: ['Độ phức tạp phụ thuộc dãy gap và vẫn chưa có lời giải đóng chặt chẽ', 'Không ổn định'],
    watch:
      'Ở gap lớn, các cột nhảy vọt qua nửa mảng. Càng về sau bước nhảy càng ngắn, mảng trông ngày càng "mượt" ' +
      'trước khi lượt gap = 1 hoàn thiện nốt.',
  },

  merge: {
    idea:
      'Chia để trị: cắt đôi mảng, sắp xếp từng nửa (bằng đệ quy), rồi TRỘN hai nửa đã có thứ tự thành một. ' +
      'Trộn hai dãy đã sắp xếp chỉ tốn thời gian tuyến tính vì mỗi bước chỉ cần so sánh hai phần tử đầu.',
    mechanism: [
      'Nếu đoạn có ≤ 1 phần tử thì nó đã có thứ tự → dừng đệ quy.',
      'Cắt tại <code>mid</code>, gọi đệ quy cho nửa trái rồi nửa phải.',
      'Trộn: đặt con trỏ i ở đầu nửa trái, j ở đầu nửa phải; mỗi bước lấy phần tử nhỏ hơn ra mảng tạm rồi đẩy con trỏ tương ứng.',
      'Một nửa hết trước thì nối thẳng phần còn lại của nửa kia vào mảng tạm.',
      'Chép mảng tạm trở lại đúng đoạn <code>a[lo..hi]</code>.',
      'Dùng <code>a[i] ≤ a[j]</code> (không phải <code>&lt;</code>) để khi bằng nhau thì phần tử bên trái ra trước → giữ tính ổn định.',
    ],
    complexity: { best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)' },
    stable: true,
    inPlace: false,
    strengths: [
      'O(n log n) trong MỌI trường hợp, không có ca xấu bất ngờ',
      'Ổn định → nền tảng của Timsort (Python, Java cho object)',
      'Truy cập dữ liệu tuần tự → hợp cho sắp xếp ngoài (external sort) và danh sách liên kết',
    ],
    weaknesses: ['Cần O(n) bộ nhớ phụ', 'Hằng số lớn hơn quicksort trên mảng trong RAM'],
    watch:
      'Nửa đầu animation gần như không thay đổi gì — đó là lúc đệ quy đang đi xuống tận đáy. ' +
      'Các thay đổi thực sự chỉ xảy ra ở bước "chép mảng tạm về", và đoạn được trộn ngày một dài ra.',
  },

  quick: {
    idea:
      'Chọn một phần tử làm CHỐT (pivot), dồn mọi phần tử nhỏ hơn sang trái và lớn hơn sang phải. ' +
      'Sau bước đó chốt đã nằm đúng vị trí cuối cùng, và hai bên được xử lý độc lập bằng đệ quy.',
    mechanism: [
      'Sơ đồ Lomuto: lấy <code>pivot = a[hi]</code>, dùng biến i đánh dấu cuối vùng "nhỏ hơn hoặc bằng chốt".',
      'Duyệt j từ lo đến hi-1: nếu <code>a[j] ≤ pivot</code> thì tăng i và đổi chỗ <code>a[i]</code> với <code>a[j]</code> — tức là kết nạp a[j] vào vùng nhỏ.',
      'Cuối cùng đổi <code>a[i+1]</code> với chốt để chốt về đúng ranh giới hai vùng. Vị trí i+1 là kết quả phân hoạch.',
      'Gọi đệ quy cho <code>[lo, p-1]</code> và <code>[p+1, hi]</code>. Không cần bước "trộn" nào cả.',
      'Chọn chốt kém (ví dụ luôn lấy phần tử cuối trên mảng đã sắp xếp) làm cây đệ quy suy biến → O(n²). Thực tế người ta dùng median-of-three hoặc chốt ngẫu nhiên để tránh.',
    ],
    complexity: { best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n²)', space: 'O(log n) (ngăn xếp đệ quy)' },
    stable: false,
    inPlace: true,
    strengths: [
      'Nhanh nhất trong thực tế với mảng trong RAM: truy cập liên tục, thân thiện với cache',
      'Sắp xếp tại chỗ, chỉ tốn ngăn xếp đệ quy',
      'Là lõi của Introsort — std::sort của C++',
    ],
    weaknesses: ['Trường hợp xấu O(n²) nếu chọn chốt tệ', 'Không ổn định'],
    watch:
      'Chọn dữ liệu "đã sắp xếp" rồi chạy: chốt luôn là phần tử lớn nhất nên mỗi lần phân hoạch chỉ cắt được 1 phần tử — ' +
      'số bước phình lên thấy rõ. Đó chính là trường hợp xấu nhất O(n²).',
  },

  heap: {
    idea:
      'Coi mảng như một cây nhị phân (con của i là 2i+1 và 2i+2). Biến nó thành max-heap — cha luôn lớn hơn con — ' +
      'rồi liên tục lấy gốc (phần tử lớn nhất) đổi về cuối và thu nhỏ heap lại.',
    mechanism: [
      'Giai đoạn 1 — dựng heap: gọi <code>siftDown</code> cho các nút trong, đi ngược từ <code>n/2-1</code> về 0. Cách này chỉ tốn O(n), rẻ hơn chèn từng phần tử.',
      '<code>siftDown(i)</code>: so cha với hai con, nếu con lớn hơn thì đổi chỗ rồi đi xuống tiếp theo nhánh đó.',
      'Giai đoạn 2 — rút phần tử: đổi <code>a[0]</code> (lớn nhất) với phần tử cuối heap, coi ô cuối đó đã chốt.',
      'Heap ngắn đi 1, gốc mới có thể sai → <code>siftDown(0)</code> để khôi phục. Lặp lại cho tới khi heap còn 1 phần tử.',
    ],
    complexity: { best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n log n)', space: 'O(1)' },
    stable: false,
    inPlace: true,
    strengths: [
      'O(n log n) đảm bảo VÀ sắp xếp tại chỗ — kết hợp duy nhất trong nhóm này',
      'Là "lưới an toàn" của Introsort: khi quicksort đệ quy quá sâu thì chuyển sang heapsort',
      'Cùng cấu trúc dữ liệu với hàng đợi ưu tiên',
    ],
    weaknesses: ['Nhảy bộ nhớ xa (2i+1) → kém thân thiện cache, thực tế chậm hơn quicksort', 'Không ổn định'],
    watch:
      'Giai đoạn 1 nhìn hỗn loạn nhưng ngắn. Giai đoạn 2 rất đều đặn: cột cao nhất luôn bị bốc từ vị trí 0 về cuối, ' +
      'rồi một cột nhỏ từ cuối "chìm" dần xuống theo hình chữ chi.',
  },

  counting: {
    idea:
      'Không so sánh phần tử nào với nhau. Thay vào đó ĐẾM xem mỗi giá trị xuất hiện bao nhiêu lần, ' +
      'cộng dồn để biết mỗi giá trị phải nằm ở đoạn nào trong kết quả, rồi đặt thẳng vào chỗ đó.',
    mechanism: [
      'Tìm giá trị lớn nhất <code>max</code>, tạo mảng <code>count</code> có max+1 ô, khởi tạo 0.',
      'Duyệt mảng, mỗi giá trị x làm <code>count[x]++</code> → có bảng tần suất.',
      'Cộng dồn: <code>count[v] += count[v-1]</code>. Giờ <code>count[v]</code> = số phần tử ≤ v = vị trí kết thúc của nhóm giá trị v.',
      'Duyệt mảng gốc từ PHẢI sang TRÁI: giảm <code>count[a[i]]</code> rồi đặt <code>a[i]</code> vào ô đó của mảng kết quả.',
      'Duyệt ngược chính là mẹo giữ tính ổn định: phần tử đứng sau được đặt vào ô sau trong cùng nhóm giá trị.',
    ],
    complexity: { best: 'O(n + k)', avg: 'O(n + k)', worst: 'O(n + k)', space: 'O(n + k)' },
    stable: true,
    inPlace: false,
    strengths: [
      'Tuyến tính — phá được cận dưới Ω(n log n) vì không dùng phép so sánh',
      'Ổn định, nên dùng làm bước con cho radix sort',
      'Lý tưởng khi k (miền giá trị) nhỏ: tuổi, điểm thi, byte, mã màu',
    ],
    weaknesses: [
      'Chỉ dùng được cho số nguyên (hoặc khoá ánh xạ được về số nguyên) trong miền hẹp',
      'k lớn thì bộ nhớ nổ: sắp 10 số trong miền 0..1 tỉ là vô lý',
    ],
    watch:
      'Nhìn dải <code>count</code> bên dưới. Giai đoạn 1 nó là biểu đồ tần suất; sau khi cộng dồn nó biến thành ' +
      'dãy không giảm — mỗi ô lúc này là "ranh giới kết thúc" của một nhóm giá trị.',
  },

  radix: {
    idea:
      'Sắp xếp theo từng chữ số, bắt đầu từ hàng đơn vị (LSD). Mỗi lượt dùng counting sort — ' +
      'vì counting sort ổn định nên thứ tự do các lượt trước tạo ra được giữ nguyên, cứ thế cộng dồn thành thứ tự đúng.',
    mechanism: [
      'Với <code>exp = 1, 10, 100, …</code> cho tới khi vượt quá số lớn nhất:',
      'Đếm chữ số <code>(x / exp) % 10</code> của mọi phần tử vào <code>count[0..9]</code>.',
      'Cộng dồn count để có vị trí kết thúc của mỗi chữ số.',
      'Duyệt ngược mảng, rải từng phần tử vào mảng kết quả theo chữ số đó, rồi chép về.',
      'Điểm mấu chốt: nếu bước con KHÔNG ổn định thì thuật toán sai hoàn toàn — công sức của các lượt trước sẽ bị xoá.',
    ],
    complexity: { best: 'O(d·(n+b))', avg: 'O(d·(n+b))', worst: 'O(d·(n+b))', space: 'O(n + b)' },
    stable: true,
    inPlace: false,
    strengths: [
      'Tuyến tính theo n khi số chữ số d cố định (ví dụ số 32-bit, khoá độ dài cố định)',
      'Rất nhanh cho số nguyên lớn, chuỗi độ dài cố định, khoá ghép',
      'Dùng thật trong cơ sở dữ liệu, GPU sort, sắp xếp mảng int cỡ lớn',
    ],
    weaknesses: ['Cần bộ nhớ phụ và nhiều lượt duyệt', 'Khó áp dụng cho khoá so sánh tuỳ ý (comparator tự do)'],
    watch:
      'Sau lượt hàng đơn vị, mảng trông vẫn "lộn xộn" — nhưng hãy chỉ nhìn chữ số cuối của mỗi số: chúng đã tăng dần. ' +
      'Mỗi lượt tiếp theo thêm một chữ số vào phần đã đúng thứ tự.',
  },
};

/** Bảng so sánh tổng hợp hiển thị ở cuối trang. */
export const COMPARISON_NOTE = `
Cận dưới Ω(n log n) chỉ áp dụng cho thuật toán DỰA TRÊN SO SÁNH: với n phần tử có n! hoán vị,
mỗi phép so sánh cho 1 bit thông tin, nên cần ít nhất log₂(n!) ≈ n log n phép so sánh.
Counting sort và Radix sort thoát được cận này vì chúng không so sánh hai phần tử với nhau —
chúng dùng chính GIÁ TRỊ của phần tử làm chỉ số mảng.
`;
