const fs = require('fs');
['part1', 'part2'].forEach(part => {
  let p = `src/data/b1-regularverbs-${part}.ts`;
  let c = fs.readFileSync(p, 'utf8');
  // Match urdu: "...", accounting for \r\n
  c = c.replace(/urdu:\s*"(.*?)"\r?\n\s*\}/g, 'urdu: "$1",\n    category: \'Regular Verbs\',\n    level: \'B1\'\n  }');
  fs.writeFileSync(p, c);
});
console.log('Done format');
