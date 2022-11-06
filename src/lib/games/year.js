import axios from 'axios'

const pages = 99
const votes = 2000
const MAXX = 650

function distribution(start) {
  const x = Math.random() * MAXX
  const step = Math.round(1 + (x * x * x * x) / 1000000000)
  const sign = Math.floor(Math.random() * 2) * 2 - 1
  const page = start + sign * step
  if (page > pages) return pages
  if (page < 2) return 1
  return page
}

function fetchMovies(numberOfMovies, uniqueProp) {
  uniqueProp.val = null
  let page1 = 0
  const movies = Array(numberOfMovies).fill().map(async (_, i) => {
    let currentProp = Object.assign(uniqueProp)
    let movie = null
    let tries = 0
    while (currentProp.val === uniqueProp.val && tries < 10) {
      const page = i === 0
        ? Math.floor(Math.random() * pages) + 1
        : distribution(page1)
      if (i === 0) page1 = page
      let res
      try {
        res = await axios.get(
          // `${import.meta.env.VITE_URL}/discover/movie?sort_by=popularity.desc&page=${page1}`,
          `${import.meta.env.VITE_URL}/discover/movie?sort_by=release_date.desc&vote_count.gte=${votes}&page=${page}`,
          {
            headers: { Authorization: `Bearer ${import.meta.env.VITE_TOKEN}` }
          }
        )
      } catch (error) {
        console.log(error)
      }
      if (res?.data?.results?.length) {
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
    }
    return movie
  })
  return movies
}

export async function yearGame() {
  return new Promise(async (resolve, reject) => {
    try {
      const movies = await Promise.all(fetchMovies(2, { key: 'release_date' }))
      const winner = new Date(movies[0].release_date) - new Date(movies[1].release_date) > 0 ? 1 : 0
      resolve(
        {
          title: 'Which movie is /older?/',
          subText: '',
          alternatives: movies.map((movie, index) => {
            return {
              picture: movie.poster_path,
              title: movie.title,
              winner: index === winner,
              gameOver: movie.release_date
            }
          })
        }
      )
    } catch (error) {
      reject(error)
    }
  })
}

