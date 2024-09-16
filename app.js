const calendar = document.querySelector('.calendar');
const dateInput = document.getElementById('date');
const timeSelect = document.getElementById('time');
const bookingForm = document.getElementById('booking-form');

// Obtener los festivos del calendario lectivo de Las Palmas de Gran Canaria
function getFestivos() {
    // Aquí deberías implementar la lógica para obtener los festivos
    // del calendario lectivo de Las Palmas de Gran Canaria para 2024.
    // Puedes usar una API o una lista predefinida.
    return [
        // Ejemplo:
        new Date(2024, 0, 1),
        new Date(2024, 3, 29),
        new Date(2024, 4, 1),
        // ...
    ];
}

// Generar el calendario
function generateCalendar(year, month) {
    // Obtener el primer día del mes
    const firstDay = (new Date(year, month)).getDay();

    // Obtener la cantidad de días en el mes
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Crear la tabla del calendario
    let table = document.createElement('table');
    let headerRow = document.createElement('tr');

    // Agregar días de la semana a la cabecera
    ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].forEach(day => {
        let headerCell = document.createElement('th');
        headerCell.textContent = day;
        headerRow.appendChild(headerCell);
    });

    table.appendChild(headerRow);

    // Agregar días al calendario
    let currentDay = 1;
    let row = document.createElement('tr');
    for (let i = 0; i < 42; i++) {
        let cell = document.createElement('td');
        if (i < firstDay || currentDay > daysInMonth) {
            // Celdas vacías antes del primer día o después del último
            cell.classList.add('disabled');
        } else {
            // Agregar el número del día
            cell.textContent = currentDay;

            // Verificar si el día es festivo
            const isFestivo = getFestivos().some(festivo => {
                return festivo.getFullYear() === year &&
                    festivo.getMonth() === month &&
                    festivo.getDate() === currentDay;
            });

            // Verificar si el día es sábado o domingo
            const isWeekend = new Date(year, month, currentDay).getDay() >= 6;

            // Agregar clases a las celdas para el estilo
            if (isFestivo || isWeekend) {
                cell.classList.add('disabled');
            } else {
                cell.classList.add('available');
                cell.dataset.date = new Date(year, month, currentDay).toISOString().split('T')[0];
            }

            // Agregar evento click para seleccionar la fecha
            cell.addEventListener('click', selectDate);
        }
        row.appendChild(cell);

        // Agregar nueva fila cada 7 días
        if ((i + 1) % 7 === 0) {
            table.appendChild(row);
            row = document.createElement('tr');
        }
        currentDay++;
    }

    // Agregar el calendario al HTML
    calendar.innerHTML = '';
    calendar.appendChild(table);
}

// Función para seleccionar una fecha
function selectDate(event) {
    // Obtener la fecha seleccionada
    const selectedDate = event.target.dataset.date;

    // Actualizar la entrada de fecha
    dateInput.value = selectedDate;

    // Actualizar la selección de horas
    updateTimes(selectedDate);

    // Marcar la celda como seleccionada
    event.target.classList.add('selected');

    // Desmarcar las otras celdas
    const selectedCells = calendar.querySelectorAll('.selected');
    selectedCells.forEach(cell => {
        if (cell !== event.target) {
            cell.classList.remove('selected');
        }
    });
}

// Función para actualizar la selección de horas
function updateTimes(selectedDate) {
    // Obtener las franjas de horas disponibles para la fecha seleccionada
    const availableTimes = getAvailableTimes(selectedDate);

    // Limpiar la selección de horas
    timeSelect.innerHTML = '<option value="">Selecciona una hora</option>';

    // Agregar las horas disponibles a la selección
    availableTimes.forEach(time => {
        let option = document.createElement('option');
        option.value = time;
        option.textContent = time;
        timeSelect.appendChild(option);
    });
}

// Función para obtener las franjas de horas disponibles para una fecha
function getAvailableTimes(selectedDate) {
    // Obtener la fecha actual
    const today = new Date();

    // Obtener el año y el mes de la fecha seleccionada
    const selectedYear = new Date(selectedDate).getFullYear();
    const selectedMonth = new Date(selectedDate).getMonth();

    // Crear un array de horas disponibles
    let availableTimes = [];

    // Agregar horas disponibles de 9:00 a 12:00 y de 14:00 a 21:30
    for (let hour = 9; hour <= 12; hour++) {
        availableTimes.push(`${hour}:00`);
    }
    for (let hour = 14; hour <= 21; hour++) {
        availableTimes.push(`${hour}:00`);
    }
    for (let hour = 14; hour <= 21; hour++) {
        availableTimes.push(`${hour}:30`);
    }

    // Eliminar las horas que ya han pasado
    availableTimes = availableTimes.filter(time => {
        const selectedTime = new Date(selectedDate + 'T' + time);
        return selectedTime > today;
    });

    // Eliminar las horas que ya no están disponibles
    // (Aquí deberías implementar la lógica para verificar la disponibilidad
    // de las horas en la base de datos)

    // Eliminar las horas que están en festivos
    availableTimes = availableTimes.filter(time => {
        const selectedTime = new Date(selectedDate + 'T' + time);
        return !getFestivos().some(festivo => {
            return festivo.getFullYear() === selectedYear &&
                festivo.getMonth() === selectedMonth &&
                festivo.getDate() === selectedTime.getDate();
        });
    });

    // Devolver las horas disponibles
    return availableTimes;
}

// Función para manejar el envío del formulario de reserva
bookingForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Obtener los datos del formulario
    const selectedDate = dateInput.value;
    const selectedTime = timeSelect.value;

    // Validar que se hayan seleccionado una fecha y una hora
    if (!selectedDate || !selectedTime) {
        alert('Por favor, selecciona una fecha y una hora.');
        return;
    }

    // Realizar la reserva
    makeBooking(selectedDate, selectedTime);
});

// Función para realizar la reserva
function makeBooking(selectedDate, selectedTime) {
    // Aquí deberías implementar la lógica para realizar la reserva
    // en la base de datos.
    // Puedes usar una API o una función de AJAX para enviar los datos
    // al backend.
    console.log('Reservando para:', selectedDate, selectedTime);

    // Mostrar un mensaje de éxito o error
    // ...
}

// Inicializar el calendario
const today = new Date();
const current bodyParser = require('body-parser');
const cors = require('cors');

// Configuración del servidor
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

// Ruta para obtener las horas disponibles
app.get('/available-times/:date', (req, res) => {
    // Obtener la fecha
    const date = req.params.date;

    // Implementar la lógica para obtener las horas disponibles
    // (Consulta la base de datos o realiza un cálculo basado en la fecha)
    const availableTimes = getAvailableTimes(date);

    // Devolver las horas disponibles
    res.json(availableTimes);
});

// Ruta para realizar una reserva
app.post('/bookings', (req, res) => {
    // Obtener los datos de la reserva
    const bookingData = req.body;

    // Implementar la lógica para realizar la reserva
    // (Inserta la reserva en la base de datos)
    saveBooking(bookingData);

    // Devolver un mensaje de éxito
    res.json({ message: 'Reserva realizada correctamente.' });
});

// Función para obtener las horas disponibles
function getAvailableTimes(date) {
    // Implementar la lógica para obtener las horas disponibles
    // (Consulta la base de datos o realiza un cálculo basado en la fecha)
    return [
        // Ejemplo:
        '9:00',
        '10:30',
        '12:00',
        '14:00',
        '15:30',
        // ...
    ];
}

// Función para guardar una reserva
function saveBooking(bookingData) {
    // Implementar la lógica para guardar la reserva en la base de datos
    // (Puedes usar una base de datos como MongoDB o MySQL)
    console.log('Guardando reserva:', bookingData);
}

// Iniciar el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});