var nock = require('nock');

var webpurify = nock('https://api1.webpurify.com')
                    .filteringPath(/api_key=[^&]*/g, 'api_key=XXX')
                    .get('/services/rest/?api_key=XXX&format=json&text=hello')
                    .reply(200, {
                      "rsp": {
                        "@attributes": {
                          "stat": "ok"
                        },
                        "method": "webpurify.live.check",
                        "format": "rest",
                        "found": "0",
                        "api_key": "ABCTESTAPIKEY"
                      }
                    })
                    .get('/services/rest/?api_key=XXX&format=json&text=sh!t')
                    .reply(200, {
                      "rsp": {
                        "@attributes": {
                          "stat": "ok"
                        },
                        "method": "webpurify.live.check",
                        "format": "rest",
                        "found": "1",
                        "api_key": "ABCTESTAPIKEY"
                      }
                    });

module.exports = webpurify;