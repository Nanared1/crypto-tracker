/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()
const express = require("express")
const axios = require("axios")
const app = express()
const cors = require('cors')
const port = 3001

app.use(cors({
	origin: '*'
}))

app.get("/cryptocurrency/listings/latest", async (req, res) => {
  const apiResponse = await axios.get(
    "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
    {
      params: { limit: req.params.limit ?? 10 },
      headers: {
        "X-CMC_PRO_API_KEY": process.env.CMC_PRO_API_KEY,
        Accept: "application/json",
      },
    },
  )

  return res.status(apiResponse.status).send(apiResponse.data)
})

app.listen(port, () => {
  console.log(`Cryto app backend listening on port ${port}`)
})
