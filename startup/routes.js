const express = require('express');
const user = require('../routes/user');
const district = require('../routes/district');
const branch = require('../routes/branch');
const policy = require('../routes/policy');
const member = require('../routes/member');
const extmember = require('../routes/extmember');
const title = require('../routes/title');
const auth = require('../routes/auth');
const cashfuneral = require('../routes/cashfuneral');
const error = require('../middleware/error');


module.exports = function(app) {
  app.use(express.json());
  app.use('/v1/user', user);
  app.use('/v1/district', district);
  app.use('/v1/branch', branch);
  app.use('/v1/policy', policy);
  app.use('/v1/member', member);
  app.use('/v1/extmember', extmember);
  app.use('/v1/title', title);
  app.use('/v1/auth', auth);
  app.use('/v1/cashfuneral', cashfuneral);
  app.use(error);
}
