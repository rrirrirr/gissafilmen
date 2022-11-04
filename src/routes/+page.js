import axios from 'axios'

export async function load() {
  const res = await axios.get(`${import.meta.env.VITE_SCOREURL}/score`)
  const highScore = res.data
    .sort((a, b) => b.score - a.score)
    .slice(0, res.data.length > 9 ? 10 : res.data.length)

  return {
    highScore
  }
}
