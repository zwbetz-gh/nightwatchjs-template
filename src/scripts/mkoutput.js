const fs = require('fs');
const path = require('path');
const env = require('../shared/env');

const main = () => {
  const outputDir = path.resolve(
    process.cwd(),
    env.getEnv().NIGHTWATCH_OUTPUT_FOLDER
  );
  const outputSubDirs = [
    path.resolve(outputDir, 'report'),
    path.resolve(outputDir, 'screenshots')
  ];
  for (const dir of outputSubDirs) {
    console.log(`Making dir ${dir}`);
    fs.mkdirSync(dir, {recursive: true});
  }
};

main();
