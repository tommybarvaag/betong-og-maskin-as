require("dotenv").config();

module.exports = {
  env: {
    BOM_GOOGLE_MAPS_API_KEY: process.env.BOM_GOOGLE_MAPS_API_KEY,
    BOM_SANITY_PROJECT_ID: process.env.BOM_SANITY_PROJECT_ID,
    BOM_SEND_GRID_SEND_MAIL_API_KEY: process.env.BOM_SEND_GRID_SEND_MAIL_API_KEY
  }
};
