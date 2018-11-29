//global
var mensajes
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
  }).then(res => res.json()).then(onMensajesResponse)
}

function onMensajesResponse(response) {
  console.log(response)
  mensajes = response
  filtraMensajes()
}

// Se declaran los usuarios
var usuario_actual = 'fer'
var usuario_destino = 'otrofer'

function mandaMensaje(mensaje) {
  objeto_mensaje = {
    id_folio : "20161003",
    emisor : usuario_actual,
    receptor : usuario_destino,
    mensaje : mensaje,
    fecha_act : 20181113
  }
  console.log(JSON.stringify(objeto_mensaje))
  url = 'https://transportacionessdi.herokuapp.com/mensajes'
  $.post(url, objeto_mensaje, function(data, status) {
    consultaMensajes()
  })
}

consultaMensajes()

function filtraMensajes() {
  var mensajes_filtrados = []
  mensajes_filtrados = mensajes.filter(mensaje => (mensaje.receptor === usuario_destino && mensaje.emisor === usuario_actual) || (mensaje.emisor === usuario_actual && mensaje.emisor === usuario_destino))
  console.log(mensajes_filtrados)
}
