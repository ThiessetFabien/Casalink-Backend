import bcrypt from "bcrypt";

async function hash(plainPassword) {
  const salt = await bcrypt.genSalt(8);
  const hashedPassword = await bcrypt.hash(plainPassword, salt);
  return hashedPassword;
}

async function compare(plainPassword, hashedPassword) {
  const isMatching = await bcrypt.compare(plainPassword, hashedPassword);
  return isMatching;
}

export default { hash, compare };