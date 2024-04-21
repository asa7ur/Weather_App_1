require('dotenv').config()
const axios = require('axios')

const url = `https://api.openweathermap.org/data/2.5/forecast?appid=${process.env.API_KEY}&units=metric&q=`

exports.handler = async (event, context) => {
	const method = event.httpMethod
	// console.log(method);

	if (method !== 'POST') {
		return {
			statusCode: 405,
			body: 'Only POST Requests Allowed',
		}
	}
	const { location } = JSON.parse(event.body)
	try {
		const resp = await axios.get(`${url}${location}`)
		return {
			statusCode: 200,
			body: JSON.stringify(resp.data),
		}
	} catch (error) {
		return {
			statusCode: 404,
			body: JSON.stringify(error),
		}
	}
}
