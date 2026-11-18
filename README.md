# STONX English — A1 complete course

A free, complete A1 English course for Arabic speakers. English interface, Arabic help.

- 29 units in 4 parts (Starting · People & things · Everyday life · Past & future)
- Each unit has 7 ordered steps: Learn → Words → Practice → Listen → Speak → Read & Write → Unit test
- About 7,000 tap-only questions (no typing), flashcards, listening with slow mode, speaking check (Chrome), readings and guided writing
- Tools: My mistakes, Final A1 exam (60 questions), Irregular verbs table, Dictionary, Study plan
- Progress is saved in the browser (localStorage)

## Build

```sh
tools/build.sh        # src/*.js -> dist/a1.js, plus dist/local.html (everything inlined)
node tools/check.js   # validates every generated question
```

Open `dist/local.html` to use it offline. `index.html` is the hosted page.
