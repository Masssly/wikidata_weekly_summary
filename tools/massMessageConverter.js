// tools/massMessageConverter.js

/**
 * Cleans and converts the “Next” wikitext into MassMessage format:
 *  1. Remove all translate, languages, and tvar tags (both opening & closing)
 *  2. Remove the category footer tag
 *  3. Convert any “= Section =” headings into bold inline ('''Section''')
 *  4. Append the standard footer
 */
function convertMassMessage() {
  let text = document.getElementById("inputTextMM").value;

  // 1) Clean-up transformations (strip tags & category)
  text = text
    .replace(/<\/?translate>/g, "")                    // remove <translate>…</translate>
    .replace(/<languages\s*\/>/g, "")                   // remove <languages/>
    .replace(/<tvar\s+name="[^"]*">/g, "")               // remove opening <tvar name="…">
    .replace(/<\/tvar>/g, "")                           // remove closing </tvar>
    .replace(/\[\[Category:Wikidata status updates\|\s*\]\]/g, "")
    .trim();

  // 2) Convert level‑1 headers (= Section =) to '''Section'''
  text = text.replace(
    /^=\s*(.+?)\s*=$/gm,
    (match, p1) => `'''${p1}'''`
  );

  // 3) Append the standard footer
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

/**
 * Sets up the Copy to Clipboard button for the MassMessage converter,
 * copying only the converted output and showing a brief “✅ Copied!” confirmation.
 */
document.addEventListener("DOMContentLoaded", () => {
  const copyBtn = document.getElementById("copyMMBtn");
  const outputTA = document.getElementById("outputTextMM");
  if (!copyBtn || !outputTA) return;

  copyBtn.addEventListener("click", () => {
    const converted = outputTA.value;
    if (!converted) return;

    navigator.clipboard.writeText(converted)
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
