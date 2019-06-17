const API_BASE = 'https://api.noopschallenge.com';

function NOOPBOT_START() {
  if (window.start_app) {
    start_app();
  } else {
    console.error('start_app not defined');
  }
}

function NOOPBOT_FETCH(options, onComplete) {

  if (!options.API) {
    console.error('API not set');
    return;
  }

  if (!onComplete) {
    console.warn('onComplete not set, nothing will happen.');
  }

  let params = [];
  Object.keys(options).forEach(key => params.push(`${key}=${options[key]}`))
  let url = `${API_BASE}/${options.API}?` + params.join('&');

  window.fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(responseJson) {
      onComplete(responseJson)
    });
}

window.onload = function () {
  NOOPBOT_START();
};
