// tools/cleaner.js

/**
 * Cleans the “Next” wikitext:
 *  - Removes <translate>…</translate> tags
 *  - Removes <languages/> tags
 *  - Strips out <tvar name="…">…</tvar> elements
 *  - Removes the category footer tag
 *  - Trims whitespace
 *  - Appends the standard footer
 */
function cleanContent() {
  const input = document.getElementById("inputText").value;
  let output = input
    .replace(/<\/?translate>/g, "")
    .replace(/<languages\s*\/>/g, "")
    .replace(/<tvar\s+name\s*=\s*"[^"]*"\s*>/gi, "") // remove remove the tvars including variants of it
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
</div>`.trim();

  document.getElementById("outputText").value = output + "\n\n" + footer;
}

/**
 * Sets up the Copy to Clipboard button to copy only the cleaned output
 * and shows a “✅ Copied!” confirmation.
 */
document.addEventListener("DOMContentLoaded", () => {
  const copyBtn = document.getElementById("copyBtn");
  const outputTA = document.getElementById("outputText");
  if (!copyBtn || !outputTA) return;

  copyBtn.addEventListener("click", () => {
    const cleaned = outputTA.value;
    if (!cleaned) return;

    navigator.clipboard.writeText(cleaned)
      .then(() => {
        const orig = copyBtn.textContent;
        copyBtn.textContent = "✅ Copied!";
        setTimeout(() => copyBtn.textContent = orig, 1500);
      })
      .catch(err => {
        console.error("Copy failed:", err);
        alert("Copy failed—see console for details");
      });
  });
});
