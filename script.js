// buscar la pagina seleccionada
//buscar en la empresa que se requiere
formularioBuscar = document.querySelector('#buscar');
formularioTitulo = document.querySelector('#agregar')
formularioObjetos = document.querySelector('#addObjetos')
formularioBorrar = document.querySelector('#delObjetos')

espacioEnlace = document.querySelector('#espacioEnlace');
espacioObjetos = document.querySelector('#objetos');
espacioTotal = document.querySelector('#total');
espacioBorrar = document.querySelector('#select');
espacioArticulos = document.querySelector('#articulos')
espacioCode = document.querySelector('#code')

recibo = document.querySelector('#recibo');


recibo = {}
objetosRecibo = []

let total = 0;
let totalArticulos = 0;

fecha = new Date();
cargarTodo()

function cargarTodo(){
    
    formularioBuscar.addEventListener('submit', obtenerEnlace);

    formularioTitulo.addEventListener('submit', cambiarTitulo);

    formularioObjetos.addEventListener('submit', obtenerObjetos);

    formularioBorrar.addEventListener('submit', borrarObjeto);

    document.addEventListener('DOMContentLoaded', () => {

        recibo = JSON.parse( localStorage.getItem('recibo')) || {}
        textoTitulo(recibo.titulo, recibo.recha)

        objetosRecibo = JSON.parse( localStorage.getItem('objetos')) || []
        agregarAlRecibo();
        
        espacioCode.textContent = Math.floor(Math.random() * 900000) + 100000;

        

    })
}
function obtenerEnlace(e){
    e.preventDefault();
    buscarObj = document.querySelector('#buscarObj');
    empresa = document.querySelector('#empresa');
    objetoABuscar = buscarObj.value;
    empresaABuscar = empresa.value;
    
    if(objetoABuscar === '' || empresaABuscar === ''){
        mostrarError('LLena todos los campos...')

        return;
    }
    
    crearEnlace(objetoABuscar, empresaABuscar );

}
function mostrarError(mensaje) {
    alert(mensaje)
}
function crearEnlace(obj, emp){
    limpiarEnlace(espacioEnlace);
    // console.log(obj + emp)
    enlace = document.createElement('a')
    enlace.textContent = `Click aqui: ${obj}`;
    enlace.classList.add('f2')
    enlace.target = '_blank'
    switch (Number(emp)) {
        case 1:
            enlace.href = `https://www.vidri.com.sv/search?term=${obj}`;
            break;
        case 2:
            enlace.href = `https://www.freundferreteria.com/Productos?KeyWord=${obj}`;
            break;
        case 3:
            enlace.href = `https://sv.epaenlinea.com/catalogsearch/result/?q=${obj}`;
            break;
        case 4:
            enlace.href = `https://www.steren.com.sv/catalogsearch/result/?q=${obj}`;
            break;
        case 5:
            enlace.href = `https://www.electronicajaponesa.com/?s=${obj}&product_cat=0&post_type=product`;
            break;
        case 6:
            enlace.href = `https://www.josnab.com/?s=${obj}`;
            break;
    }
    
    alert("Se te redireccionará a la pagina")
    setTimeout(() => {
        window.location.href = enlace.href;
    }, 2000);
    espacioEnlace.appendChild(enlace)
}
function limpiarEnlace(padre){
    while(padre.firstChild){
        padre.removeChild(padre.firstChild);
    }
}
function cambiarTitulo(e){
    e.preventDefault();
    
    inputTitulo = document.querySelector('#inputTitulo').value;

    if(inputTitulo === ''){
        mostrarError('No puedes agregar un titulo vacio...')
        return;
    }

    recibo = {
        titulo: inputTitulo,
        fecha: new Date()
    }
    
    gestionarAlmacenamiento('recibo', JSON.stringify(recibo))
    textoTitulo(inputTitulo)

    formularioTitulo.reset()

}
function textoTitulo(text){
    titulo = document.querySelector('#titulo');
    fecha = document.querySelector('#fecha');
    titulo.textContent = text;
    fecha.textContent = new Date();
}
function gestionarAlmacenamiento(titulo, texto){
    localStorage.setItem(titulo, texto)
}
function obtenerObjetos(e){
    e.preventDefault();
    cantidad = Number(document.querySelector('#cantidad').value);
    nombre = document.querySelector('#nombre').value;
    precio = Number(document.querySelector('#precio').value);

    if(cantidad == '' || nombre === '' || precio == ''){
        mostrarError('Valida todos los campos para agregar un objeto a la lista')
        return;
    }
    if(isNaN(cantidad) || isNaN(precio)){
        mostrarError('La cantidad y el precio no son validas, no pueden contener letras o signos')
        return;
    }
    if(cantidad < 0 || precio < 0){
        mostrarError('Un numero negativo? no no puede ir ese valor, ingresa uno valido');
        return;
    }

    objetos = {
        cantidad,
        nombre,
        precio,
        id: Date.now()
    }

    objetosRecibo = [...objetosRecibo, objetos]

    
    agregarAlRecibo()
    formularioObjetos.reset();
}
function agregarAlRecibo(){
    
    limpiarEnlace(espacioObjetos)
    limpiarEnlace(espacioBorrar)
    objetosRecibo.forEach(obj => {
        
        const div = document.createElement('div')
        div.classList.add('objeto')
        div.innerHTML = `
            <p>${obj.cantidad}</p>
            <p>${obj.nombre}</p>
            <p>${obj.precio}</p>
        `;
        espacioObjetos.appendChild(div)

        total = total + (obj.cantidad * obj.precio)
        espacioTotal.textContent = `$ ${Math.ceil(total)}`;

        
        const option = document.createElement('option');
        option.textContent = `${obj.nombre}`;
        option.value = `${obj.id}`;

        espacioBorrar.appendChild(option)

        totalArticulos = totalArticulos + 1;
        espacioArticulos.textContent =  Math.round(totalArticulos) 


    });

    total = 0;
    totalArticulos = 0;

    gestionarAlmacenamiento('objetos', JSON.stringify(objetosRecibo))
}
function borrarObjeto(e){
    e.preventDefault();
    idBorrar = espacioBorrar.value;

    objetosRecibo = objetosRecibo.filter(obj => obj.id != idBorrar)
    limpiarEnlace(espacioBorrar)
    agregarAlRecibo();
    
}


