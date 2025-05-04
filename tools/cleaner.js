// tools/cleaner.js

function cleanContent() {
  const input = document.getElementById("inputText").value;
  let output = input
    .replace(/<\/?translate>/g, "")
    .replace(/<languages\s*\/>/g, "")
    .replace(/<tvar\s+name="[^"]*">/g, "")
    .replace(/<\/tvar>/g, "")
    .replace(/\[\[Category:Wikidata status updates\|\s*\]\]/g, "")
    .trim();

  const footer = `
<div style="margin-top:10px; font-size:90%; padding-left:5px;
     font-family:Georgia, Palatino, Palatino Linotype, Times, Times New Roman, serif;">
'''· [[d:Special:MyLanguage/Wikidata:Status updates/Previous|Previous issue]] ·
[[d:Special:MyLanguage/Wikidata:Status updates/Current|Full report]] ·
[[m:Global message delivery/Targets/Wikidata|Unsubscribe]] ·
[[:d:User:Mohammed Abdulai (WMDE)|Mohammed Abdulai (WMDE)]] 
[[:d:User talk:Mohammed Abdulai (WMDE)|talk]] · ~~~~'''
</div>
</div>
</div>`;

  output += "\n\n" + footer.trim();
  document.getElementById("outputText").value = output;
}

// Copy-to-clipboard setup
document.addEventListener("DOMContentLoaded", () => {
  const copyBtn = document.getElementById("copyBtn");
  if (!copyBtn) return;
  copyBtn.addEventListener("click", () => {
    const cleaned = document.getElementById("outputText").value;
    navigator.clipboard.writeText(cleaned)
      .then(() => alert("✅ Cleaned text copied to clipboard!"))
      .catch(err => console.error("Copy failed:", err));
  });
});
