import React, { useEffect, useState } from "react"
import Loading from "../SLoading"

export type SImageProps = {
  link: string
  alt?: string
  width?: number
  height?: number
}

const ErrorImage = "https://demofree.sirv.com/nope-not-here.jpg"

const imgPromise = (src: string) => {
  return new Promise((resolve, reject) => {
    const i = new Image()
    i.onload = () => resolve(i.src)
    i.onerror = reject
    i.src = src
  })
}

const SImage = (props: SImageProps) => {
  const { link, alt, width, height } = props
  const [loading, setLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [url, setUrl] = useState("")

  useEffect(() => {
    setLoading(true)
    imgPromise(link)
      .then(
        (res) => {
          setUrl(res as string)
        },
        () => {
          setHasError(true)
        }
      )
      .catch(() => {
        setHasError(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return loading ? <Loading /> : <img src={hasError ? ErrorImage : url} alt={alt} width={width} height={height} />
}

export default React.memo(SImage)
