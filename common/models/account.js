module.exports = function(Account) {
  // disable acl from User model
  Account.settings.acls.length = 0;

  // overwrite built in configuration
  Account.settings.acls = require('./accountacl.json');
};
