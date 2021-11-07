"use strict"
const Geocodio = require("geocodio-library-node")

const geocoder = new Geocodio(process.env.GEOCODIO_TOKEN)

module.exports.run = async (event, context) => {
  console.info(`Api function "${context.functionName}" has been called`)
  const { address } = event.queryStringParameters
  try {
    const result = await geocoder.geocode(address, ["cd"]).then(r => r.results[0])

    console.info(result)
    const district = result.fields.congressional_districts[0].district_number
    const state = result.address_components.state
    return { statusCode: 200, body: JSON.stringify({ ...result, district, state, fields: undefined }) }
  } catch (e) {
    return Error(e)
  }
}
