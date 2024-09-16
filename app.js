document.addEventListener("DOMContentLoaded", function() {
    const scheduleDiv = document.getElementById('schedule');

    const hours = [
        '09:00', '10:30', '12:00', // Mañana
        '14:00', '15:30', '17:00', '18:30', '20:00' // Tarde
    ];

    hours.forEach(time => {
        const = document.createElement('div');
        slot.className = 'slot';
        slot.textContent = `${time}`;
        slot.addEventListener('click', () => {
            alert(`Reservando ${time}`);
            // Aquí puedes llamar a una función para reservar la hora
        });
        scheduleDiv.appendChild(slot);
    });
});