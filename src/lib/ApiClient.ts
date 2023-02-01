import { USELESS_API_URL } from './Constants'

export const fetchUselessFactData = async () => {
  try {
    const response = await fetch(USELESS_API_URL)
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}
