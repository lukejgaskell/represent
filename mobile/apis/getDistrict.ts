import axios from "axios"

const getDistrictApi = "https://api-represent.gaskellsolutions.com/getDistrict"

export function getAddressInfo(address: string) {
  return axios.get(`${getDistrictApi}?address=${address}`).then(res => res.data)
}
