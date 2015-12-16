function testUtils() {
  this.getHostName = function(url) {
    return url.split('//')[1].split('/')[0];
  };

  this.checkHttp = function(imageUrl) {
    if (!~imageUrl.indexOf('http')) {
      imageUrl = imageUrl.replace('//', 'http://');
    }

    if (~imageUrl.indexOf('https')) {
      imageUrl = imageUrl.replace('https', 'http');
    }

    return imageUrl;
  };

  this.checkHostName = function(imageUrl) {
    var hostName = this.getHostName(imageUrl);

    if (hostName !== 'server') {
      imageUrl = imageUrl.replace(hostName, 'server');
    }

    return imageUrl;
  };

  this.replaceLocalhostUrl = function(obj) {
    if (obj.style && obj.style['background-image']) {
      obj.style['background-image'] = this.checkHttp( this.checkHostName(obj.style['background-image']) );
    }

    return obj;
  };

  this.replaceLocalhostUrlInProp = function(obj, prop) {
    if (obj[prop]) {
      obj[prop] = this.checkHttp( this.checkHostName(obj[prop]) );
    }

    return obj;
  };
}

var TestUtils = new testUtils();
