import { yearGame } from './games/year'
import { ratingGame } from './games/rating'
import { ratingTopGame } from './games/ratingtop'

const games = [
  yearGame,
  ratingGame,
  ratingTopGame
]

export default function gameChooser() {
	const index  =  Math.floor(Math.random() * games.length)
	return games[index]
}
