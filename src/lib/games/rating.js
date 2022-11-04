import axios from 'axios'

const pages = 50
const votes = 50000

function fetchMovies(numberOfMovies, uniqueProp) {
  uniqueProp.val = null
  const movies = Array(numberOfMovies).fill().map(async (_, i) => {
    let currentProp = Object.assign(uniqueProp)
    let movie = null
    let tries = 0
    while (currentProp.val === uniqueProp.val && tries < 10) {
      const page = Math.floor(Math.random() * pages) + 1
      const res = await axios.get(
        // `${import.meta.env.VITE_URL}/discover/movie?sort_by=popularity.desc&page=${page1}`,
        `${import.meta.env.VITE_URL}/movie/top_rated?sort_by=popularity.desc&vote_count.gte=${votes}&page=${page}`,
        {
          headers: { Authorization: `Bearer ${import.meta.env.VITE_TOKEN}` }
        }
      )
      const length = res.data.results.length
      let triesb = 0
      let foundMovie = false
      while (!foundMovie && triesb < 10) {
        const index = Math.floor(Math.random() * length)
        movie = res.data.results[index]
        if (movie[uniqueProp.key] !== uniqueProp.val) {
          foundMovie = true
        }
        triesb++
      }
      currentProp.val = movie[uniqueProp.key]
      tries++
      if (foundMovie) {
        if (i === 0) uniqueProp.val = movie[uniqueProp.key]
        return movie
      }
    }
    return movie
  })
  return movies
}

export async function ratingGame() {
  return new Promise(async (resolve, reject) => {
    try {
      const movies = await Promise.all(fetchMovies(2, { key: 'vote_average' }))
      console.log(movies)
      const winner = movies[1].vote_average - movies[0].vote_average > 0 ? 1 : 0
      resolve(
        {
          title: 'Which movie has better /rating?/',
          subText: 'avg. rating',
          alternatives: movies.map((movie, index) => {
            return {
              picture: movie.poster_path,
              title: movie.title,
              winner: index === winner,
              gameOver: movie.vote_average
            }
          })
        }
      )
    } catch (error) {
      reject(error)
    }
  })
}