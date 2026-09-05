# Trực quan hoá thuật toán sắp xếp

Animation cho 9 thuật toán sắp xếp, chạy được từng bước một, kèm mã giả tô sáng theo đúng
dòng đang thực thi, lời thuyết minh tiếng Việt cho mỗi thao tác và bộ đếm số phép so sánh /
đổi chỗ / ghi mảng.

HTML + CSS + JavaScript thuần. Không framework, không dependency, không bước build.

```
learning/sorting-visualizer/
├── index.html              trang chính
├── standalone.html         bản gộp 1 file (mở bằng file:// cũng chạy)
├── build-standalone.mjs    script tạo bản gộp
├── css/style.css
├── js/
│   ├── steps.js            định nghĩa "bước" — ngôn ngữ chung của cả project
│   ├── algorithms.js       9 generator thuật toán + mã giả
│   ├── explain.js          nội dung giải thích, độ phức tạp, điểm mạnh/yếu
│   ├── data.js             sinh các dạng mảng đầu vào
│   ├── player.js           đầu phát: chạy / dừng / tua tới / tua lui
│   ├── renderer.js         vẽ canvas từ trạng thái
│   ├── audio.js            ánh xạ giá trị thành cao độ (tuỳ chọn)
│   └── main.js             nối tất cả lại, cập nhật DOM
└── test/
    ├── verify.mjs          kiểm chứng thuật toán + chuỗi bước
    └── smoke.mjs           kiểm tra khớp nối HTML ↔ JS
```

---

## Chạy thử

```bash
# cách 1 — cần server vì trình duyệt chặn ES module qua file://
python3 -m http.server 8080      # rồi mở http://localhost:8080/

# cách 2 — không cần gì cả
open standalone.html             # bản gộp 1 file

# kiểm thử
node test/verify.mjs             # thuật toán đúng? chuỗi bước phát lại đúng?
node test/smoke.mjs              # id DOM, đường dẫn, mã giả có khớp không?
node build-standalone.mjs        # dựng lại standalone.html sau khi sửa mã
```

Phím tắt: `Space` chạy/dừng · `←` `→` lùi/tới một bước · `R` sinh mảng mới.

---

## Ý tưởng kiến trúc: thuật toán không vẽ gì cả

Cách làm ngây thơ là nhét lệnh vẽ thẳng vào thuật toán, rồi `await sleep(100)` sau mỗi lần
đổi chỗ. Cách đó chạy được, nhưng hỏng ngay khi ta muốn thêm tính năng: không tua lui được,
không kéo thanh trượt được, đổi tốc độ giữa chừng thì lệch nhịp, và bản thân thuật toán không
còn giống thuật toán trong sách nữa.

Ở đây tách hẳn làm hai:

```
    data.js            algorithms.js              player.js            renderer.js
  ┌──────────┐        ┌───────────────┐        ┌────────────┐        ┌────────────┐
  │ mảng đầu │──────▶ │  generator    │──────▶ │  băng bước │──────▶ │   canvas   │
  │   vào    │        │ *bubbleSort() │ steps  │  + con trỏ │ state  │            │
  └──────────┘        └───────────────┘        └────────────┘        └────────────┘
                       yield ra "bước"          phát theo thời gian    vẽ 1 khung hình
```

**Thuật toán chỉ kể lại những gì nó làm.** Mỗi thuật toán là một `function*` (generator):
nó chạy đúng như trong sách, nhưng mỗi khi làm một việc đáng kể thì `yield` ra một *bước*
mô tả việc đó.

```js
function* bubbleSort(a) {
  for (let i = 0; i < a.length - 1; i++) {
    for (let j = 0; j < a.length - 1 - i; j++) {
      yield compare(j, j + 1, 3, `So sánh a[${j}] với a[${j+1}]`);
      if (a[j] > a[j + 1]) {
        yield swap(j, j + 1, 4, 'Đổi chỗ');
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
      }
    }
    yield sorted(...);
  }
}
```

Generator quan trọng ở chỗ nó **tạm dừng được ở giữa vòng lặp** rồi chạy tiếp đúng chỗ cũ.
Không có nó, muốn dừng giữa chừng ta phải viết lại thuật toán thành máy trạng thái — vừa dài
vừa che mất chính cái mình đang muốn dạy.

Chạy hết generator ta được một **mảng các bước**, coi như một cuốn băng. Từ đó mọi thứ trở
nên tầm thường:

| Thao tác | Cách làm |
|---|---|
| Chạy tiếp | áp dụng bước kế tiếp lên trạng thái |
| Tua lui 1 bước | dựng lại trạng thái từ mảng gốc rồi áp dụng `k-1` bước |
| Kéo thanh trượt | y hệt, tới vị trí bất kỳ |
| Đổi tốc độ | chỉ đổi khoảng thời gian giữa hai bước |

Không cần viết hàm `undo` cho từng thao tác, cũng không cần lưu ảnh chụp trạng thái sau mỗi
bước. **Nguồn sự thật duy nhất là chuỗi bước**, và dựng lại vài nghìn bước chỉ mất chưa tới
một mili-giây vì mỗi bước chỉ là vài phép gán.

### Một "bước" trông thế nào

```js
{ op: 'swap', i: 3, j: 4, line: 4, text: '45 > 12 → đổi chỗ', marks: { j: 3 } }
```

| Trường | Ý nghĩa |
|---|---|
| `op` | loại thao tác |
| `line` | dòng mã giả đang thực thi → dùng để tô sáng |
| `text` | lời thuyết minh hiện dưới khung hình |
| `marks` | con trỏ phụ để vẽ nhãn: `i`, `j`, `min`, `mid`, `hold` |

Các `op` hiện có:

| op | Đổi trạng thái | Dùng cho |
|---|---|---|
| `compare(i, j)` | không | đếm số phép so sánh, tô vàng hai cột |
| `swap(i, j)` | đổi chỗ | tô đỏ, chạy hiệu ứng bay qua nhau |
| `write(i, value)` | ghi 1 ô | chèn, trộn, chép kết quả về |
| `sorted(from, to)` | cộng dồn tập đã xong | tô xanh |
| `range(from, to)` | đặt đoạn đang xử lý | nền mờ của merge/quick sort |
| `pivot(i)` | đặt phần tử chốt | tô tím |
| `aux(payload)` | đặt mảng phụ | dải `count` của counting/radix sort |
| `note()` | không | giải thích một nhịp không có thao tác dữ liệu |

Muốn thêm thuật toán mới thì chỉ cần viết thêm một generator và một mảng mã giả — **không
đụng gì tới UI**.

### Vì sao renderer là hàm thuần

`renderer.draw(state)` không giữ trạng thái riêng: cùng một `state` thì luôn vẽ ra cùng một
khung hình. Nhờ vậy tua lui và tua tới không bao giờ lệch nhau, và có thể chụp hình bất kỳ
bước nào mà không phải "chạy lại từ đầu".

Màu được đọc từ biến CSS bằng `getComputedStyle`, nên trang tự đổi theo chế độ sáng/tối mà
renderer không cần biết gì thêm.

Hai chi tiết hình ảnh đáng nói, vì cả hai đều là lỗi phát hiện được khi chụp ảnh kiểm tra:

- **Hai cột đang đổi chỗ luôn gặp nhau đúng điểm giữa quãng đường** → nếu cả hai cùng trượt
  dưới đất thì tới giữa chừng chúng đè lên nhau thành một khối. Cách xử lý: cột thấp hơn được
  nhấc bổng bay qua đầu cột kia và được viền bằng màu nền để tách bạch.
- **Nhãn con trỏ `i` / `j` / `min` / `chốt` đè lên nhau** khi hai con trỏ ở gần nhau → nhãn
  được xếp xuống làn dưới nếu khoảng chiếm chỗ của chúng giao nhau.

---

## Chín thuật toán

### Nhóm dựa trên so sánh

**Bubble Sort** — quét từ trái sang phải, hễ hai phần tử liền kề sai thứ tự thì đổi chỗ. Sau
mỗi lượt, phần tử lớn nhất chắc chắn bị đẩy về cuối. Có cờ `swapped` để dừng sớm, nên mảng đã
sắp xếp chỉ tốn O(n). Ổn định, tại chỗ, O(n²) trung bình.

**Selection Sort** — mỗi lượt quét cả phần chưa sắp xếp để tìm phần tử nhỏ nhất rồi đổi nó về
đầu. Số phép so sánh y hệt bubble sort nhưng **số phép ghi ít nhất trong cả nhóm**: tối đa
n-1 lần đổi chỗ. Đáng dùng khi thao tác ghi đắt. Không ổn định.

**Insertion Sort** — giống xếp bài trên tay: rút một quân ra, dịch các quân lớn hơn sang phải
rồi đặt vào chỗ trống. Đây là phép *dịch*, không phải đổi chỗ, nên mỗi lần chỉ tốn 1 phép ghi.
Cực nhanh với mảng nhỏ hoặc gần như đã sắp xếp — vì thế Timsort và Introsort đều chuyển sang
insertion sort khi đoạn còn dưới ~16–32 phần tử. Ổn định.

**Shell Sort** — insertion sort nhưng so sánh các phần tử cách nhau `gap` ô, với gap giảm dần
về 1. Phần tử lệch xa nhảy được một phát về gần đúng chỗ thay vì lết từng ô. Lượt cuối gap = 1
chính là insertion sort, nhưng lúc đó mảng đã gần có thứ tự nên rất nhanh.

**Merge Sort** — chia đôi, sắp xếp từng nửa bằng đệ quy, rồi trộn hai nửa đã có thứ tự. Trộn
chỉ tốn thời gian tuyến tính vì mỗi bước chỉ so sánh hai phần tử đầu của hai nửa. O(n log n)
trong **mọi** trường hợp, ổn định, nhưng cần O(n) bộ nhớ phụ. Dùng `a[i] <= a[j]` chứ không
phải `<` chính là chỗ giữ tính ổn định.

**Quick Sort** — chọn một phần tử làm chốt, dồn nhỏ hơn sang trái, lớn hơn sang phải; sau bước
đó chốt đã nằm đúng vị trí cuối cùng và hai bên xử lý độc lập. Ở đây dùng sơ đồ Lomuto với chốt
là phần tử cuối đoạn — chọn vậy để dễ đọc, nhưng nó khiến mảng **đã sắp xếp trở thành trường
hợp xấu nhất O(n²)**; hãy chọn dạng dữ liệu "Đã sắp xếp" trong trang và xem số bước phình lên.
Thực tế người ta dùng median-of-three hoặc chốt ngẫu nhiên.

**Heap Sort** — coi mảng như cây nhị phân (con của `i` là `2i+1`, `2i+2`), dựng max-heap rồi
liên tục lấy gốc đổi về cuối và thu nhỏ heap. Là thuật toán duy nhất trong nhóm vừa **đảm bảo
O(n log n) vừa sắp xếp tại chỗ**. Đổi lại, nó nhảy bộ nhớ xa nên kém thân thiện cache và thực
tế chậm hơn quicksort.

### Nhóm không so sánh

**Counting Sort** — đếm tần suất mỗi giá trị, cộng dồn để biết mỗi giá trị kết thúc ở vị trí
nào, rồi đặt thẳng vào chỗ đó. O(n + k) với k là miền giá trị. Duyệt mảng gốc từ **phải sang
trái** chính là mẹo giữ tính ổn định.

**Radix Sort** — sắp xếp theo từng chữ số, từ hàng đơn vị trở lên, mỗi lượt dùng counting sort.
Vì counting sort ổn định nên thứ tự do các lượt trước tạo ra được giữ nguyên. Nếu bước con
không ổn định thì thuật toán sai hoàn toàn.

> Cận dưới Ω(n log n) chỉ áp dụng cho thuật toán **dựa trên so sánh**: n phần tử có n! hoán vị,
> mỗi phép so sánh cho 1 bit thông tin, nên cần ít nhất log₂(n!) ≈ n log n phép so sánh.
> Counting và Radix thoát được cận này vì chúng không so sánh hai phần tử với nhau — chúng dùng
> chính *giá trị* của phần tử làm chỉ số mảng.

---

## Kiểm thử

`node test/verify.mjs` chạy mỗi thuật toán trên 6 dạng dữ liệu × 8 kích thước (kể cả mảng rỗng,
1 phần tử, toàn giá trị bằng nhau) và kiểm tra **hai** điều:

1. Thuật toán sắp xếp đúng.
2. Chuỗi bước nó sinh ra, khi phát lại trên mảng gốc, cho ra đúng mảng kết quả đó.

Điều thứ hai mới là điều màn hình thực sự hiển thị. Nếu quên `yield` một thao tác thì thuật
toán vẫn đúng nhưng animation sẽ sai — và chỉ có phép kiểm tra này bắt được.

`node test/smoke.mjs` bắt các lỗi khớp nối làm trang trắng xoá: id DOM mà `main.js` gọi nhưng
HTML không có, đường dẫn CSS/JS sai, thuật toán thiếu mục giải thích, và `line` của bước trỏ
ra ngoài phạm vi mã giả.

---

## Thêm một thuật toán mới

1. Viết mảng mã giả và generator trong `js/algorithms.js`, `yield` các bước từ `js/steps.js`.
2. Thêm một dòng vào `ALGORITHMS`.
3. Thêm mục tương ứng vào `EXPLAIN` trong `js/explain.js`.
4. `node test/verify.mjs && node test/smoke.mjs` — hai test này bắt gần hết lỗi thường gặp.
5. `node build-standalone.mjs` để cập nhật bản gộp.

Không phải sửa gì trong `renderer.js`, `player.js` hay `main.js`.
