"use strict"
const Geocodio = require("geocodio-library-node")

const geocoder = new Geocodio(process.env.GEOCODIO_TOKEN)

module.exports.run = async (event, context) => {
  console.info(`Api function "${context.functionName}" has been called`)
  console.info("event", event)
  const { address } = event
  const result = await geocoder.geocode(address, ["cd"]).then(r => r.results[0])

  const district = result.fields.congressional_districts[0].district_number
  const state = result.address_components.state

  return { ...result, district, state, fields: undefined }
}
