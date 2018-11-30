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
  $('#contenedor-mensajes').empty()
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
    $('#contenedor-mensajes').append(chat_bubble)
  }
}

function filtraMensajes() {
  var mensajes_filtrados = []
  mensajes_filtrados = mensajes.filter(mensaje => (mensaje.receptor === usuario_destino && mensaje.emisor === usuario_actual) || (mensaje.receptor === usuario_actual && mensaje.emisor === usuario_destino))
  return mensajes_filtrados
}

function actualizarNombres() {
  $('#actual').text(usuario_actual)
  $('#destino').text(usuario_destino)
}


$(document).ready(function () {
  $( "#mensaje-form").submit(function( event ) {
    mandaMensaje()
    $('#mensaje-input').val('')
    event.preventDefault()
  })
  $("#actual-form").submit(function (event) {
    usuario_actual = $('#actual-input').val()
    consultaMensajes()
    actualizarNombres()
    event.preventDefault()
    $('#actual-input').val('')
  })
  $("#destino-form").submit(function(event) {
    usuario_destino = $('#destino-input').val()
    consultaMensajes()
    actualizarNombres()
    event.preventDefault()
    $('#destino-input').val('')
  })
  actualizarNombres()
});

window.setInterval(function(){
  w = new Worker('obtener_mensajes.js')
  w.onmessage = function(event){
    onMensajesResponse(event.data)
  }
}, 1000);
