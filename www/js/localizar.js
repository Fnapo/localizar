
var numFav = 0;
var maxFav = 5;
var final = document.getElementById('final');

var app = {
    // Application Constructor
    
    inicio: function () {
        final.textContent = 'Preparando el dispositivo de geolocalización.';
        final.className = 'bambar';
        app.iniciarFC();
        document.body.className = 'brojo';
    },
    
    iniciarFC: function () {
        FastClick.attach(document.body);
    },
    
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.

    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'

    // Update DOM on a Received Event
    
    dibujarCoordenadas: function (pos) {
        var coorDib = document.getElementById('coordenadas'),
            lat = pos.coords.latitude, 
            long = pos.coords.longitude,
            miMapa = L.map('mapas').setView([lat, long], 13);
        
        final.className = '';
        final.textContent = ' ';
        document.body.className = 'bverde';
        coorDib.textContent = 'Latitud: ' + lat.toFixed(3) + ', Longitud: ' + long.toFixed(3);
        
//      accessToken: 'pk.eyJ1IjoicGFjbzAwMSIsImEiOiJjamY4N2RtcGExYWdqMnFwbjFocnc0ZTNsIn0.WMDGp-M1l2lXuuoYH5LwAA';

/*        mapboxgl.accessToken = 'pk.eyJ1IjoicGFjbzAwMSIsImEiOiJjamY4N2RtcGExYWdqMnFwbjFocnc0ZTNsIn0.WMDGp-M1l2lXuuoYH5LwAA';
        var miMap = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v10'
        });*/

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?').addTo(miMapa);
        app.pintarMarca([lat, long], '<b>Estoy aquí. Hola.</b>' 
            + '<br>lat(' + lat.toFixed(2) + ') y Long(' + long.toFixed(2) + ')', miMapa, false);
//        miMapa.on('click', app.hacerClick);
        miMapa.on('click', function (ev) {
            var texto = 'Marcador en l(' + ev.latlng.lat.toFixed(2) + ') y L(' + ev.latlng.lng.toFixed(2) + ')';
            app.pintarMarca(ev.latlng, texto, miMapa, true);
        });
//        miMapa.on('click', app.hacerClick); No funciona ....
    },

/*    hacerClick: function (ev) {
        var texto = 'Marcador en l(' + ev.latlng.lat.toFixed(2) + ') y L(' + ev.latlng.lng.toFixed(2) + ')';
        app.pintarMarca(ev.latlng, texto, miMapa);        
    },*/
    
    pintarMarca: function (latlong, texto, miMapa, sumar) {
        var marca, popup1;
        numFav += (sumar ? 1 : 0);
        if (!sumar) {
            marca = L.marker(latlong).addTo(miMapa);
            marca.bindPopup(texto).openPopup();
        } else {
            if (numFav <= maxFav) {
                marca = L.marker(latlong).addTo(miMapa);
                marca.bindPopup(texto += '<br>Favorito número ' + numFav + ' de ' + maxFav + '.')
                .openPopup();
            } else {
                numFav = maxFav;
                popup1 = L.popup();
                popup1.setLatLng(latlong)
                    .setContent(texto += '<br>NO se ha añadido a favoritos.')
                    .openOn(miMapa);
            }
        }
    },

    errorLocal: function (ev) {
        final.textContent = 'Fin ... Puedes cerrar la app.';
        window.alert('Error en la solicitud. ' + ev.message);
    },
    
    dispositivoListo: function () {
        navigator.geolocation.getCurrentPosition(app.dibujarCoordenadas, app.errorLocal);
    }
};

app.inicio();
app.dispositivoListo();

//if ('addEventListener' in document) {
//        document.addEventListener('DOMContentLoaded', function() {
//        app.inicio();
//    }, false);
//    document.addEventListener('deviceready', function() {
//        app.dispositivoListo();
//    }, false);
//}

