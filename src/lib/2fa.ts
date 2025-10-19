export const generate2FACode = () => {
  // 6-digit numeric code
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const codeExpiryTime = () => {
  // expires in 5 minutes
  const expires = new Date();
  expires.setMinutes(expires.getMinutes() + 5);
  return expires;
};
