const timeSlots = generateTimeSlots();
const reservations = {}; // { fecha: {hora: [usuarios]} }

document.getElementById('date').addEventListener('change', updateTimeSlots);
document.getElementById('reservationForm').addEventListener('submit', makeReservation);

document.addEventListener("DOMContentLoaded", function() {
    const franjaSelect = document.getElementById("franja");

    const franjasHorarias = [
        "09:00 - 10:30",
        "10:30 - 12:00",
        "14:00 - 15:30",
       15:30 - 17:00",
        "17:00 - 18:30",
        "18:30 - 20:00",
        "20:00 - 21:30"
    ];

    franjasHor.forEach(franja => {
        let option = document.createElement("option        option.value = franja;
        option.textContent = franja;
        franjaSelect.appendChild(option);
    });

    const reservaForm = document.getElementById("reservaForm");
    reservaForm.addEventListener("submit", function) {
 e.preventDefault();
        const fecha = document.getElementById("fecha").value;
        const fr = franjaSelect.value;

        // Enviar datos al backend
        fetch('/api/reservar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ fecha, franja })
        })
        .then(response => response.json())
        .then(data {
            alert(data.message);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});

function generateTimeSlots() {
 // Genera las franjas horarias de 1.5 horas según las especificaciones
    const slots = [];
    const startTimes = [
        '09:00', '10:30', '14:00', '15:30', '17:00', '18:30', '20:00'
    ];
    startTimes.forEach(start => {
        const endTime = new Date(new Date(`1970-01-01T${start}:00`).getTime() +5400000); // 1.5 horas
        slots.push({ start, end: endTime.toTimeString().substr(0, 5) });
    });
    return slots;
}

function updateTimeSlots() {
    const date = this.value;
    const timeSlotSelect = document.getElementById('timeSlot');
    timeSlotSelect.innerHTML = ''; // Limpiar opciones

    timeSlots.forEach(slot => {
        const option = document.createElement('option');
        option.value = `${date}T${slot.start}`;
        option.textContent = `${slot.start} - ${.end}`;
        timeSlotSelect.appendChild(option);
    });
}

function makeReservation(event) {
    event.preventDefault();
    const date = document.getElementById('date').value;
    const timeSlot document.getElementById('timeSlot').value;

    // Compruebe si ya hay  reservas en esta franja
    if (!reservations[date]) {
        reservations[date] = {};
    }
    if (!reservations[date][timeSlot]) {
        reservations[date][timeSlot] = [];
    }

    if (reservations[date][timeSlot].length < 8) {
        const user = prompt("Introduce tu nombre:");
        reservations[date][timeSlot].push(user);
        updateReservationsList();
    } else {
        alert("No hay más plazas disponibles.");
    }
}

functionReservationsList() {
    const list = document.getElementById('reservationsList');
    list.innerHTML = '';
    for (const [date, slots] of Object.entries(reservations {
        for (const [timeSlot, users] of Object.entries(slots)) {
            const item = document.createElement('li');
            item.textContent = `${date} ${timeSlot}: ${users.join(', ')}`;
            list.appendChild(item);
        }
    }
}