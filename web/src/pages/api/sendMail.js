const sendgridMail = require("@sendgrid/mail");

export default async (req, res) => {
  if (req.method !== "POST") {
    res.statusCode = 404;
    res.end();
  }

  const apiKey = process.env.BOM_SEND_GRID_SEND_MAIL_API_KEY;
  if (!apiKey) {
    res.statusCode = 500;
    res.end("No Send Grid API Key");
  }

  try {
    if (!req.body || req.body === "" || !req.body.email || !req.body.name || !req.body.text) {
      res.statusCode = 400;
      res.end();
    }

    sendgridMail.setApiKey(apiKey);

    await sendgridMail.send({
      to: "tommy@barvaag.com",
      from: "post@betongogmaskin.no",
      subject: `Contact from ${req.body.name}`,
      html: `<div>
          <h3>New message from ${req.body.name}</h3>
          <p>Can be contacted at: <a href="mailto:${req.body.email}">${req.body.email}</a>.</p>
          <p>${req.body.text}</p>
        </div>`
    });

    res.statusCode = 202;
    res.end();
  } catch (err) {
    res.statusCode = 500;
    res.end();
  }
};
