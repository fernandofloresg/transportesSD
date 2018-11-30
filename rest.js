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
  mensajes = response
  var mensajes_conversacion = filtraMensajes()
  $('#contenedor-mensajes', window.parent.frames[1]).empty()
  llenaMensajes(mensajes_conversacion)
}

// Se declaran los usuarios
var usuario_actual = 'felipe'
var usuario_destino = 'francisco'

function mandaMensaje() {
  let mensaje = $('#mensaje-input').val()
  if(mensaje != '' && mensaje != undefined) {
    objeto_mensaje = {
      id_folio : "20161003",
      emisor : usuario_actual,
      receptor : usuario_destino,
      mensaje : mensaje,
      fecha_act : 20181113
    }
    url = 'https://transportacionessdi.herokuapp.com/mensajes'
    $.post(url, objeto_mensaje, function(data, status) {
      consultaMensajes()
    })
  }
}

function llenaMensajes(mensajes_conversacion) {
  for(var key in mensajes_conversacion) {
    mensaje = mensajes_conversacion[key]
    if(mensaje.emisor == usuario_destino) {
      chat_bubble = '<div class="row"> <div class="col"><div class="alert alert-primary">' +mensaje.mensaje + '</div></div><div class="col"></div></div>'
    } else {
      chat_bubble = '<div class="row"><div class="col"></div> <div class="col"><div class="alert alert-primary">' +mensaje.mensaje + '</div></div></div>'
    }
    $('#contenedor-mensajes', window.parent.frames[1]).append(chat_bubble)
  }
}

function filtraMensajes() {
  var mensajes_filtrados = []
  mensajes_filtrados = mensajes.filter(mensaje => (mensaje.receptor === usuario_destino && mensaje.emisor === usuario_actual) || (mensaje.emisor === usuario_actual && mensaje.emisor === usuario_destino))
  return mensajes_filtrados
}

consultaMensajes()
$(document).ready(function () {
    $( "#mensaje-form", window.parent.frames[2] ).submit(function( event ) {
      mandaMensaje()
      event.preventDefault()
  });
});
