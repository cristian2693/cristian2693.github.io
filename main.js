const grid = new Muuri('.grid', {
    layout : {
        rounding: false
    }

});

window.addEventListener('load', () => {
    grid.refreshItems().layout();
    document.getElementById('grid').classList.add('imagenes-cargadas'); 
    //mostrar imagenes cuando cargan todas


    //agregamos los listener de los enlaces para filtrar las categorias
    const enlaces = document.querySelectorAll('#categorias a');
    enlaces.forEach((elemento) => {
        elemento.addEventListener('click', (evento) =>{
            //evita por defecto el comportamiento del navegador con preventdefault
            evento.preventDefault();
            enlaces.forEach((enlace) => enlace.classList.remove('activo'));
            evento.target.classList.add('activo');

            const categoria = evento.target.innerHTML.toLowerCase();
            categoria === 'todos' ? grid.filter('[data-categoria]') : grid.filter(`[data-categoria="${categoria}"]`);

        });
    });

    //agregamos listener para barra de busqueda

    document.querySelector('#barra-busqueda').addEventListener('input', (evento) => {
        const busqueda = evento.target.value;
        grid.filter((item) => item.getElement().dataset.etiquetas.includes(busqueda));

    });


    //agregar listener para imagenes

        const overlay = document.getElementById('overlay');
        document.querySelectorAll('.grid .item img').forEach((elemento) => {
            const ruta = elemento.getAttribute('src');
            const descripcion = elemento.parentNode.parentNode.dataset.descripcion;
        
            elemento.addEventListener('click',() => {
            overlay.classList.add('activo');
            document.querySelector('#overlay img').src = ruta;
            document.querySelector('#overlay .descripcion').innerHTML = descripcion;

        });
    });

    //eventlistenerbotoncerrar

        document.querySelector('#btn-cerrar-popup').addEventListener('click',() => {
        overlay.classList.remove('activo');
    });

    //eventlisteneroverlay

        overlay.addEventListener('click',(evento) => {
        evento.target.id === 'overlay' ? overlay.classList.remove('activo') : '';
    });
});