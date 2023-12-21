QUICK START
run encrypt: node encrypt.js 3 'hello world!'
run decrypt: node decrypt.js

ENCRYPT

1. Создайте файл <my-name>.txt и поместите в него любой вразумительный текст не менее 100 символов. Можно на разных языках (укр, рус, англ)

2. Выполните команду для шифрования текста:
   node encrypt.js <number> <my-name>.txt
   <number> - число смещения по шифру Цезаря
   <my-name>.txt - название файла с текстом

В файле cipher.txt вы получите зашифрованный текст

DECRYPT

1. Выполните команду node dectypt.js

В файле hacking.txt появится результат взлома текста

SETTINGS
Если взлом не удался, пополните список KEY_WORD, дополнительными часто используемыми словами, в файле decrypt.js.

Что бы определить недостающее слово выполните шифрование без смещения:
node encrypt.js 0 <my-name>.txt

в консоле, в поле "keyWord" отобразиться недостающее слово
