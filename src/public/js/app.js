'use strict'

const button = document.getElementById('new_certificate')
const newCertificateForm = document.getElementById('form')

button.addEventListener('click', () => {
  newCertificateForm.classList.toggle('hidden')
})

const postData = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(data)
    })

    if(!response.ok) throw new Error(`Http status code: ${response.status}`)

    return response
  } catch(err) {
    console.error(err)
    throw err
  }
}

newCertificateForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  try {
    const formdata = new FormData(newCertificateForm)
    const formdataObj = Object.fromEntries(formdata.entries())
    const response = await postData('/api/certificates', formdataObj)
    
    if(response && response.ok) {
      newCertificateForm.reset()
      newCertificateForm.classList.add('hidden')
    }
  } catch(err) {
    console.error(err)
  }
})
