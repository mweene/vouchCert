import express from 'express'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import router from './routes/routes.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const port = process.env.PORT || 3030

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

//rate limiters
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100
})

const verifyLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30
})

const authlLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives()
    }
  }
}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(generalLimiter)
app.use(router)

app.use((req, res) => {
  res.status(404).render('404')
})

app.use((
  err: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  console.error(err)
  res.status(500).render('500')
})

app.listen(port, () => {
  console.log(`server is listening on port: ${port}`)
})
