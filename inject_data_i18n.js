const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');
let t = JSON.parse(fs.readFileSync('t.json', 'utf8'));

let count = 0;

for (let key in t) {
    let val = t[key];
    
    // Normalize string whitespace and escape for regex
    let valStr = val.trim();
    if (!valStr) continue;
    
    let escapedVal = valStr.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
                           .replace(/\\ /g, '\\s+')
                           .replace(/ /g, '\\s+')
                           .replace(/\\n/g, '\\s*')
                           .replace(/\\r/g, '\\s*');
    
    // Search <TAG ...> VAL </TAG>
    let pattern = new RegExp('(<[a-zA-Z0-9]+([^>]*?))>\\s*(' + escapedVal + ')\\s*(<\/[a-zA-Z0-9]+>)?');
    
    html = html.replace(pattern, (match, p1, p2, p3, p4) => {
        if (p1.includes('data-i18n=')) return match; // Already added
        count++;
        return p1 + ' data-i18n="' + key + '">' + p3 + (p4 || '');
    });
}

// Special cases that our simple regex might miss because they are nested manually
html = html.replace('>Serviços<', ' data-i18n="nav.servicos">Serviços<');
html = html.replace('>Projetos<', ' data-i18n="nav.projetos">Projetos<');
html = html.replace('>Sobre<', ' data-i18n="nav.sobre">Sobre<');
html = html.replace('>Visão<', ' data-i18n="nav.visao">Visão<');
html = html.replace('>Contacto<', ' data-i18n="nav.contacto">Contacto<');
html = html.replace('>Analisar Terreno<', ' data-i18n="nav.analisar">Analisar Terreno<');

// Output resulting HTML wrapper fallback
// if it still has gaps, we will do a more robust approach.
fs.writeFileSync('index_i18n.html', html, 'utf8');
console.log('Injected ' + count + ' keys using regex logic.');
