import axios from "axios"

const getDistrictApi = "https://k9spp0jupb.execute-api.us-east-1.amazonaws.com/prod/getDistrict"

export function getAddressInfo(address: string) {
  return axios.get(`${getDistrictApi}?address=${address}`).then(res => res.data)
}
