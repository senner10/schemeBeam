//If you make any changes to schemeBeam, make sure you NEVER reference this config file on the front end of your code.

module.exports = {
  //Port on which to deploy app.js
  port: 80,
  //Your personal SendGrid API key. 
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  //The id of the list you would like your client emails to (a number, can be found at the end the url path of your list)
  list_Id: process.env.SENDGRID_LIST_ID,
  //Mysql configuration
  mysql: {
    schema: "schemeBeam",
    username: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    socketPath: `/cloudsql/${process.env.SQL_INSTANCE_CONNECTION_NAME}`,
    database: process.env.SQL_DATABASE
  },
  //Make absolutely sure you change these values before you start your campaign. Used to log into admin UI and gain access to certain API endpoints.
  admin: {
  	username: process.env.ADMIN_USERNAME,
  	password: process.env.ADMIN_PASSWORD
  },
  //secret for authentication process. change to whatever you'd like.
  passportSecret: process.env.SCHEME_BEAM_SECRET
}
