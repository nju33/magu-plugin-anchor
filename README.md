# magu-plugin-anchor

[Magu](https://github.com/nju33/magu) plugin to headline anchorify

[![Build Status](https://travis-ci.org/nju33/magu-plugin-anchor.svg?branch=master)](https://travis-ci.org/nju33/magu-plugin-anchor) [![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

## Install

```bash
yarn add magu-plugin-anchor
npm install magu-plugin-anchor
```

## Usage

```js
magu({}, [anchor({
  // Below is the default value
  icon: true,
  selector: 'h1,h2,h3,h4,h5,h6',
  anchorTemplate: '<a class="md__anchor" href="#{text}">{icon} {text}</a>',
  iconOptions: {
    class: 'md__anchor-icon md__anchor--level-{level}'
  },
  transformID: voca.kebabCase
})])
  .process(`${__dirname}/path/to/file.md`)
  .then(result => console.log(result.html));
```

### Options

- `icon`(default: `true`)
  <div>Whether to display link icon (using <a href="https://octicons.github.com/icon/link/">octicon</a>)</div>
- `selector`(default: `h1,h2,h3,h4,h5,h6`)
  <div>Specify the selector to process</div>
- `anchorTemplate`(default: `<a class="md__anchor" href="#{text}">{icon} {text}</a>`)
  <div>Specify template of a tag</div>
  this is using [sindresorhus/pupa](https://github.com/sindresorhus/pupa), and it's using like `pupa(options.anchorTemplate, {text, icon})`
- `iconOptions`(defualt: `iconOptions: {class: 'md__anchor-icon md__anchor--level-{level}'}`)
  <div>Specify svg options of Octicons</div>
  Refer to around [octicons#class](https://www.npmjs.com/package/octicons#class)
- `transformID`(default: [voca.kebabCase](https://vocajs.com/#kebabCase))
  <div>Specify this when you want to change the headline text and the id value to be set</div>
  (e.g.) `transformID(id) {return 'foo'}`

## Example

Will compile of this content

```md
# a
## i
### u
#### え
##### お

```

```js
magu({}, [anchor({
  transformID(text) {
    return text === 'え' ? 'e' : text;
  }
})])
  .process(`${__dirname}/example.md`)
  .then(result => console.log(result.html));
```

result like this

```html
<svg xmlns="http://www.w3.org/2000/svg">
  <symbol id="link"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"/></symbol>
</svg>
<h1 id="a"><a class="md__anchor" href="#a"><svg version="1.1" width="16" height="16" viewbox="0 0 16 16" class="octicon octicon-link md__anchor-icon md__anchor--level-1" aria-hidden="true"><use xlink:href="#link"/></svg> a</a></h1>
<h2 id="i"><a class="md__anchor" href="#i"><svg version="1.1" width="16" height="16" viewbox="0 0 16 16" class="octicon octicon-link md__anchor-icon md__anchor--level-2" aria-hidden="true"><use xlink:href="#link"/></svg> i</a></h2>
<h3 id="u"><a class="md__anchor" href="#u"><svg version="1.1" width="16" height="16" viewbox="0 0 16 16" class="octicon octicon-link md__anchor-icon md__anchor--level-3" aria-hidden="true"><use xlink:href="#link"/></svg> u</a></h3>
<h4 id="e"><a class="md__anchor" href="#e"><svg version="1.1" width="16" height="16" viewbox="0 0 16 16" class="octicon octicon-link md__anchor-icon md__anchor--level-4" aria-hidden="true"><use xlink:href="#link"/></svg> え</a></h4>
<h5 id="お"><a class="md__anchor" href="#お"><svg version="1.1" width="16" height="16" viewbox="0 0 16 16" class="octicon octicon-link md__anchor-icon md__anchor--level-5" aria-hidden="true"><use xlink:href="#link"/></svg> お</a></h5>
```

## License

The MIT License (MIT)
Copyright (c) 2016 nju33 <nju33.ki@gmail.com>
