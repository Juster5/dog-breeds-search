import { API_KEY, URL_PREFIX, LIMIT } from "../../constants"

const fetchData = async () => {
  try {
    const response = await fetch(`${URL_PREFIX}?limit=${LIMIT}`, {
      headers: {
        "x-api-key": API_KEY,
      },
    })
    if (response.status === 200) {
      const json = await response.json()
      return json
    } else {
      return Promise.reject(response.statusText)
    }
  } catch (e) {
    return Promise.reject("Network error!")
  }
}

export default fetchData
