function cleanContent() {
  const input = document.getElementById('inputText').value;
  let output = input;
  output = output.replace(/<\/?translate>/g, '');
  output = output.replace(/<languages\s*\/>/g, '');
  output = output.replace(/<tvar\s+name="[^"]*">/g, '');
  output = output.replace(/<\/tvar>/g, '');
  output = output.replace(/\[\[Category:Wikidata status updates\|\s*\]\]/g, '');
  const footer = `
<div style="margin-top:10px; font-size:90%; padding-left:5px; font-family:Georgia, Palatino, Palatino Linotype, Times, Times New Roman, serif;">
'''· [[d:Special:MyLanguage/Wikidata:Status updates/Previous|Previous issue]] · [[d:Special:MyLanguage/Wikidata:Status updates/Current|Full report]] · [[m:Global message delivery/Targets/Wikidata|Unsubscribe]] · [[:d:User:Mohammed Abdulai (WMDE)|Mohammed Abdulai (WMDE)]] [[:d:User talk:Mohammed Abdulai (WMDE)|talk]] · ~~~~'''
</div>
</div>
</div>`;
  output = output.trim() + '\n\n' + footer.trim();
  document.getElementById('outputText').value = output;
}
