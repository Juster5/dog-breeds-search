

const debounce = (fn,delay = 1000) => {
  if (typeof fn !== "function") {
    throw new Error("first param should be a function!")
  }

  let timer = null

  return (...args) => {
    clearTimeout(timer)

    timer = setTimeout(() => {
      fn(args)
      timer = null
    },delay)
  }
}

export default debounce
