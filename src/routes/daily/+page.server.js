import { invalid } from '@sveltejs/kit'
import axios from 'axios'

export async function load({ params }) {
  const res = await axios.get(`${import.meta.env.VITE_SCOREURL}/dailyseed`)
	return {
		seed: res.data
	}
}

export const actions = {
	score: async ({ request }) => {
		const data = await request.formData()
		console.log(data)
		const name = data.get('name')
		const score = data.get('score')
		if (!name.length) {
			return invalid(400, { name, missing: true })
		}
		if (name.toLowerCase() === 'you') {
			return invalid(400, { name, incorrect: true })
		}
		await axios.post(`${import.meta.env.VITE_SCOREURL}/score`, { name, score: parseInt(score) })
		return { success: true }
	}
}
