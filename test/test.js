import fs from 'fs';
import test from 'ava';
import {stub} from 'sinon';
import marked from 'marked';
import cheerio from 'cheerio';
import octicons from 'octicons';
import anchor, {getLevel, generateSymbol} from '../dist/magu-plugin-anchor';

const md = fs.readFileSync(`${__dirname}/fixtures.md`, 'utf-8');

test('getLevel', t => {
  const result = getLevel('h1');
  t.is(result, 1);
});

test('if idx is 0, return html', t => {
  const result = generateSymbol(0, octicons.link);
  t.truthy(result);
});

test('if idx isnt 0, return null', t => {
  const result = generateSymbol(1, octicons.link);
  t.falsy(result);
});

test('default', t => {
  const $ = cheerio.load(marked(md));
  const result = anchor()($, cheerio);

  t.is(cheerio.load(result.html())('symbol').length, 1);
  t.is(cheerio.load(result.html())('h1').attr('id'), 'a-a');
  t.is(cheerio.load(result.html())('h1 > a').attr('href'), '#a-a');
  t.is(cheerio.load(result.html())('.octicon-link').length, 1);
});

test('disabled icon', t => {
  const $ = cheerio.load(marked(md));
  const result = anchor({icon: false})($, cheerio);

  t.is(cheerio.load(result.html())('.octicon-link').length, 0);
});

test('disabled h1 selector', t => {
  const $ = cheerio.load(marked(md));
  const result = anchor({selector: 'h2'})($, cheerio);

  t.is(cheerio.load(result.html())('h1 > a').length, 0);
});

test('Setting custom anchorTemplate', t => {
  const $ = cheerio.load(marked(md));
  const result = anchor({
    anchorTemplate: '<a class="md__foo" href="#{text}">{icon} {text}</a>'
  })($, cheerio);

  t.is(cheerio.load(result.html())('.md__anchor').length, 0);
  t.is(cheerio.load(result.html())('.md__foo').length, 1);
});

test('Setting icon class', t => {
  const $ = cheerio.load(marked(md));
  const result = anchor({
    iconOptions: {
      class: 'md__foo'
    }
  })($, cheerio);

  t.is(cheerio.load(result.html())('.md__anchor-icon').length, 0);
  t.is(cheerio.load(result.html())('.md__foo').length, 1);
});

test('Setting transformID', t => {
  const _stub = stub().returns('foo');
  const $ = cheerio.load(marked(md));
  const result = anchor({transformID: _stub})($, cheerio);

  t.is(cheerio.load(result.html())('h1#foo').length, 1);
  t.is(cheerio.load(result.html())('h1 > a[href="#foo"]').length, 1);
});
