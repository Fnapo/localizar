/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var numFav;
var final;
var miMapa;

var app = {
    // Application Constructor
    
    inicio: function inicio() {
        numFav = 0;
        final = document.getElementById('final');
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
        var coorDib = document.getElementById('coordenadas');
        
        miMapa = L.map('mapas').setView([pos.coords.latitude, pos.coords.longitude], 13);
        
        final.className = "";
        final.textContent = "";
        document.body.className = 'bverde';
        coorDib.textContent = 'Latitud: ' + pos.coords.latitude.toFixed(2) + ' Longitud: ' + pos.coords.longitude.toFixed(2);
               
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1IjoiZm5hcG8iLCJhIjoiY2pmNDVqYTlqMWEweTJ4cXhuMXdmbnd0bSJ9.UsMV_WR8V7QalkigGg-Hcg'
        }).addTo(miMapa);
        
        app.pintarMarca([pos.coords.latitude, pos.coords.longitude], 'Estoy aquí<br>Hola', miMapa, false);
        
        miMapa.on('click', app.hacerClick);
//                  {
//            var texto = 'Latitud: ' + eclick.latLng.latitude.toFixed(2) + '<br>Longitud: ' + eclick.latLng.longitude.toFixed(2);
//
//            document.body.className = 'brojo';
//            app.pintarMarca(eclick.latLng, texto, miMapa, true);
//        });
    },

    
    hacerClick: function hacerClick(evento) {
        var texto = 'Latitud: ' + evento.latLng.latitude.toFixed(2) + ' Longitud: ' + evento.latLng.longitude.toFixed(2);

        document.body.className = 'brojo';
        app.pipintarMarca(evento, texto, miMapa, true);
    },

    pintarMarca: function pintarMarca(evento, texto, miMapa, booleano) {
        var marca = L.marker(evento.latlong),
            popup1 = L.popup(evento.latlong),
            maxFav = 5;

        if (booleano) {
            numFav += 1;
            texto += '<br>Favorito número: ' + numFav;
        }

        if ((numFav <= maxFav) || !booleano) {
            marca.addTo(miMapa);

            marca.bindPopup(texto).openPopup();
        } else {
            popup1.setContent('NO más favoritos')
                .openOn(miMapa);
        }
    },

    errorLocal: function errorLocal(evento) {
        final.textContent = "Fin ... Puedes cerrar la app.";
        alert('Error en la solicitud. ' + evento.message);
    },
    
    dispositivoListo: function dispositivoListo() {
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

