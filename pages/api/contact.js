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

  const mailjet = require('node-mailjet').connect(
    process.env.MJ_APIKEY_PUBLIC,
    process.env.MJ_APIKEY_PRIVATE
  )

  const request = mailjet.post('send', { version: 'v3.1' }).request({
    Messages: [
      {
        From: {
          Email: 'form@merakiweddingplanner.com',
          Name: 'Meraki Contact Form',
        },
        To: [
          {
            Email:
              process.env.STRAPI_EMAIL_TO || 'contact@merakiweddingplanner.com',
            Name: 'Meraki',
          },
        ],
        Subject: 'Meraki Contact From',
        TextPart: text,
      },
    ],
  })
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
      await Promise.all([
        sendContactApi(req),
        saveToSupabase(req.query)
      ])
      console.log('Contact form submitted successfully')
    }
  } catch (error) {
    console.error('Error processing contact form:', error)
  }
}
