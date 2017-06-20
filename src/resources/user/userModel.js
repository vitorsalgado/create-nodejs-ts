'use strict';

const Monsoose = require('mongoose');

const user = new Monsoose.Schema({

});

module.exports.user = Monsoose.model('User', user);
