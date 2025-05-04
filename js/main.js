document.getElementById('toolSelect').addEventListener('change', function () {
  const selectedTool = this.value;
  const container = document.getElementById('toolContainer');

  fetch(selectedTool)
    .then(response => response.text())
    .then(html => {
      container.innerHTML = html;

      // If the cleaner tool is loaded, dynamically load its JS
      if (selectedTool.endsWith('cleaner.html')) {
        const script = document.createElement('script');
        script.src = 'tools/cleaner.js';
        document.body.appendChild(script);
      }
    })
    .catch(error => {
      console.error('Error loading tool:', error);
      container.innerHTML = '<p class="text-danger">Failed to load tool.</p>';
    });
});
