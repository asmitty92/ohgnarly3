var User = require('../models/user');
var Category = require('../models/category');
var UserContact = require('../models/userContact');
var PendingUser = require('../models/pendingUser');
const authentication = require('../services/authentication');

module.exports.showHomePage = (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
};

module.exports.login = (req, res) => {
    let username = req.body.userName.toLowerCase();
    User.findOne({userName: username}, (err, user) => {
        if (err) {
            console.error(err);
            return res.send({success: false, userId: null});
        }

        var encryptedPassword = authentication.encryptString(req.body.password);
        if (user && user.password == encryptedPassword) {
            res.send({success: true, userId: user._id});
        } else {
            res.send({success: false, userId: null});
        }
    });
};

module.exports.createUser = (req, res) => {
    PendingUser.find().exec((err, users) => {
        if (err) {
            return console.error(err);
        }

        if (users && users.length && users.length >= 20) {
            res.send({success: false});
        } else {
            var pendingUser = new PendingUser({
                userName: req.body.username,
                password: req.body.password,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                emailAddress: req.body.emailAddress
            });
        
            pendingUser.save();
            res.send({success: true});
        }
    });
};

module.exports.getUsers = (req, res) => {
    User.find().exec((err, users) => {
        if (err) {
            return console.error(err);
        }

        res.send(users);
    });
};

module.exports.getCategories = (req, res) => {
    Category.find().exec((err, categories) => {
        if (err) {
            return console.error(err);
        }

        res.send(categories);
    });
};

module.exports.getContacts = (req, res) => {
    UserContact.find({userId: req.params.userId}).exec((err, contacts) => {
        User.find({_id: {"$in": contacts.map(e => e.contactId)}}).exec((err, users) => {
            if (err) {
                return console.error(err);
            }

            res.send(users);
        });
    });
};

module.exports.getUser = (req, res) => {
    var userId = req.params.userId;
    User.findById(userId).exec((err, user) => {
       if (err) {
           console.error(err);
           res.status(500);
       } 

       res.send(user);
    });
};

module.exports.logObject = (req, res) => {
    console.log(req.body.logObject);

    res.send({success: true});
};

module.exports.checkUsername = (req, res) => {
    var query = {userName: req.body.username};
    User.findOne(query).exec((err, user) => {
        if (err) {
            return console.error(err);
        }

        var response = {
            isAvailable: !user
        }

        res.send(response);
    });
};

module.exports.checkEmailAddress = (req, res) => {
    var query = {emailAddress: req.body.emailAddress};
    User.findOne(query).exec((err, user) => {
        if (err) {
            return console.error(err);
        }

        var response = {
            isAvailable: !user
        }

        res.send(response);
    });
};

module.exports.createManualUser = (req, res) => {
    var user = new User({
        userName: 'rokeefe',
        password: 'WinterIsComing',
        firstName: 'Rob',
        lastName: "O'Keefe",
        emailAddress: 'test@test.com'
    });

    user.save();
    res.send({success: true});
};

module.exports.updateUserPasswords = (req, res) => {
    User.find().exec((err, users) => {
        for (let user of users) {
            console.log(user.userName);
            let query = {_id: user._id};
            let update = {password: authentication.encryptString(user.password)};

            User.findOneAndUpdate(query, update, (err) => {
                if (err) {
                    return console.error(err);
                }

                console.log('done');
            })
        }
    });
}