
import crypto from "crypto-js";

const key = "makuro";
export const encrypt = (text: string) => {
  return crypto.AES.encrypt(text, key).toString();
};

export const decrypt = (text: string) => {
  return crypto.AES.decrypt(text, key).toString(crypto.enc.Utf8);
};

const encrypted = encrypt("AIzaSyAFDyA-Fvp4agjWr3KWicuvkXN8Ru-TYUw")
console.log(encrypted)

const decrypted = decrypt(encrypted)
console.log(decrypted)
