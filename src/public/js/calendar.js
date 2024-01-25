class Calendar {
    constructor(id) {
        this.cells = [];
        this.selectedDateTime = null;
        this.currentMonth = moment();
        this.elCalendar = document.getElementById(id);
        this.showTemplate();
        this.elGridBody = this.elCalendar.querySelector('.grid__body');
        this.elMonthName = this.elCalendar.querySelector('.month-name');
        this.showCells();
        this.totalPrecio = 0;
      }

      showTemplate() {
        this.elCalendar.innerHTML = this.getTemplate();
        this.addEventListenerToControls();
        this.addEventListenerToClearButton();
        this.addEventListenerToClearAllButton();
      }

    getTemplate() {
        let template = `
            <div class="calendar__header">
                <button type="button" class="control control--prev">&lt;</button>
                <span class="month-name">dic 2019</span>
                <button type="button" class="control control--next">&gt;</button>
            </div>
            <div class="calendar__body">
                <div class="grid">
                    <div class="grid__header">
                        <span class="grid__cell grid__cell--gh">Lun</span>
                        <span class="grid__cell grid__cell--gh">Mar</span>
                        <span class="grid__cell grid__cell--gh">Mié</span>
                        <span class="grid__cell grid__cell--gh">Jue</span>
                        <span class="grid__cell grid__cell--gh">Vie</span>
                        <span class="grid__cell grid__cell--gh">Sáb</span>
                        <span class="grid__cell grid__cell--gh">Dom</span>
                    </div>
                    <div class="grid__body">

                    </div>
                </div>
            </div>
            <div class="horarios">
                <label for="horario" style="color: white;">Selecciona un horario:</label>
                <select id="horario">
                <option value="08:00">08:00</option>
                <option value="09:00">09:00</option>
                <option value="10:00">10:00</option>
                <option value="11:00">11:00</option>
                <option value="12:00">12:00</option>
                <option value="13:00">13:00</option>
                <option value="14:00">14:00</option>
                <option value="15:00">15:00</option>
                <option value="16:00">16:00</option>
                <option value="17:00">17:00</option>
                <option value="18:00">18:00</option>
                <option value="19:00">19:00</option>
                <option value="20:00">20:00</option>
                <option value="21:00">21:00</option>
                <option value="22:00">22:00</option>
                </select>
            </div>
        `;
        return template;
    }

    addEventListenerToClearButton() {  // Actualizado el nombre del método
        let clearButton = this.elCalendar.querySelector('#clear-button');
        if (clearButton) {
            clearButton.addEventListener('click', () => {
                this.vaciarClases();
            });
        }
    }
    
    vaciarClases() {
        // Obtener la lista de clases y el botón de reserva usando this.elCalendar.querySelector
        let classList = this.elCalendar.querySelector('#class-list');
        let reserveButton = this.elCalendar.querySelector('#reserve-button');
    
        // Eliminar todos los elementos de la lista de clases
        if (classList) {
            classList.innerHTML = '';
        }
    
        // Deshabilitar el botón de reserva
        if (reserveButton) {
            reserveButton.setAttribute('disabled', 'disabled');
        }
    
        // Limpiar la variable selectedDateTime
        this.selectedDateTime = null;
    }
    
    

      addEventListenerToControls() {
        let elControls = this.elCalendar.querySelectorAll('.control');
        elControls.forEach(elControl => {
            elControl.addEventListener('click', e => {
                let elTarget = e.target;
                if (elTarget.classList.contains('control--next')) {
                    this.changeMonth(true);
                } else {
                    this.changeMonth(false);
                }
                this.showCells();
            });
        });
    }

    changeMonth(next = true) {
        if (next) {
            this.currentMonth.add(1, 'months');
        } else {
            this.currentMonth.subtract(1, 'months');
        }
    }

    showCells() {
        this.cells = this.generateDates(this.currentMonth);
        if (this.cells === null) {
            console.error('No fue posible generar las fechas del calendario.');
            return;
        }
    
        this.elGridBody.innerHTML = '';
        let templateCells = '';
        let disabledClass = '';
        for (let i = 0; i < this.cells.length; i++) {
            disabledClass = '';
            if (!this.cells[i].isInCurrentMonth || this.cells[i].date.day() === 0) {
                disabledClass = 'grid__cell--disabled';
            }
    
            templateCells += `
                <span class="grid__cell grid__cell--gd ${disabledClass}" data-cell-id="${i}">
                    ${this.cells[i].date.date()}
                </span>
            `;
        }
    
        this.elMonthName.innerHTML = this.currentMonth.format('MMM YYYY');
        this.elGridBody.innerHTML = templateCells;
        this.addEventListenerToCells();
    }
    

    generateDates(monthToShow = moment()) {
        if (!moment.isMoment(monthToShow)) {
            return null;
        }
        let dateStart = moment(monthToShow).startOf('month');
        let dateEnd = moment(monthToShow).endOf('month');
        let cells = [];

        // Encontrar la primer fecha que se va a mostrar en el calendario
        while (dateStart.day() !== 1) {
            dateStart.subtract(1, 'days');
        }

        // Encontrar la última fecha que se va a mostrar en el calendario
        while (dateEnd.day() !== 0) {
            dateEnd.add(1, 'days');
        }

        // Genera las fechas del grid
        do {
            cells.push({
                date: moment(dateStart),
                isInCurrentMonth: dateStart.month() === monthToShow.month()
            });
            dateStart.add(1, 'days');
        } while (dateStart.isSameOrBefore(dateEnd));

        return cells;
    }
    

    addEventListenerToCells() {
        let elCells = this.elCalendar.querySelectorAll('.grid__cell--gd');
        elCells.forEach(elCell => {
            elCell.addEventListener('click', e => {
                let elTarget = e.target;
                if (elTarget.classList.contains('grid__cell--disabled') || elTarget.classList.contains('grid__cell--selected')) {
                    return;
                }

                // Deseleccionar la celda anterior
                let selectedCell = this.elGridBody.querySelector('.grid__cell--selected');
                if (selectedCell) {
                    selectedCell.classList.remove('grid__cell--selected');
                }

                // Seleccionar la nueva celda
                elTarget.classList.add('grid__cell--selected');
                const selectedDate = this.cells[parseInt(elTarget.dataset.cellId)].date;
                const selectedTime = document.getElementById('horario').value;

                // Combinar fecha y hora
                this.selectedDateTime = moment(`${selectedDate.format('YYYY-MM-DD')} ${selectedTime}`, 'YYYY-MM-DD HH:mm');

                // Agregar la fecha al listado de clases seleccionadas
                this.addToClassList();

                // Lanzar evento change
                this.elCalendar.dispatchEvent(new Event('change'));
            });
        });
    }
    calcularPrecio() {
        const diasSeleccionados = this.elCalendar.querySelectorAll('.grid__cell--selected').length;
    
        // Definir los precios según la cantidad de días seleccionados
        const precios = {
            1: 4000,
            2: 8000,
            3: 12000,
            4: 10000,
            5: 14000,
            6: 18000,
            7: 22000,
            8: 20000,
            9: 24000,
            10: 28000,
            11: 32000,
            12: 27700,
            13: 31700,
            14: 35700,
            15: 39700,
            16: 34500,
            17: 39000
            // Agrega más valores según sea necesario
        };
    
        // Obtener el precio según la cantidad de días seleccionados
        const precio = diasSeleccionados <= 16 ? precios[diasSeleccionados] : precios[17]; // Usar el precio por defecto si la cantidad es mayor a 16
    
        return precio;
    }

    actualizarTotalPrecio() {
        const precioLimite1 = 10000;
        const precioLimite2 = 18000;
        const precioLimite3 = 27700;
    
        // Obtener los botones de suscripción
        const suscripcionButton1 = document.querySelector('a[name="MP-payButton"][data-plan="1"]');
        const suscripcionButton2 = document.querySelector('a[name="MP-payButton"][data-plan="2"]');
        const suscripcionButton3 = document.querySelector('a[name="MP-payButton"][data-plan="3"]');
    
        // Obtener el elemento donde se muestra el precio total
        const precioTotalElement = document.getElementById('precio-dia');
    
        if (this.totalPrecio >= precioLimite3) {
            // Mostrar solo el tercer botón de suscripción
            suscripcionButton1.style.display = 'none';
            suscripcionButton2.style.display = 'none';
            suscripcionButton3.style.display = 'inline';
        } else if (this.totalPrecio >= precioLimite2) {
            // Mostrar solo el segundo botón de suscripción
            suscripcionButton1.style.display = 'none';
            suscripcionButton2.style.display = 'inline';
            suscripcionButton3.style.display = 'none';
        } else if (this.totalPrecio >= precioLimite1) {
            // Mostrar solo el primer botón de suscripción
            suscripcionButton1.style.display = 'inline';
            suscripcionButton2.style.display = 'none';
            suscripcionButton3.style.display = 'none';
        } else {
            // Ocultar todos los botones de suscripción
            suscripcionButton1.style.display = 'none';
            suscripcionButton2.style.display = 'none';
            suscripcionButton3.style.display = 'none';
        }
    
        // Actualizar el elemento con el precio total, asegurándose de que sea al menos 0
        precioTotalElement.textContent = `Precio: $${Math.max(0, this.totalPrecio).toFixed(2)}`;
    }
    
    
    
    

    addToClassList() {
        // Obtener la lista de clases y el botón de reserva
        let classList = document.getElementById('class-list');
        
        // Obtener el precio asociado al día seleccionado
        const precio = this.calcularPrecio();
        
        // Asegurar que selectedTime esté definido
        const selectedTime = document.getElementById('horario').value || '';
        
        // Agregar el nuevo elemento de lista con la fecha, horario y precio seleccionados
        let listItem = document.createElement('li');
        listItem.textContent = `Clase ${this.selectedDateTime.format('LLL')} - ${selectedTime} - Precio: $${precio.toFixed(2)}`;
        
        // Crear el botón de borrado para esta fecha
        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Borrar';
        deleteButton.addEventListener('click', () => {
            this.borrarClase(listItem, precio);
        });
        
        // Agregar el botón de borrado al elemento de lista
        listItem.appendChild(deleteButton);
        
        // Agregar el nuevo elemento a la lista
        classList.appendChild(listItem);
    
        // Agregar el precio al total
        this.totalPrecio += precio;
        
        // Actualizar el elemento HTML con el total de precios
        this.actualizarTotalPrecio();
    }
    
    
    borrarClase(item, precio) {
        // Obtener la lista de clases y el botón de reserva
        let classList = document.getElementById('class-list');
        let reserveButton = document.getElementById('reserve-button');
    
        // Quitar el elemento de lista específico
        classList.removeChild(item);
    
        // Si la lista está vacía, deshabilitar el botón de reserva
        if (classList.children.length === 0) {
            reserveButton.setAttribute('disabled', 'disabled');
        }
    
        // Restar el precio del total
        this.totalPrecio -= precio;
    
        // Actualizar el elemento HTML con el total de precios
        this.actualizarTotalPrecio();
    }
    
    addEventListenerToClearAllButton() {
        let clearAllButton = this.elCalendar.querySelector('#clear-all-button');
        if (clearAllButton) {
            clearAllButton.addEventListener('click', () => {
                this.borrarTodasLasClases(); // Cambié el nombre de la función para que coincida con la definición en el HTML
            });
        }
    }
    

    borrarTodasLasClases() {
        let classList = document.getElementById('class-list');
        let reserveButton = document.getElementById('reserve-button');

        if (classList) {
            classList.innerHTML = '';
        }

        if (reserveButton) {
            reserveButton.setAttribute('disabled', 'disabled');
        }

        // Reiniciar el total de precios
        this.totalPrecio = 0;

        // Actualizar el elemento HTML con el total de precios
        this.actualizarTotalPrecio();

        this.selectedDateTime = null;
    }


    getElement() {
        return this.elCalendar;
    }

    value() {
        return this.selectedDateTime;
    }
}
