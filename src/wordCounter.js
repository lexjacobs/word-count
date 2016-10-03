// var fs = require('browserify-fs');

export default function(text) {

  fs.readFile(text, 'utf8', function(err, data) {
    if (err) console.log(err);
    console.log('full character count: ', 'utf8', data.length);
    var count = {};

    for (var keys in data) {
      if (data[keys]) {

        try {
          var str = data[keys];
        } catch (e) {
          console.log('error', e);
        } finally {}

        str = data[keys];
        if (count[str]) {
          count[str]++;
        } else {
          count[str] = 1;
        }
      }
    }
    return count
  });

}
