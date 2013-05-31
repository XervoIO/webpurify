var WebPurify = require('../index'),
    webpurifyApi = require('./webpurify-nock'),
    mocha = require('mocha'),
    assert = require('assert'),
    webpurify = new WebPurify(process.env.API_KEY);

describe('WebPurify API', function() {
  describe('#liveCheck()', function() {
    it('should return 0 for text hello', function(done) {
      webpurify.liveCheck('hello', function(err, clean) {
        assert.equal(err, null, 'Error should be null : ' + err);
        assert.equal(clean, true, 'Clean should be true : ' + clean);
        done();
      });
    });
    it('should return 1 for text sh!t', function(done) {
      webpurify.liveCheck('sh!t', function(err, clean) {
        assert.equal(err, null, 'Error should be null : ' + err);
        assert.equal(clean, false, 'Clean should be true : ' + clean);
        done();
      });
    });
  });
});