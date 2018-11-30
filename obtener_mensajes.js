function consultaMensajes() {
  bundle = {
    api_key : "SDI",
    id_folio : "20161003"
  }
  string_bundle = '{ "api_key":"SDI","id_folio":"20161003"}'
  url ='https://transportacionessdi.herokuapp.com/mensajes?bundle=' + string_bundle
  fetch(url, {
    method : 'GET',
    mode : 'cors'
  }).then(res => res.json()).then(postMessage)
}

consultaMensajes()
