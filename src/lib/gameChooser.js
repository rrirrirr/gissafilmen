import { yearGame } from './games/year'
import { ratingGame } from './games/rating'

const games = [
  yearGame,
  ratingGame
]
export default function gameChooser() {
	const index  =  Math.floor(Math.random() * games.length)
	return games[index]
}
