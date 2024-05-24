import bcrypt from "bcrypt";

/**
 * Hash a plain password
 * @param {string} plainPassword - The plain password to hash
 * @returns {Promise<string>} - The hashed password
 */

async function hash(plainPassword) {
  const salt = await bcrypt.genSalt(8);
  const hashedPassword = await bcrypt.hash(plainPassword, salt);
  return hashedPassword;
}
/**
 * 
 * @param {string} plainPassword The plain password to compare
 * @param {string} hashedPassword - The hashed password to compare against
 * @returns {Promise<boolean>} - A boolean indicating if the plain password matches the hashed password
 */
async function compare(plainPassword, hashedPassword) {
  const isMatching = await bcrypt.compare(plainPassword, hashedPassword);
  return isMatching;
}

export default { hash, compare };