const generateId = () => {
  const date = new Date();
  return date.getTime().toString();
};

module.exports = { generateId };
