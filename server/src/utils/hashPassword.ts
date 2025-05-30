import bcrypt from "bcrypt";
const generateHash = async (password: string) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashed = await bcrypt.hash(password, salt);
  return hashed;
};
export { generateHash };
