import os

html = open('index.html', 'r', encoding='utf-8').read()

# ADD SCRIPTS
if 'i18n.js' not in html:
    html = html.replace('</body>', '    <script src="translations.js"></script>\n    <script src="i18n.js"></script>\n</body>')

# ADD LANG SWITCHER DESKTOP
desktop_lang = '''
            <div class="hidden md:flex items-center gap-3 text-white/60 text-xs font-bold tracking-widest ml-4 border-l border-white/10 pl-6 space-x-1">
                <button onclick="switchLanguage('pt')" data-lang="pt" class="lang-selector hover:text-white transition-colors">PT</button>
                <span class="text-white/20">|</span>
                <button onclick="switchLanguage('en')" data-lang="en" class="lang-selector hover:text-white transition-colors">EN</button>
                <span class="text-white/20">|</span>
                <button onclick="switchLanguage('es')" data-lang="es" class="lang-selector hover:text-white transition-colors">ES</button>
            </div>
            <!-- Desktop CTA -->'''
html = html.replace('<!-- Desktop CTA -->', desktop_lang)

# ADD LANG SWITCHER MOBILE
mobile_lang = '''
        <div class="flex items-center justify-center gap-4 text-white/60 text-sm font-bold tracking-widest py-6 border-b border-white/10">
            <button onclick="switchLanguage('pt')" data-lang="pt" class="lang-selector hover:text-white transition-colors">PT</button>
            <span class="text-white/20">|</span>
            <button onclick="switchLanguage('en')" data-lang="en" class="lang-selector hover:text-white transition-colors">EN</button>
            <span class="text-white/20">|</span>
            <button onclick="switchLanguage('es')" data-lang="es" class="lang-selector hover:text-white transition-colors">ES</button>
        </div>
        <nav class="mobile-menu-links">'''
html = html.replace('<nav class="mobile-menu-links">', mobile_lang)

# Let's save it
open('index.html', 'w', encoding='utf-8').write(html)
print("Scripts and lang switcher injected.")
