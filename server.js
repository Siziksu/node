const fs = require('fs');
const request = require('request');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const PATH_CLIENT = 'public';
const PATH_SERVER = 'server';
const PATH_VIEWS = path.join(PATH_SERVER, 'views');
const PATH_REPOSITORY = path.join(PATH_SERVER, 'repository');
const PATH_BACKUP = path.join(PATH_REPOSITORY, 'backup');

const FILE_USERS = path.join(PATH_REPOSITORY, 'user_list.json');
const FILE_USERS_BACKUP = path.join(PATH_BACKUP, 'user_list.json');
const FILE_WARFRAMES = path.join(PATH_REPOSITORY, 'warframe_list.json');

const OWM_SERVER = 'http://api.openweathermap.org/data/2.5/weather';
const OWM_API_KEY = '3db09a5921e4199f2cc3c80cc5e07b36';
const OWM_CITY = 'Barcelona,Spain';
const OWM_UNITS = 'metric';

/* Use */

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static(PATH_CLIENT));

/* Navigation */

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, PATH_VIEWS, 'index.html'));
})

app.get('/index', function (req, res) {
    res.sendFile(path.join(__dirname, PATH_VIEWS, 'index.html'));
})

app.get('/barcelona', function (req, res) {
    res.sendFile(path.join(__dirname, PATH_VIEWS, 'barcelona.html'));
})

app.get('/users', function (req, res) {
    res.sendFile(path.join(__dirname, PATH_VIEWS, 'users.html'));
})

app.get('/warframes', function (req, res) {
    res.sendFile(path.join(__dirname, PATH_VIEWS, 'warframes.html'));
})

app.get('/details', function (req, res) {
    res.sendFile(path.join(__dirname, PATH_VIEWS, 'details.html'));
})

/* Repository */

app.get('/menu', function (req, res) {
    fs.readFile(path.join(__dirname, PATH_REPOSITORY,'menu.json'), 'utf8', function (err, data) {
        if(err) {
            return console.log(err);
        }
        res.end(data);
    });
})

app.get('/warframe/list', function (req, res) {
    fs.readFile(FILE_WARFRAMES, 'utf8', function (err, data) {
        if(err) {
            return console.log(err);
        }
        res.end(data);
    });
})

app.get('/user/list', function (req, res) {
    fs.readFile(FILE_USERS, 'utf8', function (err, data) {
        if(err) {
            return console.log(err);
        }
        res.end(data);
    });
})

/* RESTful */

app.get('/barcelona/temperature', function (req, res) {
    var OWM_URL = OWM_SERVER + '?q=' + OWM_CITY + '&units=' + OWM_UNITS + '&apikey=' + OWM_API_KEY;
    request(OWM_URL, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.end(body);
        } else {
            return console.log(err);
        }
    });
})

app.get('/user/:user_id', function (req, res) {
    var user;
    var id = req.params.user_id;
    fs.readFile(FILE_USERS, 'utf8', function (err, data) {
        if(err) {
            return console.log(err);
        }
        users = JSON.parse(data);
        for (i = 0; i < users.length; i++) {
            if (users[i].id == id) {
                user = users[i];
                res.end(JSON.stringify(user));
                break;
            }
        }
    });
})

app.post('/user', function (req, res) {
    fs.readFile(FILE_USERS, 'utf8', function (err, data) {
        if(err) {
            return console.log(err);
        }
        users = JSON.parse(data);
        var user = req.body;
        new_user = {
            id:(users.length + 1),
            name: user.name,
            password: user.password
        };
        users.push(new_user);
        fs.writeFile(FILE_USERS, JSON.stringify(users), function(err) {
            if(err) {
                return console.log(err);
            }
        });
        res.end(JSON.stringify(users));
    });
})

app.delete('/user/delete', function (req, res) {
    console.log('DELETE /user/delete');
    res.send('User deleted');
})

app.get('/restore', function (req, res) {
    fs.readFile(FILE_USERS_BACKUP, 'utf8', function (err, data) {
        if(err) {
            return console.log(err);
        }
        fs.writeFile(FILE_USERS, data, function(err) {
            if(err) {
                return console.log(err);
            }
        });
        users = JSON.parse(data);
        res.end(JSON.stringify(users));
    });
})

/* Server */

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log('Server listening at http://%s:%s', host, port)
})
