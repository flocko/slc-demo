var mongoHost = process.env.OPENSHIFT_MONGODB_DB_HOST;
var mongoPort = process.env.OPENSHIFT_MONGODB_DB_PORT;
var mongoPass = process.env.OPENSHIFT_MONGODB_DB_PASSWORD;
var mongoUser = process.env.OPENSHIFT_MONGODB_DB_USERNAME;

module.exports = {
  mongodb: {
    host: mongoHost,
    port: mongoPort,
    database: "funcourt",
    user: mongoUser,
    password: mongoPass,
    createDatabase: true
  }
};
