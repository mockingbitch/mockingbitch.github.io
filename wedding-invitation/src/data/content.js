// ============================================================
//  NỘI DUNG — nguồn dữ liệu duy nhất cho toàn bộ thiệp mời.
//  Thay đổi bất kỳ giá trị nào ở đây để "thay áo" cho cặp đôi mới.
// ============================================================

// Hình ảnh từ Unsplash (miễn phí sử dụng). Thay bằng ảnh của bạn bằng cách
// đặt file vào thư mục /public rồi dùng "/ten-anh.jpg".
const img = (id, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

export const couple = {
  bride: 'Thùy Dung',
  groom: 'Quang Phong',
  brideFull: 'Trần Thùy Dung',
  groomFull: 'Nguyễn Quang Phong',
  hashtag: '#ThuyDungQuangPhong',
  // Ngày dùng cho đồng hồ đếm ngược + màn mở đầu (lấy buổi tiệc diễn ra trước).
  date: '2026-09-12T11:00:00',
  dateShort: '12 · 09 · 2026',
  datesShort: '12 & 13 · 09 · 2026',
  year: '2026',
  city: 'Đà Lạt, Việt Nam',
  tagline: 'Hai câu chuyện, hòa làm một.',
}

export const hero = {
  kicker: 'Cùng với gia đình hai bên',
  invite: 'trân trọng kính mời bạn đến chung vui',
  image: img('1519741497674-611481863552', 2000),
  imageAlt: 'Thùy Dung và Quang Phong trong ánh nắng vàng buổi chiều',
  scrollHint: 'Bắt đầu câu chuyện',
}

export const loveStory = {
  eyebrow: 'Hành Trình Của Chúng Mình',
  title: 'Một tình yêu nở hoa',
  intro:
    'Mọi câu chuyện đẹp đều có khởi đầu của riêng nó. Chuyện của chúng mình bắt đầu từ một ly cà phê đổ và một chiếc dù mượn tạm — và cứ thế, những điều tình cờ ngọt ngào nối nhau từ ngày ấy.',
  milestones: [
    {
      year: '2018',
      month: 'Tháng Mười',
      title: 'Lần đầu gặp gỡ',
      text: 'Một quán cà phê nhỏ đông đúc giữa phố cổ. Một chiếc dù, hai người xa lạ, và cơn mưa mãi chẳng chịu ngừng. Và chúng mình đã trò chuyện cùng nhau từ dạo đó.',
      image: img('1529636798458-92182e662485', 1200),
    },
    {
      year: '2020',
      month: 'Tháng Sáu',
      title: 'Mái nhà đầu tiên',
      text: 'Một căn hộ nhỏ với khung cửa sổ đón nắng mai. Chúng mình lấp đầy nó bằng cây xanh, những chiếc ly không cùng bộ, và thật nhiều sách.',
      image: img('1511285560929-80b456fea0bc', 1200),
    },
    {
      year: '2023',
      month: 'Tháng Mười Hai',
      title: 'Chuyến đi lên núi',
      text: 'Tuyết phủ trên hàng thông, một bình ca cao nóng, và niềm tin lặng lẽ rằng: dù ở nơi đâu có người kia — nơi ấy chính là nhà.',
      image: img('1469371670807-013ccf25f16a', 1200),
    },
    {
      year: '2025',
      month: 'Tháng Chín',
      title: 'Lời cầu hôn',
      text: 'Dưới bầu trời đầy sao, trên vách núi nơi chúng mình ngắm bình minh đầu tiên cùng nhau, một câu hỏi được cất lên — và được đáp lại bằng những giọt nước mắt hạnh phúc.',
      image: img('1522673607200-164d1b6ce486', 1200),
    },
  ],
}

// ============================================================
//  HAI BUỔI TIỆC — nhà gái & nhà trai, khác ngày, khác địa điểm.
//  Mỗi buổi có lịch trình (schedule) riêng.
// ============================================================
export const events = [
  {
    key: 'bride',
    side: 'Tiệc Nhà Gái',
    rite: 'Lễ Vu Quy',
    accent: 'rose', // 'rose' | 'gold'
    weekday: 'Thứ Bảy',
    date: '2026-09-12T11:00:00',
    dateShort: '12 · 09 · 2026',
    time: '11:00',
    venue: 'Tư Gia Nhà Gái',
    address: ['12 Đường Hoa Hồng', 'Phường 8, TP. Đà Lạt', 'Lâm Đồng'],
    mapLabel: 'Mở bản đồ',
    mapHref: 'https://maps.google.com/?q=Da+Lat+Vietnam',
    schedule: [
      { time: '10:00', title: 'Đón Khách', text: 'Trà bánh và âm nhạc nhẹ nhàng đón quý khách.', icon: 'arrival' },
      { time: '11:00', title: 'Lễ Vu Quy', text: 'Nghi thức trao lời chúc phúc cho cô dâu.', icon: 'ceremony' },
      { time: '11:30', title: 'Khai Tiệc', text: 'Nâng ly mừng hạnh phúc đôi uyên ương.', icon: 'cocktail' },
      { time: '12:00', title: 'Dùng Bữa & Lời Chúc', text: 'Bữa tiệc thân mật cùng gia đình hai bên.', icon: 'dinner' },
    ],
  },
  {
    key: 'groom',
    side: 'Tiệc Nhà Trai',
    rite: 'Lễ Tân Hôn',
    accent: 'gold',
    weekday: 'Chủ Nhật',
    date: '2026-09-13T11:00:00',
    dateShort: '13 · 09 · 2026',
    time: '11:00',
    venue: 'Trung Tâm Tiệc Cưới Maison',
    address: ['88 Đường Trần Hưng Đạo', 'Phường 10, TP. Đà Lạt', 'Lâm Đồng'],
    mapLabel: 'Mở bản đồ',
    mapHref: 'https://maps.google.com/?q=Da+Lat+Vietnam',
    schedule: [
      { time: '10:30', title: 'Đón Khách', text: 'Welcome drink và chụp ảnh lưu niệm.', icon: 'arrival' },
      { time: '11:00', title: 'Lễ Tân Hôn', text: 'Nghi thức thành hôn trước họ hàng đôi bên.', icon: 'ceremony' },
      { time: '11:45', title: 'Khai Tiệc', text: 'Cùng nâng ly chúc mừng cô dâu chú rể.', icon: 'cocktail' },
      { time: '12:15', title: 'Dùng Bữa & Tiệc Mừng', text: 'Bữa tiệc trọng thể và những lời chúc thân thương.', icon: 'party' },
    ],
  },
]

export const details = {
  eyebrow: 'Lịch Trình & Địa Điểm',
  title: 'Hai ngày chung vui',
  intro:
    'Hôn lễ được tổ chức tại hai địa điểm vào hai ngày khác nhau. Kính mong quý khách lưu ý lịch trình để chung vui cùng gia đình hai bên.',
  dress: {
    label: 'Trang Phục',
    title: 'Sang trọng & rạng rỡ',
    text: 'Tông màu đề xuất: champagne, ngà, hồng phấn và xanh sage. Quý khách vui lòng chọn giày êm chân.',
  },
}

export const scheduleSection = {
  eyebrow: 'Chương Trình',
  title: 'Lịch trình từng buổi tiệc',
}

export const gallery = {
  eyebrow: 'Khoảnh Khắc',
  title: 'Lưu giữ trong ánh sáng',
  intro: 'Đôi ba khung hình từ những chương đời đã đưa chúng mình đến bên nhau.',
  images: [
    { src: img('1583939003579-730e3918a45a', 1100), alt: 'Cặp đôi nắm tay nhau dạo bước', span: 'tall' },
    { src: img('1606800052052-a08af7148866', 1100), alt: 'Nhẫn cưới trên nền ren', span: 'short' },
    { src: img('1519225421980-715cb0215aed', 1100), alt: 'Cô dâu trong ánh sáng dịu nhẹ', span: 'tall' },
    { src: img('1525258946800-98cfd641d0de', 1100), alt: 'Bó hoa hồng vườn', span: 'short' },
    { src: img('1537633552985-df8429e8048b', 1100), alt: 'Những bàn tay đan vào nhau', span: 'short' },
    { src: img('1465495976277-4387d4b0b4c6', 1100), alt: 'Bàn tiệc ấm áp dưới ánh nến', span: 'tall' },
    { src: img('1511285560929-80b456fea0bc', 1100), alt: 'Vòng tay ấm trong giờ vàng', span: 'short' },
    { src: img('1494955870715-979ca4f13bf0', 1100), alt: 'Một điệu nhảy lặng lẽ', span: 'tall' },
  ],
}

export const quote = {
  text: 'Và bỗng nhiên, mọi bản tình ca đều viết về anh và em.',
  attribution: 'Yêu, mãi mãi',
  signature: 'Thùy Dung & Quang Phong',
}

// ============================================================
//  MỪNG CƯỚI — hai mã QR (nhà trai & nhà gái).
//  • Cách 1: dán "value" là chuỗi VietQR thật / link chuyển khoản → tự sinh QR.
//  • Cách 2: bỏ ảnh QR vào /public rồi đặt "image": "/qr-nha-trai.png".
// ============================================================
export const gifts = {
  eyebrow: 'Mừng Cưới',
  title: 'Gửi trao yêu thương',
  intro:
    'Sự hiện diện của bạn đã là món quà quý giá nhất. Nếu muốn gửi đôi lời chúc bằng tấm lòng, bạn có thể quét mã bên dưới.',
  qrs: [
    {
      side: 'Nhà Trai',
      name: 'Nguyễn Quang Phong',
      bank: 'Vietcombank',
      account: '0123 456 789',
      value: 'Mung cuoi Quang Phong | Vietcombank 0123456789',
      image: null,
    },
    {
      side: 'Nhà Gái',
      name: 'Trần Thùy Dung',
      bank: 'Techcombank',
      account: '9876 543 210',
      value: 'Mung cuoi Thuy Dung | Techcombank 9876543210',
      image: null,
    },
  ],
}

// ============================================================
//  LỜI CHÚC — sổ lưu bút. Khi gửi sẽ lưu vào data/wishes.json
//  (qua API ở vite.config.js khi dev/preview, hoặc server.js khi chạy thật).
// ============================================================
export const wishes = {
  eyebrow: 'Sổ Lưu Bút',
  title: 'Gửi lời chúc đến chúng mình',
  intro: 'Mỗi dòng chữ của bạn là một món quà mà chúng mình sẽ trân trọng giữ mãi.',
  placeholderName: 'Tên của bạn',
  placeholderMessage: 'Viết đôi dòng chúc phúc cho chúng mình…',
  button: 'Gửi lời chúc',
  emptyState: 'Hãy là người đầu tiên gửi lời chúc đến chúng mình ✦',
  wallTitle: 'Những lời chúc thân thương',
}

export const footer = {
  message: 'Chúng mình rất mong được cùng bạn chung vui trong ngày trọng đại.',
  names: 'Thùy Dung & Quang Phong',
  date: '12 & 13 · 09 · 2026',
  credit: 'Thực hiện với tình yêu',
}

export const nav = [
  { id: 'hero', label: 'Thiệp Mời' },
  { id: 'story', label: 'Chuyện Tình' },
  { id: 'info', label: 'Lịch & Địa Điểm' },
  { id: 'schedule', label: 'Chương Trình' },
  { id: 'gallery', label: 'Album' },
  { id: 'wishes', label: 'Lời Chúc' },
]
