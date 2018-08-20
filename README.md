
# Paraphrase Sentences

## Generate multiple variations of your sentence.

This is a quick hack to generate multiple variations of the same sentence by
google-translating them back and forth into random languages.

For example, it takes the sentence "how is my laptop called?" and outputs
"what is the name of my laptop?".

Generating 10 variations of a medium-sized sentence (75 characters) costs
0.03 USD in Google Tranlate API costs.

## Basic example 

This takes a sentence in English (by default), generates up to 10 (by default) variations,
and removes duplicates (by default) from the results:

```js
let Paraphrase = require('paraphrase-sentences');
const key = '<INSERT YOUR GOOGLE TRANSLATE API KEY HERE>';

let paraphrase = new Paraphrase({ key });

(async () => {
  let results = await paraphrase.get('Nearly half Hong Kong flats rent for more than US$2,550 a month');
  console.log(results);
})();

// Outputs:
// [ 'Nearly half of Hong Kong\'s rental apartments exceed $ 2,550 a month.',
//  'More than half a Hong Kong rental costs more than US $ 2,550 per month.',
//  'Nearly half of Hong Kong Flats will rent more than US $ 2,550 a month.',
//  'Almost half of Hong Kong apartments for rent for more than $ 2,550 per month.',
//  'Nearly half of Hong Kong homes have earned more than $ 2.550 a month.',
//  'About half of the Hong Kong floors rented over US $ 2,550 a month.',
//  'Almost half Hong Kong ask for rent for more than $ 2,550 in a month.',
//  'Nearly half of Hong Kong costs more than $ 2,550 a month.',
//  'Nearly one of the Hong Kong Hong Kong taxpayers is $ 2.5,550 per month.',
//  'Almost half of the apartments in Hong Kong hire more than 2,550 US dollars a month.' ]

```

## Other constructor options

The constructor takes the following options, where only `key` is required.
Default values are listed below.

```js
let paraphrase = new Paraphrase({
  num: 10, // how many variations to generate
  key: null, // your API key
  lang: 'en', // language of your source sentence in the Google Translate format
  removeDuplicates: true, // whether to remove duplicate sentences in the results
});

```
