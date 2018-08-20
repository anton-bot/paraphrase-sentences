/**
 * Generates slight variations of a sentence.
 */

'use strict';

const Google = require('google-translate');

const LANGUAGES = require('./languages');

const DEFAULT_OPTIONS = {
  num: 10,
  key: null,
  lang: 'en',
  removeDuplicates: true,
};

/** Maximum number of sentences to generate, equal to number of languages supported by Google. */
const MAX_NUM = Math.min(LANGUAGES.NMT.length, LANGUAGES.PBMT.length);

class Paraphrase {
  constructor(options) {
    this.options = Object.assign({}, DEFAULT_OPTIONS, options);

    if (this.options.num > MAX_NUM) {
      this.options.num = MAX_NUM;
    }

    this._results = {};
    this.google = Google(this.options.key);
  }

  async get(text) {
    let randomLanguages = this._selectRandomLanguages();
    let promises = [];
    this._results[text] = [];
    for (let i = 0; i < this.options.num; i++) {
      promises.push(this._getVariation(randomLanguages[i], text));
    }
    await Promise.all(promises);

    // Copy results and clear internal results for possible next 
    let results = this._results[text].slice();
    this._results[text] = [];

    if (this.options.removeDuplicates) {
      results = [...new Set(results)];
    }

    return results;
  }

  _askGoogle(text, to, from) {
    return new Promise((resolve, reject) => {
      this.google.translate(text, from, to, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.translatedText);
        }
      });
    });
  }

  _selectRandomLanguages() {
    // NMT supports only English.
    let languages = JSON.parse(JSON.stringify(this.options.lang === 'en' ? LANGUAGES.NMT : LANGUAGES.PBMT));
    let selected = [];
    for (let i = 0; i < this.options.num; i++) {
      let randomIndex = Math.floor(Math.random() * languages.length);
      selected.push(languages[randomIndex]);
      languages.splice(randomIndex, 1);
    }
    return selected;
  }

  async _getVariation(targetLanguage, text) {
    try {
      let translated1 = await this._askGoogle(text, targetLanguage, this.options.lang);
      let translated2 = await this._askGoogle(translated1, this.options.lang, targetLanguage);
      this._results[text].push(translated2);
    } catch (error) {
      console.log('Error in paraphrase-sentences, ignoring:', error);
    }
  }
}

module.exports = Paraphrase;