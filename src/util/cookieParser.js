const cookieParser = (rawCookies) => {
  const cookies = {};

  if (!rawCookies) {
    return cookies;
  }

  rawCookies.split(';').forEach(cookie => {
    const [name, value] = cookie.split('=');
    cookies[name.trim()] = value.trim();
  });

  return cookies;
};

module.exports = { cookieParser };
