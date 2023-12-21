const {
  encrypt,
  idLanguage,
  INCODERS,
} = require('./encrypt.js');

const fs = require('fs');
const { readFile, writeFile } = fs.promises;

const KEY_WORDS = {
  eng: ['the', 'and', 'of', 'a', 'hello'],
  rus: ['и', 'на', 'что'],
};

keyWordSearch = (obj) => {
  let repeat = 0;
  let keyWord = '';
  for (const key in obj) {
    const arr = obj[key];
    arr.forEach((el) => {
      let r = 0;
      let w = el;
      arr.forEach((el) => {
        if (w === el) r++;
      });
      if (r > repeat) {
        repeat = r;
        keyWord = w;
      }
    });
  }
  console.log({ keyWord });
  // console.log({ keyWord, repeat });
  return keyWord;
};

const createChanks = (encryptText) => {
  let chunks = encryptText.toLowerCase().split(' ');
  const language = {};
  chunks.forEach((el) => {
    el.replace(/[\r\n\s\d.,]{1,30}(.){0,30}/, '');
    const lang = language[idLanguage(el)] || [];
    lang.push(el);
    language[idLanguage(el)] = lang;
  });
  if (language['undefined']) delete language['undefined'];
  return language;
};

const decrypt = (key, keyWords) => {
  //index crypt
  const alphabet = INCODERS[idLanguage(key)].split('');
  const keys = key.split('');
  const crypt = [];
  keys.forEach((k) => {
    alphabet.forEach((el, i) => {
      if (el === k) crypt.push(i);
    });
  });

  //index decrypt
  const decrypt = [];
  keyWords.forEach((word) => {
    const letters = word.split('');
    const index = letters.map((letter) => {
      return alphabet.indexOf(letter);
    });
    decrypt.push(index);
  });

  for (const word of decrypt) {
    if (word.length !== crypt.length) continue;
    let count = [];
    word.forEach((el, i) => {
      const index = crypt[i] - el;
      if (index >= 0) count.push(index);
      else count.push(index + alphabet.length);
    });
    let found = count.every((el) => el === count[0]);
    if (found) return 0 - count[0];
    count = [];
    word.forEach((el, i) => {
      const index = el + crypt[i];
      if (index <= alphabet.length) count.push(index);
      else count.push(index - alphabet.length);
    });
    found = count.every((el) => el === count[0]);

    if (found) return count[0];
  }
};

const calculateOffset = (key) => {
  const language = idLanguage(key);
  switch (language) {
    case 'rus':
      return decrypt(key, KEY_WORDS.rus);
      break;
    case 'eng':
      return decrypt(key, KEY_WORDS.eng);
      break;
  }
};

(async () => {
  const encryptText = await readFile(
    './cipher.txt',
    'utf-8'
  );
  const language = createChanks(encryptText);
  console.log('language sorting...');
  const keyWord = keyWordSearch(language);
  console.log('set keyWord...');
  const offset = calculateOffset(keyWord);
  console.log('set offset: ', offset);
  const decryptText = await encrypt(offset, encryptText);
  writeFile('./hacking.txt', decryptText);
  console.log(
    `file cipher.txt ==== decryption ====> file hacking.txt`
  );
})();
