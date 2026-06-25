import { Fragment } from 'react'
import { loveStory } from './data/content'
import Deck from './components/Deck'
import Cover from './components/panels/Cover'
import Invite from './components/panels/Invite'
import Story from './components/panels/Story'
import Venues from './components/panels/Venues'
import Schedule from './components/panels/Schedule'
import Gallery from './components/panels/Gallery'
import Gifts from './components/panels/Gifts'
import Wishes from './components/panels/Wishes'
import Closing from './components/panels/Closing'

export default function App() {
  const ms = loveStory.milestones

  const chapters = [
    { label: 'Thiệp Mời', render: (n, t) => <Cover no={n} total={t} /> },
    { label: 'Lời Ngỏ', render: (n, t) => <Invite no={n} total={t} /> },
    ...ms.map((m) => ({
      label: 'Chuyện Tình',
      render: (n, t) => <Story no={n} total={t} milestone={m} />,
    })),
    { label: 'Địa Điểm', render: (n, t) => <Venues no={n} total={t} /> },
    { label: 'Chương Trình', render: (n, t) => <Schedule no={n} total={t} /> },
    { label: 'Khoảnh Khắc', render: (n, t) => <Gallery no={n} total={t} /> },
    { label: 'Mừng Cưới', render: (n, t) => <Gifts no={n} total={t} /> },
    { label: 'Sổ Lưu Bút', render: (n, t) => <Wishes no={n} total={t} /> },
    { label: 'Hẹn Gặp', render: (n, t) => <Closing no={n} total={t} /> },
  ]
  const total = chapters.length

  return (
    <Deck labels={chapters.map((c) => c.label)}>
      {chapters.map((c, i) => (
        <Fragment key={i}>{c.render(i + 1, total)}</Fragment>
      ))}
    </Deck>
  )
}
