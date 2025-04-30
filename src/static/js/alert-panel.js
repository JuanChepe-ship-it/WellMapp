export async function loadAlertPanel() {
    // Verificar si el panel ya está cargado
    if (!document.getElementById('alert-panel')) {
        const response = await fetch('../static/html/alert-panel.html'); // Cargar el panel desde un archivo externo
        const panelHTML = await response.text();
        document.body.insertAdjacentHTML('beforeend', panelHTML);

        // Agregar funcionalidad al botón de cerrar
        const closeAlertPanelButton = document.getElementById('close-panel_1');
        if (closeAlertPanelButton) {
            closeAlertPanelButton.addEventListener('click', () => {
                document.getElementById('alert-panel').classList.remove('open');
            });
        } else {
            console.error('El botón #close-panel_1 no se encontró en el DOM.');
        }
    }

    // Mostrar el panel
    const alertPanel = document.getElementById('alert-panel');
    if (alertPanel) {
        alertPanel.classList.add('open');
    } else {
        console.error('El panel de alertas no se encontró en el DOM.');
    }
}