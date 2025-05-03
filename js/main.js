document.getElementById('toolSelect').addEventListener('change', function () {
  const selectedTool = this.value;
  fetch(selectedTool)
    .then(response => response.text())
    .then(html => {
      document.getElementById('toolContainer').innerHTML = html;
    })
    .catch(error => {
      console.error('Error loading tool:', error);
      document.getElementById('toolContainer').innerHTML = '<p class="text-danger">Failed to load tool.</p>';
    });
});
