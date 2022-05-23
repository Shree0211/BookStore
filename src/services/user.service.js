import User from '../models/user.model';
const bcrypt = require('bcrypt');


export const newUser = async (body) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashPassword = await bcrypt.hash(body.password, salt);
  body.password = hashPassword;
  const data = await User.create(body);
  console.log("DATA:",data);;
  return data;
};
