import fetch from 'node-fetch'
import requestIp from 'request-ip'
import { supabase } from '../../lib/supabase'

const CAPTCHA_SEVER_KEY = process.env.CAPTCHA_SEVER_KEY
const VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify'

const saveToSupabase = async (formData) => {
  // Parse numeric values
  const guestCount = formData.approximate ? parseInt(formData.approximate) : null
  const budgetValue = formData.budget ? parseFloat(formData.budget) : null

  // Format wedding date to match date type
  const weddingDate = formData.weddingDate ? new Date(formData.weddingDate).toISOString() : null

  const { data, error } = await supabase
    .from('meraki_contact')
    .insert([
      {
        firstname: formData.firstname,
        lastname: formData.lastname,
        position: formData.position,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        weddingDate: weddingDate,
        weddingVenue: formData.weddingVenue,
        approximate_guest_count: guestCount,
        budget: budgetValue,
        ref: formData.ref,
        coupleName: formData.coupleName
      }
    ])

  if (error) {
    console.error('Error saving to Supabase:', error)
    return false
  }
  return true
}

const sendContactApi = async (req) => {
  const { query = {} } = req
  let text = ''
  for (const property in query) {
    text += `${property}: ${query[property]} ` + '\n'
  }

  const nodemailer = require('nodemailer')

  // Create transporter using Zoho SMTP
  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true, // use SSL
    auth: {
      user: process.env.ZOHO_EMAIL,
      pass: process.env.ZOHO_PASSWORD
    }
  })

  // Send email
  const info = await transporter.sendMail({
    from: `"Meraki Contact Form" <${process.env.ZOHO_EMAIL}>`,
    to: process.env.STRAPI_EMAIL_TO || 'contact@merakiweddingplanner.com',
    subject: 'Meraki Contact Form',
    text: text
  })

  return info
}

export default async function contact(req, res) {
  // Exit the current user from "Preview Mode". This function accepts no args.
  // Redirect the user back to the index page.

  res.writeHead(307, { Location: '/contact?posted=true' })
  res.end()

  try {
    const captchaToken = req?.query?.['g-recaptcha-response']
    // console.log({ captchaToken })
    if (!captchaToken) {
      throw new Error('g-recaptcha-response required!')
    }
    const remoteip = requestIp.getClientIp(req)
    const body = `secret=${CAPTCHA_SEVER_KEY}&response=${captchaToken}&remoteip=${remoteip}`
    // console.log({ body })
    const resultCapcha = await fetch(VERIFY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    }).then((res) => res.json())
    // console.log({ resultCapcha })
    if (resultCapcha?.success) {
      Promise.all([
        sendContactApi(req),
        saveToSupabase(req.query)
      ])
        .then(([emailResult, supabaseResult]) => {
          console.log('Contact form submitted successfully', {
            email: emailResult,
            database: supabaseResult
          })
        })
        .catch(error => {
          if (error.message.includes('supabase')) {
            console.error('Database error:', error)
          } else if (error.message.includes('mailjet')) {
            console.error('Email error:', error)
          } else {
            console.error('Error submitting form:', error)
          }
        })
    }
  } catch (error) {
    console.error('Error processing contact form:', error)
  }
}
