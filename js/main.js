document.getElementById('toolSelect').addEventListener('change', function () {
  const selectedTool = this.value;
  fetch(selectedTool)
    .then(response => response.text())
    .then(html => {
      document.getElementById('toolContainer').innerHTML = html;

      // Dynamically load corresponding JS
      if (selectedTool.includes('cleaner.html')) {
        const script = document.createElement('script');
        script.src = 'tools/cleaner.js';
        document.body.appendChild(script);
      }
    })
    .catch(error => {
      console.error('Error loading tool:', error);
      document.getElementById('toolContainer').innerHTML = '<p class="text-danger">Failed to load tool.</p>';
    });
});
