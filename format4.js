const fs = require('fs');
['part1', 'part2'].forEach(part => {
  let p = `src/data/b1-regularverbs-${part}.ts`;
  let c = fs.readFileSync(p, 'utf8');
  c = c.replace(/verb:/g, "word:");
  c = c.replace(/english:/g, "translation:");
  fs.writeFileSync(p, c);
});
console.log('Done rename');
