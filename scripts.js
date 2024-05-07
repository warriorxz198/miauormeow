 // Función para crear un nuevo div
 function confirmReload() {
    var confirmation = confirm("¿Estás seguro de reiniciar el contador de todos?");
    if (confirmation) {
        var contadores = document.querySelectorAll(".item span");
    contadores.forEach(function (contador) {
        contador.textContent = "0";
    });
    guardarDatos();

    }
}


    
function validarEnter(event) {
    if (event.key === 'Enter') {
        crearDiv();
        document.getElementById("inputText").value = ""; // Limpiar el contenido del input
    }
}

function crearDiv() {
    var inputText = document.getElementById("inputText").value;
    if (inputText !== "") {
        var nuevoDiv = document.createElement("div");
        nuevoDiv.classList.add("item");

        var parrafo = document.createElement("p");
        parrafo.textContent = inputText;
        nuevoDiv.appendChild(parrafo);

        // Div para contener los números
        var divNumeros = document.createElement("div");
        divNumeros.classList.add("numeros");

        // Número inicializado en 0 (contador principal)
        var contador = document.createElement("span");
        contador.textContent = "0";
        divNumeros.appendChild(contador);

        // Contador verde
        var contadorVerde = document.createElement("span");
        contadorVerde.textContent = "0";
        contadorVerde.style.color = "green";
        divNumeros.appendChild(contadorVerde);

        // Contador rojo
        var contadorRojo = document.createElement("span");
        contadorRojo.textContent = "0";
        contadorRojo.style.color = "red";
        divNumeros.appendChild(contadorRojo);

        // Agregar el div de números al div principal
        nuevoDiv.appendChild(divNumeros);

        // Botón verde
        var btnGreen = document.createElement("button");
        btnGreen.textContent = "+";
        btnGreen.classList.add("btn", "btn-green");
        btnGreen.onclick = function () {
            incrementar(contadorVerde);
            incrementar(contador); // Incrementa el contador principal
        };
        nuevoDiv.appendChild(btnGreen);

        // Botón rojo para incrementar el contador rojo
        var btnRed = document.createElement("button");
        btnRed.textContent = "-";
        btnRed.classList.add("btn", "btn-red");
        btnRed.onclick = function () {
            incrementar(contadorRojo);
            decrementar(contador); // Decrementa el contador principal
        };
        nuevoDiv.appendChild(btnRed);

        // Botón rojo con icono de papelera para eliminar el div
        var btnDelete = document.createElement("button");
        btnDelete.innerHTML = '<i class="fa fa-trash"></i>';
        btnDelete.classList.add("btn", "btn-red", "btn-delete");
        btnDelete.onclick = function () {
            eliminarDiv(nuevoDiv);
        };
        nuevoDiv.appendChild(btnDelete);

        document.getElementById("container").appendChild(nuevoDiv);

        var btnReset = document.createElement("button");
        btnReset.innerHTML = '<i class="fas fa-redo"></i>';
        btnReset.classList.add("btn", "btn-reset");
        btnReset.onclick = function () {
            if (confirm("¿Quieres reiniciar los contadores de " + inputText + "?")) {
                divNumeros.querySelectorAll("span").forEach(span => span.textContent = "0");
                guardarDatos();
            }
        };
        nuevoDiv.appendChild(btnReset);

        // Guardar información en localStorage
        guardarDatos();
    }
}

// Función para incrementar el contador
function incrementar(contador) {
    contador.textContent = parseInt(contador.textContent) + 1;
    guardarDatos();
}

// Función para decrementar el contador
// Función para decrementar el contador
function decrementar(contador) {
    var valor = parseInt(contador.textContent);
    contador.textContent = valor - 1; // Elimina la condición que impide valores negativos
    guardarDatos();
}

// Función para eliminar el div
function eliminarDiv(elemento) {
    elemento.remove();
    guardarDatos();
}

// Función para guardar los datos en localStorage
function guardarDatos() {
    var items = document.querySelectorAll(".item");
    var data = [];
    items.forEach(function (item) {
        var texto = item.querySelector("p").textContent;
        var contadores = item.querySelectorAll("span");
        var contadorPrincipal = contadores[0].textContent;
        var contadorVerde = contadores[1].textContent;
        var contadorRojo = contadores[2].textContent;
        data.push({
            texto: texto,
            contadorPrincipal: contadorPrincipal,
            contadorVerde: contadorVerde,
            contadorRojo: contadorRojo
        });
    });
    localStorage.setItem("datos", JSON.stringify(data));
}
// Función para cargar los datos desde localStorage
function cargarDatos() {
    var data = JSON.parse(localStorage.getItem("datos"));
    if (data) {
        data.forEach(function (item) {
            var nuevoDiv = document.createElement("div");
            nuevoDiv.classList.add("item");

            var parrafo = document.createElement("p");
            parrafo.textContent = item.texto;
            nuevoDiv.appendChild(parrafo);

            var divNumeros = document.createElement("div");
            divNumeros.classList.add("numeros");

            var contador = document.createElement("span");
            contador.textContent = item.contadorPrincipal;
            divNumeros.appendChild(contador);

            var contadorVerde = document.createElement("span");
            contadorVerde.textContent = item.contadorVerde;
            contadorVerde.style.color = "green";
            divNumeros.appendChild(contadorVerde);

            var contadorRojo = document.createElement("span");
            contadorRojo.textContent = item.contadorRojo;
            contadorRojo.style.color = "red";
            divNumeros.appendChild(contadorRojo);

            nuevoDiv.appendChild(divNumeros);

            var btnGreen = document.createElement("button");
            btnGreen.textContent = "+";
            btnGreen.classList.add("btn", "btn-green");
            btnGreen.onclick = function () {
                incrementar(contadorVerde);
                incrementar(contador);
            };
            nuevoDiv.appendChild(btnGreen);

            var btnRed = document.createElement("button");
            btnRed.textContent = "-";
            btnRed.classList.add("btn", "btn-red");
            btnRed.onclick = function () {
                incrementar(contadorRojo);
                decrementar(contador);
            };
            nuevoDiv.appendChild(btnRed);

            var btnDelete = document.createElement("button");
            btnDelete.innerHTML = '<i class="fa fa-trash"></i>';
            btnDelete.classList.add("btn", "btn-red", "btn-delete");
            btnDelete.onclick = function () {
                eliminarDiv(nuevoDiv);
            };
            nuevoDiv.appendChild(btnDelete);

            var btnReset = document.createElement("button");
            btnReset.innerHTML = '<i class="fas fa-redo"></i>';
            btnReset.classList.add("btn", "btn-reset");
            btnReset.onclick = function () {
                if (confirm("¿Quieres reiniciar los contadores de " + item.texto + "?")) {
                    divNumeros.querySelectorAll("span").forEach(span => span.textContent = "0");
                    guardarDatos();
                }
            };
            nuevoDiv.appendChild(btnReset);

            document.getElementById("container").appendChild(nuevoDiv);
        });
    }

    // Aplicar el tema guardado al cargar la página
    var theme = localStorage.getItem('theme');
    if (theme === 'dark') {
    document.body.classList.add('dark-mode');
    } else {
    document.body.classList.remove('dark-mode');
        }
}


// Cargar los datos al cargar la página
window.onload = function () {
    cargarDatos();
};

function toggleTheme() {
    var body = document.body;
    var themeStyles = document.getElementById('themeStyles');

    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
       
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.add('dark-mode');
       
        localStorage.setItem('theme', 'dark');
    }
};

