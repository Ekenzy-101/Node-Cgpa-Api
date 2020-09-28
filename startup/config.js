module.exports = () => {
  if (!process.env.SECRET_KEY) {
    throw new Error("SECRET_KEY is not defined.");
  }
};
