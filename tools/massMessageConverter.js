// tools/massMessageConverter.js

function convertMassMessage() {
  let text = document.getElementById("inputTextMM").value;

  // 1) Run all cleaner transformations:
  text = text
    .replace(/<\/?translate>/g, '')
    .replace(/<languages\s*\/>/g, '')
    .replace(/<tvar\s+name="[^"]*">/g, '')
    .replace(/<\/tvar>/g, '')
    .replace(/\[\[Category:Wikidata status updates\|\s*\]\]/g, '')
    .trim();

  // 2) Convert level‑1 headers (= Header =) to bold inline:
  text = text.replace(
    /^=\s*(.+?)\s*=$/gm,
    (match, p1) => `'''${p1}'''`
  );

  // 3) Append the footer (same as cleaner)
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
</div>`.trim();

  document.getElementById("outputTextMM").value = text + "\n\n" + footer;
}

// Copy‑to‑clipboard for the converted output only
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("copyMMBtn");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const output = document.getElementById("outputTextMM").value;
    navigator.clipboard.writeText(output)
      .then(() => alert("✅ Converted text copied!"))
      .catch(err => console.error("Copy failed:", err));
  });
});
