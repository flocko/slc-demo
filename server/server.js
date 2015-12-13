var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();

// passport configuration
var loopbackPassport = require('loopback-component-passport');
var PassportConfigurator = loopbackPassport.PassportConfigurator;
var passportConfigurator = new PassportConfigurator(app);

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});

// enable http session
app.use(loopback.session({
  secret: 'say what',
  resave: true,
  saveUninitialized: true
}));

// load provider configuration
var config = {};
try {
  config = require('../providers.json');
} catch(err) {
  console.trace(err);
  process.exit(1);
}

// pasport init
passportConfigurator.init();

// set up related models
passportConfigurator.setupModels({
  userModel: app.models.account,
  userIdentityModel: app.models.accountIdentity,
  userCredentialModel: app.models.accountCredential
});

// configure passport for 3rd party
for(var s in config) {
  var c = config[s];
  c.session = c.session !== false;
  passportConfigurator.configureProvider(s, c);
}
