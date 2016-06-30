# Node.js

Learning Node.js

## Node.js details

```
$ node -v
6.6.2

$ npm --version
3.9.5
```
## Requirements

[https://nodejs.org/en/](https://nodejs.org/en/)

## Executing the server

```
$ node server.js
```

## Browsing the project

After executing the server, the project will be able in the following url:
```
http://localhost:8081/
```

## Node.js notes

In Node Application, any async function accepts a callback as a last parameter and the callback function accepts error as a first parameter.

Many objects in Node emit events for example a net.Server emits an event each time a peer connects to it, a fs.readStream emits an event when the file is opened.

## Node.js requests

The native Node.js `http` API is a little hard to use:

```javascript
var http = require('http');
http.get(OWM_URL, function(response) {
    var body = '';
    response.on('data', function(data) {
        body += data;
    });
    response.on('end', function() {
        var parsed = JSON.parse(body);
        res.end(JSON.stringify(parsed));
    });
});
```

Instead, in this application I'm using the external module `request`:

```javascript
var request = require('request');
request(OWM_URL, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        res.end(body);
    } else {
        return console.log(err);
    }
})
```
