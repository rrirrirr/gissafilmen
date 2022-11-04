import axios from 'axios'

export async function load() {
  try {
    const res = await axios.get(`${import.meta.env.VITE_SCOREURL}/score`)
    const highScore = res.data
      .sort((a, b) => b.score - a.score)
      .slice(0, res.data.length > 9 ? 10 : res.data.length)
    return {
      highScore
    }
  } catch (error) {
		console.log(error)
		return [{name: 'not found', score: '0'}]
  }
}
