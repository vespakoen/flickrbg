'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _xml2js = require('xml2js');

var _xml2js2 = _interopRequireDefault(_xml2js);

var _lodashRandom = require('lodash.random');

var _lodashRandom2 = _interopRequireDefault(_lodashRandom);

function parseXML(xml) {
  return new Promise(function (resolve, reject) {
    _xml2js2['default'].parseString(xml, function (err, res) {
      if (err) return reject(err);
      resolve(res);
    });
  });
}

(0, _nodeFetch2['default'])('https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=31e2c7e110ca8b9845bd8e5cc56ea584&photoset_id=72157657849361828&user_id=136002919@N02').then(function (res) {
  return res.text();
}).then(function (body) {
  return parseXML(body);
}).then(function (json) {
  setInterval(function () {
    var randomPicIndex = (0, _lodashRandom2['default'])(0, json.rsp.photoset[0].photo.length);
    var randomPic = json.rsp.photoset[0].photo[randomPicIndex].$;
    return (0, _nodeFetch2['default'])('https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=31e2c7e110ca8b9845bd8e5cc56ea584&photo_id=' + randomPic.id).then(function (res) {
      return res.text();
    }).then(function (body) {
      return parseXML(body);
    }).then(function (json) {
      var sizes = json.rsp.sizes[0].size;
      console.log('feh --bg-scale ' + sizes[sizes.length - 1].$.source);
    });
  }, 1000 * 5);
});
