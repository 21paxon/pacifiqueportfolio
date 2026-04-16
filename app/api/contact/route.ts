import { NextRequest, NextResponse } from 'next/server'
import emailjs from '@emailjs/nodejs'

// Public key hardcoded for testing (remove in production)
emailjs.init({
  publicKey: 'WTN9zWC9KT3cy5425'
})



export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()
    
    console.log('Contact form submission:', { name, email, message })
    
    const serviceId = 'service_fhmrjxh'
    const templateId = 'template_krszzxh'

    await emailjs.send(serviceId, templateId, {
      name,
      email,
      message,
    })


    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ success: false, error: (error as Error).message || 'Failed to send message' }, { status: 500 })
  }

}

