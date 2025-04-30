
let map; // global para acceso desde search

document.addEventListener('DOMContentLoaded', () => {
    initMap();
    initSearch();
    // No necesitas initSidePanel, ya que el panel lateral se maneja con loadSidePanel
});

function initMap() {
    map = L.map('map').setView([7.0617, -73.8519], 13); // CDMX
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
}

function initSearch() {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const voiceButton = document.getElementById('voice-btn');
    const micIcon = document.getElementById('mic-icon');

    let isListening = false;
    let recognition = null;

    // Speech recognition setup
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        recognition.lang = 'es-ES';
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => {
            isListening = true;
            micIcon.classList.add('listening');
            micIcon.setAttribute('stroke', '#FF3366');
            voiceButton.setAttribute('aria-label', 'Detener dictado');
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            searchInput.value = transcript;
        };

        recognition.onend = () => {
            isListening = false;
            micIcon.classList.remove('listening');
            micIcon.setAttribute('stroke', '#1C1C1E');
            voiceButton.setAttribute('aria-label', 'Iniciar dictado por voz');
        };

        recognition.onerror = (event) => {
            console.error("Error de reconocimiento de voz:", event.error);
            isListening = false;
            micIcon.classList.remove('listening');
            micIcon.setAttribute('stroke', '#1C1C1E');
            voiceButton.setAttribute('aria-label', 'Iniciar dictado por voz');
        };
    }

    voiceButton.addEventListener('click', () => {
        if (!recognition) {
            alert("Tu navegador no soporta reconocimiento de voz");
            return;
        }

        isListening ? recognition.stop() : recognition.start();
    });

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchInput.value.trim();
        if (query) {
            searchLocation(query);
        }
    });
}

function searchLocation(query) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`;

    fetch(url)
        .then(res => res.json())
        .then(results => {
            if (results.length > 0) {
                const { lat, lon } = results[0];
                const location = [parseFloat(lat), parseFloat(lon)];
                map.setView(location, 15);
                L.marker(location).addTo(map);
            } else {
                alert("No se encontró la ubicación");
            }
        })
        .catch(err => {
            console.error("Error al buscar ubicación:", err);
        });
}

import { loadAlertPanel } from './alert-panel.js';

// Botón para abrir el panel de alertas
const menuAlertButton = document.getElementById('menu-alerta');
if (menuAlertButton) {
    menuAlertButton.addEventListener('click', () => {
        loadAlertPanel();
    });
} else {
    console.error('El botón #menu-alerta no se encontró en el DOM.');
}


//side panel///panel del perfil//

import { loadProfilePanel } from './profile-panel.js';

const menuToggleButton = document.getElementById('menu-toggle');
menuToggleButton.addEventListener('click', () => {
    loadProfilePanel(); // Llama a la función para cargar el profile panel
});

import { loadMachinePanel } from './machine-panel.js';

// Botón para abrir el panel de máquina
const menuMachineButton = document.getElementById('menu-machine');
if (menuMachineButton) {
    menuMachineButton.addEventListener('click', () => {
        loadMachinePanel();
    });
} else {
    console.error('El botón #menu-machine no se encontró en el DOM.');
}

