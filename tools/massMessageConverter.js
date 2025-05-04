// tools/massMessageConverter.js

/**
 * convertMassMessage()
 * ----------------------
 * 1. Remove the opening summary line "This is the Wikidata summary of the week before YYYY-MM-DD."
 * 2. Strip out translate, languages, opening & closing tvar tags, and the category footer
 * 3. Convert any top‑level headings (= Section =) into bold inline ('''Section''')
 * 4. Prepend the full HTML header block
 * 5. Append the standard footer
 * 6. Display in #outputTextMM
 */
function convertMassMessage() {
  let text = document.getElementById("inputTextMM").value;

  // 1) Remove the summary‐before line (any date, optional trailing period & spaces)
  text = text.replace(
    /^This is the Wikidata summary of the week before\s*\d{4}-\d{2}-\d{2}\.?\s*$/m,
    ""
  );

  // 2) Core cleaning: strip translate, languages, tvar, and category tags
  text = text
    .replace(/<\/?translate>/gi, "")               // <translate>…</translate>
    .replace(/<languages\s*\/>/gi, "")              // <languages/>
    .replace(/<tvar\s+name\s*=\s*"[^"]*"\s*>/gi, "")// opening <tvar name="…">
    .replace(/<\/tvar>/gi, "")                      // closing </tvar>
    .replace(/\[\[Category:Wikidata status updates\|\s*\]\]/g, "") // category footer
    .trim();

  // 3) Convert level‑1 headings (= Section =) → bold inline ('''Section''')
  text = text.replace(
    /^\=\s*(.*?)\s*\=$/gm,
    (match, headingText) => `'''${headingText}'''`
  );

  // 4) The full HTML block to prepend (update dates/issue link here as needed)
  const header = `
<div class="plainlinks mw-content-ltr" lang="en" dir="ltr">

[[File:Wikidata-logo-en.svg|150px|right]]
<div style="margin-top:10px; padding-left:5px; font-family:Georgia, Palatino, Palatino Linotype, Times, Times New Roman, serif;">'' Here's your quick overview of what has been happening around Wikidata in the<br>week leading up to 2025-04-28. Missed the previous one? See issue [[d:Special:MyLanguage/Wikidata:Status updates/2025 04 22|#676]].<br>Translations are [[d:Special:MyLanguage/Wikidata:Status updates/Current|available]]''</div>
<div style="-moz-column-count:2; -webkit-column-count:2; column-count:2; -webkit-column-width: 400px; -moz-column-width: 400px; column-width: 400px;">
`.trim();

  // 5) The standard footer (same as before)
  const footer = `
</div>
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

  // 6) Show the result
  document.getElementById("outputTextMM").value = header + "\n\n" + text + "\n\n" + footer;
}

/**
 * Copy button wiring
 * -------------------
 * Copies only the converted #outputTextMM and flashes a brief confirmation.
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
