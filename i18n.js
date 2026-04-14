document.addEventListener('DOMContentLoaded', () => {
    // Initialization
    let lang = localStorage.getItem('baserustico_lang');
    
    // Check URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    let langFromUrl = null;
    if (urlParams.has('lang')) {
        langFromUrl = urlParams.get('lang');
    }

    if (langFromUrl && ['pt', 'en', 'es', 'fr', 'de'].includes(langFromUrl)) {
        lang = langFromUrl;
        // Clean URL after we detected it
        const newPath = lang === 'pt' ? '/' : '/' + lang;
        history.replaceState(null, '', newPath);
    } else if (!lang) {
        // Autodetect browser language if no preference & no url param
        const browserLang = navigator.language.slice(0, 2);
        lang = (['pt', 'en', 'es', 'fr', 'de'].includes(browserLang)) ? browserLang : 'pt';
    }

    // Set default if invalid
    if (!['pt', 'en', 'es', 'fr', 'de'].includes(lang)) {
        lang = 'pt';
    }

    // Force run standard language replacement
    switchLanguage(lang);
});

window.switchLanguage = function(lang) {
    if (!['pt', 'en', 'es', 'fr', 'de'].includes(lang)) return;

    localStorage.setItem('baserustico_lang', lang);
    
    // Process string translation
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });

    // Update active state in selectors
    document.querySelectorAll('.lang-selector').forEach(selector => {
        selector.classList.remove('font-bold', 'text-primary', 'border-primary/30');
        // Adiciona classe de texto esmaecido por padrão, que será removida se ativo
        selector.classList.add('text-white/60');
        
        if (selector.getAttribute('data-lang') === lang) {
            selector.classList.add('font-bold', 'text-primary', 'border-primary/30');
            selector.classList.remove('text-white/60');
        }
    });

    const activeLabel = document.getElementById('active-lang-label');
    if (activeLabel) activeLabel.textContent = lang.toUpperCase();

    // Change url silently (only if we're not currently on the canonical path to avoid reloading)
    const newPath = lang === 'pt' ? '/' : '/' + lang;
    if (window.location.pathname !== newPath && window.location.pathname !== newPath + '/') {
        history.pushState(null, '', newPath);
    }
    
    // Set root lang
    document.documentElement.lang = lang === 'pt' ? 'pt-PT' : lang;
};
