import fs from 'fs';
import magu from 'magu';
import anchor from '../dist/magu-plugin-anchor';

magu({}, [anchor({
  transformID(text) {
    if (text === 'え') {
      return 'e';
    }
    return text;
  }
})])
  .process(`${__dirname}/example.md`)
  .then(result => {
    console.log(result.html);
    fs.writeFileSync(`${__dirname}/index.html`, result.html, 'utf-8');
  });
