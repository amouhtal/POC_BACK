import * as crypto from 'crypto';

const encryptWithAES = (text) => {
  const passphrase = '123';
  const hash = crypto
    .createHmac('sha256', passphrase)
    .update(text)
    .digest('hex');
  return hash;
};
