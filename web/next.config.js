require("dotenv").config();

module.exports = {
  env: {
    SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
    SEND_GRID_SEND_MAIL_API_KEY: process.env.SEND_GRID_SEND_MAIL_API_KEY
  }
};
