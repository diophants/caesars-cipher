QUICK START

## run encrypt: node encrypt.js 3 'hello world!'

## run decrypt: node decrypt.js

## RUS

Этот код содержит в себе алгоритм "Шифр Цезаря". Он принимает текст и каждую букву сдвигает в соответствии его алфивита.

Дешифратор работает иначе. Он сканирует текст, находит часто используемые комбинации символов, сопоставляет эти комбинации с часто используемыми словами, находит число сдвига и с помощью того же алгаритма "Шифр Цезаря" делает обратный сдвиг. На выходе получается расшифрованный текст без исходного ключа

Encrypt:

1. Создайте файл <my-name>.txt и поместите в него любой вразумительный текст не менее 100 символов. Можно на разных языках (рус, англ)

2. Выполните команду для шифрования текста:
   node encrypt.js <number> <my-name>.txt
   <number> - число смещения по шифру Цезаря
   <my-name>.txt - название файла с текстом

В файле cipher.txt вы получите зашифрованный текст

Decrypt:

1. Выполните команду node dectypt.js

В файле hacking.txt появится результат взлома текста

Settings:
Если взлом не удался, пополните список KEY_WORD, дополнительными часто используемыми словами, в файле decrypt.js.

Что бы определить недостающее слово выполните шифрование без смещения:
node encrypt.js 0 <my-name>.txt

В консоле, в поле "keyWord" отобразиться недостающее слово

## ENG

This code contains the Caesar Cipher algorithm. He accepts the text and shifts each letter according to his alphabet.

The decoder works differently. It scans the text, finds frequently used character combinations, matches these combinations with frequently used words, finds the shift number and uses the same algarithm "Caesar Cipher" to reverse the shift. The output is a decrypted text without the original key

Encrypt:

1. Create a <my-name>.txt file and put any intelligible text of at least 100 characters in it. It is possible in different languages (rus, eng)

2. Run the command to encrypt the text:
   node encrypt.js <number> <my-name>.txt
   <number> - is the offset number according to the Caesar cipher
   <my-name>.txt - the name of the file with the text

In the file cipher.txt you will receive an encrypted text

Decrypt:

1. Run the node command dectypt.js

In the file hacking.txt the result of the text hacking will appear

Settings:
If the hack failed, add additional frequently used words to the KEY_WORD list in the file decrypt.js .

To identify the missing word, perform encryption without offset:
node encrypt.js 0 <my-name>.txt

In the console, the missing word will be displayed in the "keyWord" field
