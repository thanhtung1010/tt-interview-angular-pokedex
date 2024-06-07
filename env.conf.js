const fs = require('fs');
const path = require('path');
const { env } = require('process');
const successColor = '\x1b[32m%s\x1b[0m';
const checkSign = '\u{2705}';
const dotenv = require('dotenv').config({path: 'src/.env'});

let envFile = fs.readFileSync('./src/environments/environment.prod.ts', 'utf-8');
const envConfig = process.env;

for (let field in envConfig) {

  if (envFile.includes(field)) {
    envFile = envFile.replace(field, envConfig[field]);
  }
}

const targetPath = path.join(__dirname, './src/environments/environment.prod.ts');
fs.writeFile(targetPath, envFile, (err) => {
    if (err) {
        console.error(err);
        throw err;
    } else {
        console.log(successColor, `${checkSign} Successfully generated environment.prod.ts`);
    }
});
