/**
 * Created by Gustavo on 08/11/2015.
 */

var router = require('express').Router();
var common = require('../libs/common');
var customerCtrl = require('../controllers/customer');

module.exports = function(app, passport) {
    router.get('/login', isLoggedIn, function (req, res) {
        res.send(req.user);
    });

    router.post('/logon', passport.authenticate('local-login-admin'),
        function (req, res) {
            res.send(req.user);
        }
    );

    router.post('/logout', function(req, res) {
        req.logout();
        res.send(200);
    });

    router.get('/customer', customerCtrl.list);

    router.post('/findOne', function(req, res){
        customerCtrl.findOne(req, res);
    });

    router.post('/customer/save', function(req, res){
        customerCtrl.save(req, res);
    });

    router.post('/customer/update', function(req, res){
        customerCtrl.update(req, res);
    });

    router.get('/customer/:id', function(req, res){
        var data = {
            body: {
                cpf: req.params.id
            }
        };

        customerCtrl.findOne(data, res);
    });

    router.delete('/customer/:cpf', function(req, res){
        customerCtrl.delete(req, res);
    });

    return router;
};

// route middleware to check user auth
function isLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) 
    res.send(common.getErrorObj("unauthorized"));
else
    next();
}