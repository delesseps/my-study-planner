import * as admin from 'firebase-admin'
import config from '../config'

const serviceAccount = config.firebase

console.log(config.firebase)

if (process.env.NODE_ENV === 'production') {
  serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n')

  console.log(serviceAccount)
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as any),
  })
}

export default admin
