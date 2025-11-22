const CODE_REGEX = /^[A-Za-z0-9]{6,8}$/;

function isValidCode(code) {
  return CODE_REGEX.test(code);
}

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

module.exports = { isValidCode, isValidUrl };
