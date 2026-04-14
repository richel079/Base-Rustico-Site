import json
import re

html = open('index.html', 'r', encoding='utf-8').read()
t = json.load(open('t.json', 'r', encoding='utf-8'))

# Manual overrides for complex HTML tags
# Some strings in translations.js contain raw HTML like hero.tit
count = 0
for key, val in t.items():
    # normalize whitespace in val
    val_norm = re.sub(r'\s+', ' ', val.strip())
    
    # Try to find the exact substring, ignoring multiple spaces
    # We'll run a regex search for the value
    escaped_val = re.escape(val).replace(r'\ ', r'\s+').replace(r'\n', r'\s*').replace(r'\r', r'\s*')
    
    # Regex to find an opening tag just before our string
    # We want to replace <TAG ...> VALUE ...
    # with <TAG ... data-i18n="key"> VALUE ...
    
    pattern = r'(<[a-zA-Z0-9]+([^>]*?))>\s*(' + escaped_val + r')\s*(</[a-zA-Z0-9]+>)?'
    
    def replacer(match):
        tag_start = match.group(1)
        inner_content = match.group(3)
        close_tag = match.group(4) or ''
        
        # Don't add data-i18n if it already has one
        if 'data-i18n=' in tag_start:
            return match.group(0)
            
        global count
        count += 1
        return f'{tag_start} data-i18n="{key}">{inner_content}{close_tag}'

    html_new = re.sub(pattern, replacer, html, count=1)
    if html_new == html:
        # Sometimes the val spans multiple lines and regex fails because of it
        # Let's just do a simpler search: replace val with <span data-i18n="key">val</span>
        # BUT only if it is not inside an attribute (e.g. placeholder)
        # We can just skip if it's not found easily and we will check later.
        pass
    else:
        html = html_new

open('index_i18n.html', 'w', encoding='utf-8').write(html)
print(f"Injected {count} keys.")
