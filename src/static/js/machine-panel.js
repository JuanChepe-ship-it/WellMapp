export async function loadMachinePanel() {
    // Verificar si el panel ya está cargado
    if (!document.getElementById('machine-panel')) {
        const response = await fetch('../static/html/machine-panel.html'); // Cargar el panel desde un archivo externo
        const panelHTML = await response.text();
        document.body.insertAdjacentHTML('beforeend', panelHTML);

        // Agregar funcionalidad al botón de cerrar
        const closeMachinePanelButton = document.getElementById('close-machine-panel');
        if (closeMachinePanelButton) {
            closeMachinePanelButton.addEventListener('click', () => {
                document.getElementById('machine-panel').classList.remove('open');
            });
        } else {
            console.error('El botón #close-machine-panel no se encontró en el DOM.');
        }
    }

    // Obtener la información del pozo (simulación de datos dinámicos)
    const pozoId = 1; // Cambia esto dinámicamente según el pozo seleccionado
    const data = await fetchPozoData(pozoId);

    // Renderizar la información en el panel
    const machineInfoContainer = document.getElementById('machine-info');
    if (machineInfoContainer) {
        machineInfoContainer.innerHTML = `
            <div>Bombeo Mecánico: ${data.bombeo_mecanico}</div>
            <div>Modelo de Unidad: ${data.modelo_unidad}</div>
            <div>Casing: ${data.casing}</div>
            <div>Tubing: ${data.tubing}</div>
            <div>Sarta de Varillas: ${data.sarta_varillas}</div>
            <div>Profundidad de la Bomba: ${data.profundidad_bomba}</div>
            <div>Carga Máxima de la Barra Lisa: ${data.carga_maxima}</div>
            <div>Carga Mínima de la Barra Lisa: ${data.carga_minima}</div>
            <div>Contrabalance: ${data.contrabalance}</div>
        `;
    }

    // Mostrar el panel
    const machinePanel = document.getElementById('machine-panel');
    if (machinePanel) {
        machinePanel.classList.add('open');
    } else {
        console.error('El panel de máquina no se encontró en el DOM.');
    }
}

// Simulación de una función para obtener datos del pozo
async function fetchPozoData(pozoId) {
    // Simulación de datos (puedes reemplazar esto con una llamada a una API)
    const pozos = {
        1: {
            bombeo_mecanico: "Sí",
            modelo_unidad: "Modelo A",
            casing: "Casing 1",
            tubing: "Tubing 1",
            sarta_varillas: "Varillas 1",
            profundidad_bomba: "1000 m",
            carga_maxima: "500 kg",
            carga_minima: "200 kg",
            contrabalance: "50 kg"
        }
    };
    return pozos[pozoId];
}