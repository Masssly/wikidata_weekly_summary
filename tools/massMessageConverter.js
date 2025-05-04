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
  let text = document.getElementById("inputTextMM").value;

  // Clean up translate, languages, tvar tags, and category marker
  text = text
    .replace(/<\/?translate>/gi, "")
    .replace(/<languages\s*\/>/gi, "")
    .replace(/<tvar\s+name\s*=\s*"[^"]*"\s*>/gi, "")
    .replace(/<\/tvar>/gi, "")
    .replace(/\[\[Category:Wikidata status updates\|\s*\]\]/g, "")
    .trim();

  // Convert headings: = Section = → '''Section'''
  text = text.replace(
    /^\=\s*(.*?)\s*\=$/gm,
    (match, headingText) => `'''${headingText}'''`
  );

  // Define the header to prepend
  const header = `
<div class="plainlinks mw-content-ltr" lang="en" dir="ltr">
  [[File:Wikidata-logo-en.svg|150px|right]]
  <div style="margin-top:10px; padding-left:5px; font-family:Georgia, Palatino, Palatino Linotype, Times, Times New Roman, serif;">
    ''Here's your quick overview of what has been happening around Wikidata in the<br>week leading up to 2025-04-28. Missed the previous one? See issue [[d:Special:MyLanguage/Wikidata:Status updates/2025 04 22|#676]].<br>Translations are [[d:Special:MyLanguage/Wikidata:Status updates/Current|available]]''
  </div>
  <div style="-moz-column-count:2; -webkit-column-count:2; column-count:2; -webkit-column-width: 400px; -moz-column-width: 400px; column-width: 400px;">
`.trim();

  // Define the footer to append
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

  // Combine header, cleaned text, and footer
  document.getElementById("outputTextMM").value = header + "\n\n" + text + "\n\n" + footer;
}

