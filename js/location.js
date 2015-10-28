p = document.getElementById('mostraLocal');
var latitudeUsuario,longitudeUsuario;

(function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else { 
        p.innerHTML = "Geolocation is not supported by this browser.";
    }
})();

function showPosition(position) {
    p.innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude; 
    latitudeUsuario = position.coords.latitude;
    longitudeUsuario = position.coords.longitude;
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
        p.innerHTML = "Usuário negou as requisições para Geolocalização."
        break;
        case error.POSITION_UNAVAILABLE:
        p.innerHTML = "Informação da localização indisponível"
        break;
        case error.TIMEOUT:
        p.innerHTML = "A requisição para pegar a localização do usuário expirou (timed out)."
        break;
        case error.UNKNOWN_ERROR:
        p.innerHTML = "Um erro desconhecido ocorreu."
        break;
    }
}