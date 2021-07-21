import { NextApiRequest, NextApiResponse } from 'next' // @ts-ignore
import Geocodio from 'geocodio-library-node'

const geocoder = new Geocodio('0660c86c7977cddc7770c76f470c79fd79f0044')

export async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { address } = req.query
	const result = await geocoder
		.geocode(address, ['cd'])
		.then((r: any) => r.results[0].fields.congressional_districts[0])
	res.send({ ...result, current_legislators: undefined })
}
