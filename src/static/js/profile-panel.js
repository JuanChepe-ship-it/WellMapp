export async function loadProfilePanel() {
    document.getElementById('profile-panel')?.remove();
  
    const response = await fetch('/src/static/html/profile-panel.html');
    const html = await response.text();
  
    const container = document.createElement('div');
    container.innerHTML = html;
    document.body.appendChild(container.firstElementChild);
  
    const panel = document.getElementById('profile-panel');
    panel.classList.add('open');
  
    document.getElementById('close-profile-panel')?.addEventListener('click', () => {
      panel.classList.remove('open');
    });
  }
  document.querySelectorAll('.dropdown-header').forEach(header => {
    header.addEventListener('click', () => {
        const dropdown = header.parentElement;
        dropdown.classList.toggle('open');
    });
});