document.addEventListener("DOMContentLoaded", () => {
  const toolSelect = document.getElementById("toolSelect");
  const toolContainer = document.getElementById("toolContainer");

  toolSelect.addEventListener("change", () => {
    const selectedTool = toolSelect.value;
    fetch(selectedTool)
      .then(response => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.text();
      })
      .then(html => {
        // Inject the tool's HTML
        toolContainer.innerHTML = html;

        // Dynamically load the corresponding JS
        let scriptPath;
        if (selectedTool.endsWith("cleaner.html")) {
          scriptPath = "tools/cleaner.js";
        } else if (selectedTool.endsWith("massMessageConverter.html")) {
          scriptPath = "tools/massMessageConverter.js";
        }
        if (scriptPath) {
          const script = document.createElement("script");
          script.src = scriptPath;
          document.body.appendChild(script);
        }
      })
      .catch(error => {
        console.error("Error loading tool:", error);
        toolContainer.innerHTML = '<div class="alert alert-danger">Failed to load tool.</div>';
      });
  });
});

