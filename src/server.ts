import buildApp from "./app.js"
import dotenv from 'dotenv'

dotenv.config()

const port = process.env.PORT || 3132
const app = buildApp()

app.listen(port, () => {
  console.log(`server is listening on port: ${port}`)
})
