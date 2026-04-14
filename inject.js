const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// ADD SCRIPTS
if (!html.includes('i18n.js')) {
    html = html.replace('</body>', '    <script src="translations.js"></script>\n    <script src="i18n.js"></script>\n</body>');
}

// ADD LANG SWITCHER DESKTOP
let desktop_lang = `
            <div class="hidden md:flex items-center gap-3 text-white/60 text-xs font-bold tracking-widest ml-4 border-l border-white/10 pl-6 space-x-1">
                <button onclick="switchLanguage('pt')" data-lang="pt" class="lang-selector hover:text-white transition-colors uppercase pt-active text-primary font-bold">PT</button>
                <span class="text-white/20">|</span>
                <button onclick="switchLanguage('en')" data-lang="en" class="lang-selector hover:text-white transition-colors uppercase">EN</button>
                <span class="text-white/20">|</span>
                <button onclick="switchLanguage('es')" data-lang="es" class="lang-selector hover:text-white transition-colors uppercase">ES</button>
            </div>
            <!-- Desktop CTA -->`;
if (!html.includes("switchLanguage('pt')")) {
    html = html.replace('<!-- Desktop CTA -->', desktop_lang);
}

// ADD LANG SWITCHER MOBILE
let mobile_lang = `
        <div class="flex items-center justify-center gap-4 text-white/60 text-sm font-bold tracking-widest py-6 border-b border-white/10 w-full mb-4">
            <button onclick="switchLanguage('pt')" data-lang="pt" class="lang-selector hover:text-white transition-colors uppercase text-primary font-bold">PT</button>
            <span class="text-white/20">|</span>
            <button onclick="switchLanguage('en')" data-lang="en" class="lang-selector hover:text-white transition-colors uppercase">EN</button>
            <span class="text-white/20">|</span>
            <button onclick="switchLanguage('es')" data-lang="es" class="lang-selector hover:text-white transition-colors uppercase">ES</button>
        </div>
        <nav class="mobile-menu-links">`;
if (!html.includes("class=\\"flex items-center justify-center gap-4 text-white/60 text-sm font-bold tracking-widest py-6 border-b border-white/10 w-full mb-4\\"" )) {
    html = html.replace('<nav class="mobile-menu-links">', mobile_lang);
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('UI injected.');
