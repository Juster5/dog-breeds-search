import React, { useEffect, useMemo, useState } from "react"
import STable from "../../components/STable"
import SSelect from "../../components/SSlector"
import SButton from "../../components/SButton"
import Loading from "../../components/SLoading"
import debounce from "../../utils/debounce"
import fetchData from "./fetchData"
import Column from "./Column"
import SortDogBrees, { SortOptions } from "./SortDogBreed"

import "./index.scss"

const DogBreedsSearch = () => {
  const [sortOption, setSortOption] = useState(SortOptions[0].title)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>([])

  const debounceFetch = useMemo(() => {
    return debounce(() => {
      if (loading) return
      setLoading(true)
      fetchData()
        .then((data) => {
          setData(data)
        })
        .finally(() => {
          setLoading(false)
        })
    })
  }, [])

  useEffect(() => {
    debounceFetch()
  }, [])

  useEffect(() => {
    if (loading) {
      return
    }

    SortDogBrees({
      data,
      sortOption,
    })

    setData([...data])
  }, [loading, sortOption])

  return (
    <div className='dog-breeds-search'>
      <div>
        <span className='sort-by-text'>SortBy</span>
        <SSelect
          menus={SortOptions}
          onSelect={(el: any) => {
            setSortOption(el.title)
          }}
        />
        <SButton loading={loading} onClick={debounceFetch}>
          Search
        </SButton>
      </div>
      {loading ? <Loading /> : <STable data={data} column={Column} />}
    </div>
  )
}

export default React.memo(DogBreedsSearch)
