// tools/massMessageConverter.js

/**
 * convertMassMessage()
 * ----------------------
 * 1. Reads raw wikitext from #inputTextMM
 * 2. Runs the same cleaning steps as cleanContent()
 * 3. Converts any top‑level headings (= Heading =) to bold inline ('''Heading''')
 * 4. Appends the standard weekly‑summary footer
 * 5. Places the final text into #outputTextMM
 */
function convertMassMessage() {
  // 1. Grab the raw input
  let text = document.getElementById("inputTextMM").value;

  // 2. Clean up translate, languages, tvar tags, and category marker
  text = text
    .replace(/<\/?translate>/gi, "")
    .replace(/<languages\s*\/>/gi, "")
    .replace(/<tvar\s+name\s*=\s*"[^"]*"\s*>/gi, "")
    .replace(/<\/tvar>/gi, "")
    .replace(/\[\[Category:Wikidata status updates\|\s*\]\]/g, "")
    .trim();

  // 3. Convert headings: = Section = → '''Section'''
  text = text.replace(
    /^\=\s*(.*?)\s*\=$/gm,
    (match, headingText) => `'''${headingText}'''`
  );

  // 4. Define and append the footer
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
 * Copy button setup for MassMessage
 * -----------------------------------
 * Copies only the converted output (#outputTextMM) and flashes
 * a “✅ Copied!” confirmation on the button itself.
 */
document.addEventListener("DOMContentLoaded", () => {
  const copyBtn  = document.getElementById("copyMMBtn");
  const outputTA = document.getElementById("outputTextMM");
  if (!copyBtn || !outputTA) return;

  copyBtn.addEventListener("click", () => {
    const converted = outputTA.value;
    if (!converted) return;

    navigator.clipboard.writeText(converted)
      .then(() => {
        // flash confirmation
        const originalLabel = copyBtn.textContent;
        copyBtn.textContent = "✅ Copied!";
        setTimeout(() => copyBtn.textContent = originalLabel, 1500);
      })
      .catch(err => {
        console.error("Copy failed:", err);
        alert("Copy failed—see console for details");
      });
  });
});
