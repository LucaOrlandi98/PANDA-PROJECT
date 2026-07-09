# Temporary Site Modes

Usa [src/data/temporarySite.ts](C:/Users/orlan/Desktop/PANDA-PROJECT/src/data/temporarySite.ts) come fonte unica per le modifiche temporanee del sito.

Modalita disponibili:

- `ripristino`: sito completo, senza rimozioni temporanee.
- `oscura`: applica le rimozioni temporanee elencate nel preset `oscura`.

Alias chat/comando:

- `ripristina`: equivale a `ripristino`.

Comandi disponibili:

- `npm run site:ripristina`
- `npm run site:ripristino`
- `npm run site:oscura`

Quando serve aggiornare le rimozioni temporanee, modifica solo il preset `oscura` in `src/data/temporarySite.ts`.
