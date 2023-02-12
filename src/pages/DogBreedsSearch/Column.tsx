import { ColumnType } from "../../components/STable"
import SImage from "../../components/SImage"

const Column: ColumnType[] = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Height(metric)",
    render(item: any) {
      return item.height && item.height.metric
    },
  },
  {
    title: "Life Span",
    render(item: any) {
      return item.life_span
    },
  },
  {
    title: "Image",
    render(item: any) {
      return (
        <a href={item.image.url} target='_blank' rel='noreferrer'>
          <SImage link={item.image.url} alt='img' width={100} />
        </a>
      )
    },
  },
]

export default Column