import { NextApiRequest, NextApiResponse } from 'next' // @ts-ignore
import Geocodio from 'geocodio-library-node'

const geocoder = new Geocodio(process.env.GEOCODIO_TOKEN)

export async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { address } = req.query
	const result = await geocoder
		.geocode(address, ['cd'])
		.then((r: any) => r.results[0])

	const district = result.fields.congressional_districts[0].district_number

	res.send({ ...result, district, fields: undefined })
}
