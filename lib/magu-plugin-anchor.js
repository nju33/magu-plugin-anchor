import pupa from 'pupa';
import voca from 'voca';
import octicons from 'octicons';

const defaultOpts = {
  icon: true,
  selector: 'h1,h2,h3,h4,h5,h6',
  anchorTemplate: '<a class="md__anchor" href="#{text}">{icon} {text}</a>',
  iconOptions: {
    class: 'md__anchor-icon md__anchor--level-{level}'
  },
  transformID: voca.kebabCase
};
export {defaultOpts};

export default function anchor(opts = {}) {
  opts = Object.assign({}, defaultOpts, opts);
  return $ => {
    const $selectors = $(opts.selector);
    $selectors.each((idx, elem) => {
      const $elem = $(elem);
      const text = $elem.text();
      let icon = null;
      $elem.empty();

      if (opts.icon) {
        const symbol = generateSymbol(idx, octicons.link);
        if (symbol) {
          $.root().prepend(symbol);
        }
        const clonedOpts = Object.assign({}, opts.iconOptions);
        clonedOpts.class = pupa(clonedOpts.class, {
          level: getLevel($elem[0].name)
        });
        icon = octicons.link.toSVGUse(clonedOpts);
      }

      const $a = $(pupa(opts.anchorTemplate, {icon, text})).appendTo($elem);

      if (typeof opts.transformID === 'function') {
        const id = opts.transformID(text);
        $elem.attr('id', id);
        $a.attr('href', `#${id}`);
      } else {
        const id = text;
        $elem.attr('id', id);
        $a.attr('href', `#${text}`);
      }
    });
    return $;
  };
}

function getLevel(name) {
  const matches = name.match(/\d+/);
  if (matches) {
    return Number(matches[0]);
  }
}
export {getLevel};

function generateSymbol(idx, {symbol, path}) {
  if (idx !== 0) {
    return null;
  }
  return `
<svg xmlns="http://www.w3.org/2000/svg">
  <symbol id="${symbol}">${path}</symbol>
</svg>
  `.trim();
}
export {generateSymbol};
