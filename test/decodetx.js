
const sha256 = require('js-sha256')     // npm install --save js-sha256
const str = "9QHwYl3uCkKoo2GaChSZJzgfJipBqEpJke3ik3ZoqwAu7xIUF87YVG5/Uq/qviYfazwU42UL3/MaEAoFdWF0b20SBzQ3NzU0MjASEAoKCgV1YXRvbRIBMRCgjQYaagom61rphyEDhmX++MzcN7Nn6Q7OiZyGifpCJfw48u4/YKY3+d2WxHoSQHhm5W7cW5s5mEfgVb7YUTZhDWM9+Y7w2i2twPKc2N/KDTheT5+xlRMnJFrAQWlkhnR3SIzS8aKgEq8vU/8ag5kiLWNvc21vczF6bDhkczRydzBhZjJsNjQ3eWMwa2swcTV1ZGpzaGhsbmM2MmNmZw=="
const encode = sha256(Buffer.from(str, 'base64'))
// const encode = Buffer.from(str, 'base64')

console.log(encode)
console.log(encode.length)
