const fs = require('fs');
const yaml = require('js-yaml');

const minifyHtml = (html) => html.replaceAll(/^ +/gm, '').replaceAll('\n', '');
const redirectTemplate = fs.readFileSync('.template.html', 'utf8');
const familyTemplate = fs.readFileSync('family.template.html', 'utf8');

const familyYaml = fs.readFileSync('family.yaml', 'utf8');
const familyData = yaml.load(familyYaml);

Object.entries(familyData).forEach(([key, value]) => {
  const htmlContent = minifyHtml(
    redirectTemplate.replace('DESCRIPTION_PLACEHOLDER', value)
  );
  fs.writeFileSync(`${key}.html`, htmlContent);
  console.log(`Generated ${key}.html with description: ${value}`);
});

const listItems = [`
      <li>
        <a href="/">/</a>
        <ul><li>自分で調べることはとても重要です。人に聞く前に一度検索してみやがれください。</li></ul>
      </li>
`];

Object.entries(familyData).forEach(([key, value]) => {
  listItems.push(`
      <li>
        <a href="${key}">${key}</a>
        <ul><li>${value}</li></ul>
      </li>
  `);
});

const familyHtmlContent = minifyHtml(
  familyTemplate.replace('LIST_ITEMS_PLACEHOLDER', listItems.join(''))
);
fs.writeFileSync('family.html', familyHtmlContent);
console.log('Generated family.html');
