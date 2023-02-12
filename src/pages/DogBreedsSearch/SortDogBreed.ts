import { MenuItemType } from "../../components/SSlector"
export const PLEASE_SELECT = "default"
export const HEIGHT_DESC = "height desc"
export const HEIGHT_ASC = "height asc"
export const NAME_DESC = "name desc"
export const NAME_ASC = "name asc"
export const LIFE_SPAN_DESC = "life span desc"
export const LIFE_SPAN_ASC = "life span asc"

export const SortOptions: MenuItemType[] = [
  {
    title: PLEASE_SELECT,
  },
  {
    title: NAME_DESC,
  },
  {
    title: NAME_ASC,
  },
  {
    title: HEIGHT_DESC,
  },
  {
    title: HEIGHT_ASC,
  },
  {
    title: LIFE_SPAN_DESC,
  },
  {
    title: LIFE_SPAN_ASC,
  },
]

type SortDogBreesProps = {
  data: any[]
  sortOption: string
}

// longest years is priority, eg '8 - 12' < '7 - 13'
// if longest years equals, compare shortest years, eg '7 - 12' < '8 - 12'
// if only one year provided, longest years and shortest years is the same, eg '12' = '12 - 12' < '12 - 13';  '12' = '12-12'>'11 -12'
export const commpareArea = (a: string, b: string) => {
  if (a === "" && b === "") {
    return 0
  } else if (a === "" && b !== "") {
    return 1
  } else if (a !== "" && b === "") {
    return -1
  }

  let [aMin, aMax] = a.match(/\d+/g) as Array<string>
  let [bMin, bMax] = b.match(/\d+/g) as Array<string>

  if (!aMax) {
    aMax = aMin
  }

  if (!bMax) {
    bMax = bMin
  }

  let aMinNum = parseInt(aMin)
  let aMaxNum = parseInt(aMax)
  let bMinNum = parseInt(bMin)
  let bMaxNum = parseInt(bMax)

  if (aMinNum === bMinNum && aMaxNum === bMaxNum) {
    return 0
  }

  if (bMaxNum > aMaxNum) {
    return 1
  }

  if (aMaxNum > bMaxNum) {
    return -1
  }

  if (bMinNum > aMinNum) {
    return 1
  }

  if (aMinNum > bMinNum) {
    return -1
  }

  return 0
}

const SortDogBrees = (props: SortDogBreesProps) => {
  const { data, sortOption } = props

  if (sortOption === PLEASE_SELECT) {
    return data
  }

  data.sort((a, b) => {
    if (sortOption === HEIGHT_DESC) {
      return commpareArea(a.height.metric, b.height.metric)
    } else if (sortOption === HEIGHT_ASC) {
      return -commpareArea(a.height.metric, b.height.metric)
    } else if (sortOption === NAME_DESC) {
      return a.name.localeCompare(b.name)
    } else if (sortOption === NAME_ASC) {
      return -a.name.localeCompare(b.name)
    } else if (sortOption === LIFE_SPAN_DESC) {
      return commpareArea(a.life_span, b.life_span)
    } else if (sortOption === LIFE_SPAN_ASC) {
      return -commpareArea(a.life_span, b.life_span)
    }

    return 0
  })

  return data
}

export default SortDogBrees
