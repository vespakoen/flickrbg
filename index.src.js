import fetch from 'node-fetch';
import xml2js from 'xml2js';
import random from 'lodash.random';

function parseXML(xml) {
  return new Promise((resolve, reject) => {
    xml2js.parseString(xml, (err, res) => {
      if (err) return reject(err);
      resolve(res);
    });
  });
}

fetch('https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=31e2c7e110ca8b9845bd8e5cc56ea584&photoset_id=72157657849361828&user_id=136002919@N02')
  .then((res) => res.text())
  .then((body) => parseXML(body))
  .then((json) => {
    setInterval(() => {
      var randomPicIndex = random(0, json.rsp.photoset[0].photo.length);
      var randomPic = json.rsp.photoset[0].photo[randomPicIndex].$;
      return fetch('https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=31e2c7e110ca8b9845bd8e5cc56ea584&photo_id=' + randomPic.id)
        .then((res) => res.text())
        .then((body) => parseXML(body))
        .then((json) => {
            var sizes = json.rsp.sizes[0].size;
            console.log('feh --bg-scale ' + sizes[sizes.length - 1].$.source);
        });
    }, 1000 * 5);
  });
