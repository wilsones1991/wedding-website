// server/index.js
// to ship updates --> gcloud app deploy

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const { convert } = require("html-to-text");
const { google } = require("googleapis");
const path = require("path");
require("dotenv").config();

const keyfile = path.join(
  __dirname,
  "../wedding-database-359900-d106c43a9a78.json"
);

const auth = new google.auth.GoogleAuth({
  keyFile: keyfile,
  scopes: ["https://www.googleapis.com/auth/drive"],
});

const sheets = google.sheets("v4");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    user: process.env.user,
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret,
    refreshToken: process.env.refreshToken,
    accessToken: process.env.accessToken,
  },
});

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.json());

function convertDataToObjects(data) {
  // Format data so front end can read it
  const dataHeaders = [
    "firstName",
    "lastName",
    "email",
    "groupID",
    "uniqueID",
    "row",
    "rsvp",
    "comments",
  ];

  const dataAsObjects = data.map((row) => {
    const rowObject = {};
    for (let i = 0; i < dataHeaders.length; i++) {
      if (row[i] === undefined) {
        rowObject[dataHeaders[i]] = "";
      } else {
        rowObject[dataHeaders[i]] = row[i];
      }
    }
    return rowObject;
  });
  return dataAsObjects;
}

app.get("/api", async (req, res) => {
  try {
    const data = await sheets.spreadsheets.values.get({
      auth: auth,
      spreadsheetId: "141zEqk-SspamaAUT6m62ZWBYdcab1c9-cllgHc0ZEZk",
      range: "RSVPs!A2:H150",
    });
    res.json({
      invitees: convertDataToObjects(data.data.values),
      openEditRsvp: false,
    });
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.get("/api/:groupId", async (req, res) => {
  try {
    const data = await sheets.spreadsheets.values.get({
      auth: auth,
      spreadsheetId: "141zEqk-SspamaAUT6m62ZWBYdcab1c9-cllgHc0ZEZk",
      range: "RSVPs!A2:H150",
    });
    res.json({
      invitees: convertDataToObjects(
        data.data.values.filter((person) => person[3] === req.params.groupId)
      ),
      openEditRsvp: true,
    });
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.post("/api", async (request, response) => {
  const service = google.sheets({ version: "v4", auth });
  const values = request.body.map((object) => {
    return Object.values(object);
  });

  try {
    const result = await service.spreadsheets.values.update({
      spreadsheetId: "141zEqk-SspamaAUT6m62ZWBYdcab1c9-cllgHc0ZEZk",
      range: `RSVPs!A${request.body[0].row}:H${
        request.body[request.body.length - 1].row
      }`,
      valueInputOption: "USER_ENTERED",
      resource: { values },
    });
    response.json({ posted: "success" });
  } catch (err) {
    throw err;
  }
});

app.post("/api/mail", (request, response) => {
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
        ${request.body
          .map((person) => {
            return `<tr>
                    <td>${person.firstName} ${person.lastName}</td>
                    <td>${person.rsvp}</td>
                  </tr>`;
          })
          .join("")}
    </tbody>
  </table>
  <p><strong>Notes:</strong> <em>${request.body[0].comments}</em></p>
  <p>If you need to change anything about your RSVP, you can use this unique link: <a href="http://wilson-leutz.com/wedding/${
    request.body[0].groupID
  }">http://wilson-leutz.com/wedding/${request.body[0].groupID}</a></p>
  `;

  const mailText = convert(htmlBody, { wordwrap: 130 });
  const mail = {
    from: process.env.email,
    to: request.body[0].email,
    subject: "RSVP for Kylie and Eric's Wedding",
    text: mailText,
    html: htmlBody,
  };

  transporter.sendMail(mail, (err, info) => {
    if (err) {
      console.log(err);
      response.json({ error: err });
    } else {
      response.json({ sent: "success" });
    }
    transporter.close();
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
