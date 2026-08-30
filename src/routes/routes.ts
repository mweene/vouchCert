import { Router } from "express"

const router:Router = Router()

//homepage
router.get('/', (req, res) => {
  res.status(200).render('index')
})

//auth
router.post('/api/auth/login', (req, res) => {})
router.post('/api/auth/logout', (req, res) => {})
//certificates
router.post('/api/certificates', (req, res) => {}) //create new certificate
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
