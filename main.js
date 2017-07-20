var formulario = {
    campo1: "nombre",
    campo2: "ocupacion",
    campo3: "debt",
    campo4: "arma"
}

class APIClient {
    constructor() {
        this.pintarForm(formulario);
    }

    get(url) {
        var misCabeceras = new Headers();
        var miInit = {
            method: 'GET',
            headers: misCabeceras
        };

        var promise = fetch(url, miInit).then(
            (response) => {
                return response.json();
            }
        );
        return promise;
    }

    post(url, datos, callback) {
        var peticion = new XMLHttpRequest();

        console.log(datos);
        peticion.open("POST", url);

        peticion.onreadystatechange = function(response) {
            if (peticion.readyState === 4) {
                callback(peticion.responseText);
            }
        }

        var data = new FormData();
        data.append("name", datos.nombre);
        data.append("occupation", datos.ocupacion);
        data.append("debt", datos.debt);
        data.append("weapon", datos.weapon);
        peticion.send(data);
        return true;

    }

    pintarForm(param) {
        var divR = document.getElementById('divRegistro');
        var form = document.createElement('form');
        divR.appendChild(form);
        for (var i in formulario) {
            var input = document.createElement('input');
            input.type = "text";
            input.placeholder = formulario[i];
            input.id = formulario[i];
            form.appendChild(input);
        }
        var boton = document.createElement('button');
        boton.innerHTML = "Crear personaje";
        boton.onclick = (e) => {
            console.log(e);
            e.stopPropagation();
            e.preventDefault();
            almacen.addPersonaje();
        };
        form.appendChild(boton);
    }
}


class PersonajeClient {
    constructor() {
        this._urlBase = "https://ironhack-characters.herokuapp.com";
        this._apiClient = new APIClient();
    }
    getDePersonajes() {
        let urlCompleta = this._urlBase + '/characters';
        var promise = this._apiClient.get(urlCompleta).then(
            (data) => {
                let arrayPersonajes = [];

                for (let i = 0; i < data.length; i++) {
                    let elem = data[i];
                    let personaje = new Personaje(elem.name, elem.occupation, elem.debt, elem.weapon);
                    arrayPersonajes.push(personaje);
                }
                return arrayPersonajes;
            }
        );

        return promise;
    }

    postDePersonajes(name, occupation, debt, weapon) {
        console.log("postDePersonajes");
        let datos = {
            nombre: name,
            ocupacion: occupation,
            debt: debt,
            weapon: weapon,
        }
        let urlCompleta = this._urlBase + '/characters';

        let elCallback = () => almacen.pintarPersonajes();

        this._apiClient.post(urlCompleta, datos, elCallback)
    }
}

class Personaje {
    constructor(nombre, ocupacion, debt, weapon) {
        this._nombre = nombre;
        this._ocupacion = ocupacion;
        this._debt = debt;
        this._weapon = weapon;
    }
    pintar() {
        return '<tr><td>' + this._nombre + '</td><td>' + this._ocupacion + '</td><td>' + this._debt + '</td><td>' + this._weapon + '</td><tr>';
    }
}

class AlmacenPersonajes {
    constructor() {
        this._personajes = [];
        this._personajeClient = new PersonajeClient();
    }
    pintarPersonajes() {
        this._personajeClient.getDePersonajes().then(
            (data) => {
                var filas = "";
                var cabecera = '<thead><tr><th>Nombre</th><th>Ocupacion</th><th>Debt</th><th>Arma</th></tr></thead>';
                var divA = document.getElementById('divAlmacen');

                var tabla = document.createElement('table');
                tabla.innerHTML = cabecera;

                var tbody = document.createElement('tbody');
                for (var i = 0; i < data.length; i++) {
                    filas = filas + data[i].pintar();
                }
                tbody.innerHTML = filas;
                tabla.appendChild(tbody);
                divA.insertBefore(tabla, null);
            }
        );
    }
    addPersonaje() {
        console.log("addPersonaje");
        var nombre = document.getElementById('nombre').value;
        var ocupacion = document.getElementById('ocupacion').value;
        var debt = document.getElementById('debt').value;
        var almacen = document.getElementById('arma').value;

        this._personajeClient.postDePersonajes(nombre, ocupacion, debt, almacen);
    }
}

let almacen = null;
window.onload = () => {
    almacen = new AlmacenPersonajes();
    almacen.pintarPersonajes();
};
