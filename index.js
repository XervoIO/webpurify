var request = require('request');

var WEBPURIFY_BASE = 'https://api1.webpurify.com/services/rest/';

var WebPurify = function(apiKey) {
  this.apiKey = apiKey;
};

WebPurify.prototype.liveCheck = function(text, callback) {
  var self = this;
  var url = this._buildRequestUrl('webpurify.live.check', {text : text});
  request(url, function(err, res, body) {
    var data = JSON.parse(body);
    if(!self._checkResponseFormat(data)) {
      return callback('Response format incorrect', null);
    }
    var found = parseInt(data.rsp.found, 10);
    callback(err, found === 0 ? true : false);
  });
};

WebPurify.prototype._buildRequestUrl = function(method, params) {
  var url = WEBPURIFY_BASE + '?api_key=' + this.apiKey + '&format=json';
  for(var k in params) {
    url += '&' + k + '=' + params[k];
  }
  return url;
};

WebPurify.prototype._checkResponseFormat = function(res) {
  if(res.hasOwnProperty('rsp')) {
    if(res.rsp.hasOwnProperty('method') &&
       res.rsp.hasOwnProperty('format') &&
       res.rsp.hasOwnProperty('found')) {
      return true;
    }
  }
  console.log(res);
  return false;
};

module.exports = WebPurify;