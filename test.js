let Paraphrase = require('./index');
const key = '<INSERT YOUR GOOGLE TRANSLATE API KEY HERE>';

let paraphrase = new Paraphrase({ key });

(async () => {
  let results = await paraphrase.get('Nearly half Hong Kong flats rent for more than US$2,550 a month.');
  console.log(results);
})();