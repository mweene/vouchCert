import express from "express"
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import session from 'express-session'
import path from 'path'
import { fileURLToPath } from 'url'
import router from './routes/routes.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


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

export default function buildApp():express.Application {
  const app = express()

  app.set('view engine', 'ejs')
  app.set('views', path.join(__dirname, 'views'))
 
  app.use(morgan('dev'))
  app.use(helmet())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(generalLimiter)
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives()
      }
    }
  }))
  app.use(express.static(path.join(__dirname, 'public')))
  app.use(generalLimiter)
  app.use(session({
    secret: 'supersecrete',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,             // Cookie expires in 24 hours (in milliseconds)
      httpOnly: true,                          // Protects against XSS attacks
      secure: false                           //set true in production
    }
  }))
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

  return app
}
