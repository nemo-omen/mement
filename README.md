# Mement
## CS3311 Final Project

### Markdown Notebook
#### Features
- user management (log in etc)
- Doc, docx, pdf upload/preview/conversion
- document management (CRUD)
  - markdown/contenteditable
  - autosave (after 10s of inactivity, every 1 min otherwise)
  - side-by-side preview
  - backlinks?(nice-to-have -- maybe not for the class version)
  - citations, annotations?
  - WYSYWIG styling?
- directories? (tree structure - how to store in SQL? -- children(0-M), parent(M-1))
  - record type would be dir: 
 ```js
Directory {
  name: String,
  children: String[],
  parent: Directory{}
}

Note {
  name: String,
  parent: Directory{},
  contents: MDAST Node{},
  owner: User{}
}
 ```
- drag/drop file organization?(nice-to-have)

#### Routes


`/` Client-side app

`get(/notes)` - get notes

`get(/notes/:id)` - get note

`put(/notes/:id)` - update note

`delete(/notes/:id)` - delete note

`delete(/notes/)` - delete all notes

### Notes/Resources:

[Using promises with mysql queries](https://darifnemma.medium.com/how-to-interact-with-mysql-database-using-async-await-promises-in-node-js-9e6c81b683da)

[Database seeding in Node js](https://levelup.gitconnected.com/database-seeding-in-node-js-2b2eec5bfaa1)

[Svelte RealWorld](https://github.com/sveltejs/realworld)

__You just paid for this, may as well use it!__
[Fullstack Svelte](https://www.newline.co/courses/fullstack-svelte/fullstack-svelte-course-overview)