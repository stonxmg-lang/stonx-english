#!/bin/sh
# Concatenate sources into dist/a1.js
cd "$(dirname "$0")/.." && mkdir -p dist
cat src/be_learn.js src/vocab_base.js src/be_gen.js src/a1_pre.js src/a1_data.js src/a1_gen.js src/units1.js src/units2.js src/a1_ui.js > dist/a1.js
echo "built dist/a1.js $(wc -c < dist/a1.js) bytes"
# local test page with the bundle inlined
python3 - <<'PY'
s=open('src/shell.html').read();js=open('dist/a1.js').read()
open('dist/local.html','w').write(s.replace('<!--SCRIPT-->','<script>\n'+js+'\n</script>'))
PY
