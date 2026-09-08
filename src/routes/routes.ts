import { Router } from 'express'
import bcrypt from 'bcryptjs'

const router:Router = Router()


function isAuthenticated(req, res, next) {
  if(req.session.user) { 
    return next()
  } else {
    res.redirect('/api/login')
  }
} //auth middleware


//homepage
router.get('/', isAuthenticated, (req, res) => {
  res.status(200).render('home')
})

//auth
router.get('/api/login', (req, res, next) => {
  if(req.session.user) {
    res.status(200).redirect('/')
  } else {
    res.status(200).render('login')
  }
})

router.post('/api/login', (req, res) => {
  const { username, password } = req.body
  if(username === 'mweene' && password === '1234') {
    req.session.user = username
    res.status(200).redirect('/')
  } else {
    res.render('login')
  }
})

router.post('/api/logout', (req, res) => {})

//certificates
router.post('/api/certificates', isAuthenticated, (req, res) => {
  const institutionName = 'ALPHABET INSTITUTE'
  const fullDetails = `${JSON.stringify({institutionName, ...req.body})}`

  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(fullDetails, salt)
  console.log(hash)
  //create a hash and push it to the database
  const compare = bcrypt.compareSync(fullDetails, hash)
  console.log(compare)

}) //create new certificate
router.post('/api/certificates/bulk', (req, res) => {}) //issue many certificates

router.get('/api/certificates', (req, res) => {}) //list certificates
router.post('/api/certificates/:id', (req, res) => {}) //get one certificate
router.patch('/api/certificates/:id/revoke', (req, res) => {}) //revoke certificate
router.get('/api/certificates/:id/qr', (req, res) => {}) //get/regenerate qrcode image
router.get('/api/certificates/:id/pdf', (req, res) => {}) //generate/download pdf

//verification public no auth
router.get('/api/verify/:publicCode', (req, res) => {}) //qrcode verification

//health
router.get('/api/health', (req, res) => {}) //check api health

export default router
