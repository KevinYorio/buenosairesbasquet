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
        this.preciosPorDia = this.generarPreciosAleatorios();
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
                <label for="horario">Selecciona un horario:</label>
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

    
generarPreciosAleatorios() {
    // Generar precios aleatorios para cada día del mes actual
    let precios = {};
    const diasEnMes = this.currentMonth.daysInMonth();

    for (let i = 1; i <= diasEnMes; i++) {
        precios[i] = Math.floor(Math.random() * 100) + 1; // Precio aleatorio entre 1 y 100
    }

    return precios;
}

calcularPrecio(selectedDate) {
    const diaSeleccionado = selectedDate.date();
    
    // Obtener el precio asociado al día seleccionado
    const precio = this.preciosPorDia[diaSeleccionado] || 0;

    return precio;
}

    
addToClassList() {
    // Obtener la lista de clases y el botón de reserva
    let classList = document.getElementById('class-list');
    let reserveButton = document.getElementById('reserve-button');

    // Obtener el precio asociado al día seleccionado
    const precio = this.calcularPrecio(this.selectedDateTime);

    // Asegurar que selectedTime esté definido
    const selectedTime = document.getElementById('horario').value || '';

    // Agregar el nuevo elemento de lista con la fecha, horario y precio seleccionados
    let listItem = document.createElement('li');
    listItem.textContent = `Clase ${this.selectedDateTime.format('LLL')} - ${selectedTime} - Precio: $${precio.toFixed(2)}`;

    // Crear el botón de borrado para esta fecha
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Borrar';
    deleteButton.addEventListener('click', () => {
        this.borrarClase(listItem);
    });

    // Agregar el botón de borrado al elemento de lista
    listItem.appendChild(deleteButton);

    // Agregar el nuevo elemento a la lista
    classList.appendChild(listItem);

    // Habilitar el botón de reserva
    reserveButton.removeAttribute('disabled');

            // Agregar el precio al total
            this.totalPrecio += this.calcularPrecio(this.selectedDateTime);

            // Actualizar el elemento HTML con el total de precios
            this.actualizarTotalPrecio();
}


borrarClase(item) {
    // Obtener la lista de clases y el botón de reserva
    let classList = document.getElementById('class-list');
    let reserveButton = document.getElementById('reserve-button');

    // Quitar el elemento de lista específico
    classList.removeChild(item);

    // Si la lista está vacía, deshabilitar el botón de reserva
    if (classList.children.length === 0) {
        reserveButton.setAttribute('disabled', 'disabled');

                // Restar el precio del total
                this.totalPrecio -= precioClase; // Ajusta esto según tu implementación

                // Actualizar el elemento HTML con el total de precios
                this.actualizarTotalPrecio();
    }
}


    addEventListenerToClearAllButton() {
        let clearAllButton = this.elCalendar.querySelector('#clear-all-button');
        if (clearAllButton) {
            clearAllButton.addEventListener('click', () => {
                this.borrarTodasLasClases();
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

    actualizarTotalPrecio() {
        const totalPrecioElement = document.getElementById('precio-dia');
        if (totalPrecioElement) {
            totalPrecioElement.textContent = `Total: $${this.totalPrecio.toFixed(2)}`;
        }
    }
    
    

    getElement() {
        return this.elCalendar;
    }

    value() {
        return this.selectedDateTime;
    }
}
