import * as nodemailer from 'nodemailer'
import config from '.'

let transporter = nodemailer.createTransport({
  // @ts-ignore
  host: config.nodemailer.host,
  port: config.nodemailer.port,
  auth: {
    user: config.nodemailer.username,
    pass: config.nodemailer.password,
  },
})

if (process.env.NODE_ENV === 'production') {
  transporter = nodemailer.createTransport({
    host: config.nodemailer.host,
    port: config.nodemailer.port,
    secure: true,
    auth: {
      user: config.nodemailer.username,
      pass: config.nodemailer.password,
    },
  })
}

export default transporter
