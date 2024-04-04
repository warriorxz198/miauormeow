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

        // Párrafo con el texto introducido
        var parrafo = document.createElement("p");
        parrafo.textContent = inputText;
        nuevoDiv.appendChild(parrafo);

        // Número inicializado en 0
        var contador = document.createElement("span");
        contador.textContent = "0";
        nuevoDiv.appendChild(contador);

        // Botón verde
        var btnGreen = document.createElement("button");
        btnGreen.textContent = "+";
        btnGreen.classList.add("btn", "btn-green");
        btnGreen.onclick = function () {
            incrementar(contador);
        };
        nuevoDiv.appendChild(btnGreen);

        // Botón rojo para restar 1 al contador
        var btnRed = document.createElement("button");
        btnRed.textContent = "-";
        btnRed.classList.add("btn", "btn-red");
        btnRed.onclick = function () {
            decrementar(contador);
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
function decrementar(contador) {
    var valor = parseInt(contador.textContent);
    if (valor > 0) {
        contador.textContent = valor - 1;
        guardarDatos();
    }
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
        var contador = item.querySelector("span").textContent;
        data.push({
            texto: texto,
            contador: contador
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

            var contador = document.createElement("span");
            contador.textContent = item.contador;
            nuevoDiv.appendChild(contador);

            var btnGreen = document.createElement("button");
            btnGreen.textContent = "+";
            btnGreen.classList.add("btn", "btn-green");
            btnGreen.onclick = function () {
                incrementar(contador);
            };
            nuevoDiv.appendChild(btnGreen);

            var btnRed = document.createElement("button");
            btnRed.textContent = "-";
            btnRed.classList.add("btn", "btn-red");
            btnRed.onclick = function () {
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

