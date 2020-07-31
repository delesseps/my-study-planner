import * as admin from 'firebase-admin'
import config from '../config'

const serviceAccount = config.firebase

if (process.env.NODE_ENV === 'production') {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as any),
  })
}

export default admin
