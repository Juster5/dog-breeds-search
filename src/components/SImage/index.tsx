import React, { useEffect, useState } from "react"
import Loading from "../SLoading"

export type SImageProps = {
  src: string
  alt?: string
  width?: number
  height?: number
}

const ErrorImage = "https://demofree.sirv.com/nope-not-here.jpg"

const imgPromise = (src: string) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img.src)
    img.onerror = reject
    img.src = src
  })
}

const SImage = (props: SImageProps) => {
  const { src, alt, width, height } = props
  const [loading, setLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [url, setUrl] = useState("")

  useEffect(() => {
    setLoading(true)
    imgPromise(src)
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
