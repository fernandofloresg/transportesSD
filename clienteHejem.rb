#!/usr/bin/ruby
# Programa que consulta a un API REST de un sistema de solicitudes de transportacion hospedado en Heroku 
# Ejecucion: ./clienteHejem.rb
# Ingresar el numero de folio de la solicitud que desean consultar y enviar mensajes entre el chofer y pasajero

require 'net/http'
require 'json'
require 'pp'

# ejemplo, consultar API REST de Spotify
def consulta_spotify()
	url= 'https://api.spotify.com/v1/search?type=artist&q=tycho'
	uri = URI(url)
	response = Net::HTTP.get(uri)
	JSON.parse(response)
	
	print "\nEntro a Spotify API: " + response.to_s

end

#consultar API REST de Solicitudes
# Metodo que recibe el folio relacionado a la solicitud a consultar
def consulta_sol(folio)
	
	bundle='{"api_key": "SDI",
		"id_folio": "'+folio+'"
		}'

	JSON.parse(bundle)
	
	#consultar al API
	url= "https://transportacionessdi.herokuapp.com/solicituds?bundle=#{URI.encode(bundle)}"
	uri= URI.parse(url)
	
	response = Net::HTTP.get(uri)
	res= JSON.parse(response)
	print "\n Consultar Solicitudes \n"
	puts (res)
	#puts (res[0]['id_folio'])	
 	#puts (res[0]['datos_unidad'])
	#puts (res[1]['id_folio'])
	#puts (res[1]['datos_unidad'])	

end

#metodo para insertar mensajes de acuerdo a la  solicitud

def inserta_mensaje(folio,emisor,receptor,mensaje,fecha)
	 params3= {
                'id_folio' =>folio,
                'emisor' => emisor,
                'receptor' => receptor,
                'mensaje' => mensaje,
               'fecha_act' => fecha
        }


	print "\n Ingresando nuevo mensaje... \n"
	puts(params3);
        url= "https://transportacionessdi.herokuapp.com/mensajes"
        uri= URI.parse(url)

	resp= Net::HTTP.post_form(uri, params3)
	resp_text = resp.body
        puts (resp.body)


end

def consulta_mensajes(folio)

        bundle='{"api_key": "SDI",
                "id_folio": "'+folio+'"
                }'

        JSON.parse(bundle)

        #consultar al API
        url= "https://transportacionessdi.herokuapp.com/mensajes?bundle=#{URI.encode(bundle)}"
        uri= URI.parse(url)

        response = Net::HTTP.get(uri)
        res= JSON.parse(response)
        print "\n Consultar Mensajes de folio:  \n"
        puts (res)
	if res.kind_of?(Array)
        	puts (res[0]['id_folio'])
        	puts (res[0]['mensaje'])
	else
		puts("No tiene valores! \n")
	end
end


#consulta_spotify() #se utilizo como ejemplo para consulta de API
#consultas por usuario

printf "\nIngresa el folio a consultar: "
folio1= gets.chomp


print "\n Consultando....  \n"
consulta_sol(folio1)
#print "\n"

#print "\n insertando... \n"
#inserta_mensaje(folio1,"francisco","felipe","esperare mensaje para llegar al aeropuerto","20170427")

print "\n Consultando mensajes....  \n"
consulta_mensajes(folio1)

