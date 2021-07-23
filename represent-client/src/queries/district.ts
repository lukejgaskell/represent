import axios from 'axios'

export function getDistrictByAddress(address: string) {
	return axios
		.get(`/api/district?address=${address}`)
		.then((res) => res.data.district)
}
