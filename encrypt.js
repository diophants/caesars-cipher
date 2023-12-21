'use strict';

const fs = require('node:fs');
const { readFile, writeFile } = fs.promises;

const offset = process.argv[2] || 3;
const file = process.argv[3] || 'text-eng.txt';

console.log(offset, file);
const INCODERS = {
  eng: 'abcdefghijklmnopqrstuvwxyz',
  rus: 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя',
};

const idLanguage = (text) => {
  for (const el of text) {
    for (const key in INCODERS) {
      if (INCODERS[key].includes(el.toLowerCase()))
        return key;
    }
  }
};

function separation(text) {
  let arrText = text.split('');
  let chunks = [];
  let language = INCODERS[idLanguage(text.toLowerCase())];
  if (!language)
    throw Error('The cipher text is not valid');
  let allLanguages = Object.values(INCODERS).reduce(
    (acc, el) => acc + el
  );
  let index = -1;
  for (const el of arrText) {
    index++;
    if (
      !language.includes(el.toLowerCase()) &&
      allLanguages.includes(el.toLowerCase())
    ) {
      language = INCODERS[idLanguage(el.toLowerCase())];
      const chunk = arrText.slice(0, index);
      arrText = arrText.slice(index);
      chunks.push(chunk.reduce((acc, el) => acc + el));
      index = 0;
    }
  }
  chunks.push(arrText.reduce((acc, el) => acc + el));
  return chunks;
}

const handling = (text, offset) => {
  text = text.split('');
  const encoder = INCODERS[idLanguage(text)];
  const length = encoder.length;
  if (offset < 0) {
    offset += length;
  }
  const encryptText = text.map((el) => {
    let upperCase = false;
    let i = encoder.indexOf(el.toLowerCase());
    if (el.toLowerCase() !== el) upperCase = true;
    if (i === -1) return el;
    i += offset;
    i >= length ? (i -= length) : i;
    if (!encoder[i])
      throw Error('add to the list KEY_WORDS');
    if (upperCase) return encoder[i].toUpperCase();
    return encoder[i];
  });
  return encryptText.join('');
};

async function encrypt(offset, file) {
  let text = '';
  if (file.endsWith('.txt')) {
    text = await readFile(file, 'utf-8');
  } else {
    text = file;
  }
  const arrayText = separation(text);
  const encryptText = [];
  for (const chunk of arrayText) {
    const chunkCrypt = handling(chunk, offset);
    encryptText.push(chunkCrypt);
  }
  return encryptText.reduce((acc, el) => acc + el);
}

(async () => {
  const encryptText = await encrypt(Number(offset), file);
  writeFile('./cipher.txt', encryptText);

  console.log(
    `file ${file} ==== encryption ====> file cipher.txt`
  );
})();

module.exports = { encrypt, idLanguage, INCODERS };
