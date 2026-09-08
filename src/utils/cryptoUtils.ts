import { scryptSync, randomBytes, timingSafeEqual } from 'node:crypto'


const createHash = (plainTextStr:string):string => {
  const salt = randomBytes(16).toString('hex')
  const derivedKey = scryptSync(plainTextStr, salt, 64)
  return `${salt}:${derivedKey.toString('hex')}`
}

const verifyHash = (plainTextStr:string, storedHashStr:string):boolean => {
  const [salt, key] = storedHashStr.split(':')
  if(!salt || !key) return false

  const computedKeyBuffer = scryptSync(plainTextStr, salt, 64)
  const storedKeyBuffer = Buffer.from(key, 'hex')

  if(computedKeyBuffer.length !== storedKeyBuffer.length)
    return false

  return timingSafeEqual(computedKeyBuffer, storedKeyBuffer)
}


export { 
  createHash,
  verifyHash
}

