// server/index.js
const express = require("express");
const cors = require('cors')
const axios = require('axios')
const nodemailer = require('nodemailer')
const {convert} = require('html-to-text')
require('dotenv').config()

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    type: 'OAuth2',
    user: process.env.user,
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret,
    refreshToken: process.env.refreshToken,
    accessToken: process.env.accessToken
  }
})

const getData = async (url) => {
  try {
    const response = await axios.get(url)
    const data = response.data
    return data
  } catch (error) {
    console.log(error)
  }
}

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json())
app.use(cors())

app.get("/api", async (req, res) => {
    const data = await getData(process.env.GOOGLE_SHEET)
    res.json({invitees: data.invitees, openEditRsvp: false})
  });

app.get('/api/:groupId', async (req, res) => {
  const data = await getData(process.env.GOOGLE_SHEET)
  console.log(req.params.groupId)
  res.json({invitees: data.invitees.filter(person => person.groupID === req.params.groupId), openEditRsvp: true})
})

app.post("/api", function(request, response) {

  axios.post(process.env.GOOGLE_SHEET, request.body)
    .then(function () {
      response.json({posted: "success"})
    })
    .catch(function(error) {
      console.log(error)
    })
})

app.post('/api/mail', (request, response) => {
  
  console.log(request.body)

  const htmlBody = `
  <p>Thank you for your RSVP! Please check your details below to make sure everything looks right.</p>
  <table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Attending?</th>
        </tr>
    </thead>
    <tbody>
        ${request.body.familyGroup.map(person => {
          return `<tr>
                    <td>${person.firstName} ${person.lastName}</td>
                    <td>${person.rsvp}</td>
                  </tr>`}).join('')}
    </tbody>
  </table>
  <p><strong>Notes:</strong> <em>${request.body.familyGroup[0].comments}</em></p>
  <p>If you need to change anything about your RSVP, you can use this unique link: <a href="http://wilson-leutz.com/wedding/${request.body.familyGroup[0].groupID}">http://wilson-leutz.com/wedding/${request.body.familyGroup[0].groupID}</a></p>
  `

  const mailText = convert(htmlBody, {wordwrap: 130})
  console.log(mailText)
  const mail = {
    from: process.env.email,
    to: request.body.familyGroup[0].email,
    subject: "RSVP for Kylie and Eric's Wedding",
    text: mailText,
    html: htmlBody
  }
  
  transporter.sendMail(mail, (err, info) => {
    if (err) {
      console.log(err)
    } else {
      response.json({"sent": "success"})
      console.log("info.messageId: " + info.messageId);
      console.log("info.envelope: " + info.envelope);
      console.log("info.accepted: " + info.accepted);
      console.log("info.rejected: " + info.rejected);
      console.log("info.pending: " + info.pending);
      console.log("info.response: " + info.response);
    }
    transporter.close()
  })
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});