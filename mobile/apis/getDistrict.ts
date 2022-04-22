import axios from "axios"

const getDistrictApi = "https://h9hwo88rtd.execute-api.us-east-1.amazonaws.com/prod/getDistrict"

export function getAddressInfo(address: string) {
  return axios.get(`${getDistrictApi}?address=${address}`).then(res => res.data)
}
