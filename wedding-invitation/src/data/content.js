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
  brideFull: 'Nguyễn Thùy Dung',
  groomFull: 'Trần Quang Phong',
  hashtag: '#ThuyDungQuangPhong',
  // Ngày dùng cho đồng hồ đếm ngược + màn mở đầu (lấy buổi tiệc diễn ra trước).
  date: '2026-08-02T11:00:00',
  dateShort: '02 · 08 · 2026',
  datesShort: '02 & 08 · 08 · 2026',
  year: '2026',
  city: 'Hà Nội & Thanh Hóa',
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
    'Mọi câu chuyện đẹp đều có một khởi đầu. Chuyện của chúng mình bắt đầu vào một ngày tháng Tám năm 2025 — và từ khoảnh khắc ấy, những điều bình dị bỗng hóa thân thương.',
  milestones: [
    {
      year: '2025',
      month: 'Tháng Tám',
      title: 'Lần đầu gặp gỡ',
      text: 'Giữa bộn bề ngày thường, chúng mình tình cờ gặp nhau. Một ánh nhìn, một nụ cười — và câu chuyện của hai đứa bắt đầu từ đó.',
      image: img('1529636798458-92182e662485', 1200),
    },
    {
      year: '2025',
      month: 'Tháng Mười Một',
      title: 'Chính thức bên nhau',
      text: 'Sau những buổi chuyện trò không dứt và đôi lần hẹn hò ngại ngùng, chúng mình quyết định nắm tay nhau, cùng viết tiếp chặng đường phía trước.',
      image: img('1511285560929-80b456fea0bc', 1200),
    },
    {
      year: '2026',
      month: 'Tháng Ba',
      title: 'Ra mắt hai gia đình',
      text: 'Chúng mình đưa nhau về thưa chuyện với bố mẹ. Niềm vui được nhân đôi khi cả hai gia đình đều dành cho nhau những lời chúc phúc ấm áp.',
      image: img('1469371670807-013ccf25f16a', 1200),
    },
    {
      year: '2026',
      month: 'Tháng Sáu',
      title: 'Lời cầu hôn',
      text: 'Dưới khoảnh khắc chỉ thuộc về hai đứa, một câu hỏi được cất lên — và lời đáp "em đồng ý" đã mở ra một khởi đầu mới.',
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
    rite: 'Lễ Nạp Tài',
    accent: 'rose', // 'rose' | 'gold'
    weekday: 'Chủ Nhật',
    date: '2026-08-02T11:00:00',
    dateShort: '02 · 08 · 2026',
    time: '11:00',
    venue: 'Trung Tâm Tiệc Cưới Hoàng Gia',
    address: ['Số 181 Nguyễn Huy Tưởng', 'Quận Thanh Xuân', 'Hà Nội'],
    mapLabel: 'Mở bản đồ',
    mapHref:
      'https://www.google.com/maps/search/?api=1&query=Trung%20t%C3%A2m%20ti%E1%BB%87c%20c%C6%B0%E1%BB%9Bi%20Ho%C3%A0ng%20Gia%2C%20181%20Nguy%E1%BB%85n%20Huy%20T%C6%B0%E1%BB%9Fng%2C%20Thanh%20Xu%C3%A2n%2C%20H%C3%A0%20N%E1%BB%99i',
    schedule: [
      { time: '10:00', title: 'Đón Khách', text: 'Trà bánh và âm nhạc nhẹ nhàng đón quý khách.', icon: 'arrival' },
      { time: '11:00', title: 'Lễ Nạp Tài', text: 'Nghi thức trao sính lễ và lời chúc phúc cho cô dâu.', icon: 'ceremony' },
      { time: '11:30', title: 'Khai Tiệc', text: 'Nâng ly mừng hạnh phúc đôi uyên ương.', icon: 'cocktail' },
      { time: '12:00', title: 'Dùng Bữa & Lời Chúc', text: 'Bữa tiệc thân mật cùng gia đình hai bên.', icon: 'dinner' },
    ],
  },
  {
    key: 'groom',
    side: 'Tiệc Nhà Trai',
    rite: 'Lễ Tân Hôn',
    accent: 'gold',
    weekday: 'Thứ Bảy',
    date: '2026-08-08T11:00:00',
    dateShort: '08 · 08 · 2026',
    time: '11:00',
    venue: 'Tư Gia Nhà Trai',
    address: ['Đường 217', 'Thị Trấn Hà Trung', 'Thanh Hóa'],
    mapLabel: 'Mở bản đồ',
    mapHref:
      'https://www.google.com/maps/search/?api=1&query=%C4%90%C6%B0%E1%BB%9Dng%20217%2C%20Th%E1%BB%8B%20Tr%E1%BA%A5n%20H%C3%A0%20Trung%2C%20Thanh%20H%C3%B3a',
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
      name: 'Trần Quang Phong',
      bank: 'Vietcombank',
      account: '0123 456 789',
      value: 'Mung cuoi Quang Phong | Vietcombank 0123456789',
      image: null,
    },
    {
      side: 'Nhà Gái',
      name: 'Nguyễn Thùy Dung',
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
  date: '02 & 08 · 08 · 2026',
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
