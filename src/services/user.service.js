import User from '../models/user.model';
const bcrypt = require('bcrypt');
import jwt from 'jsonwebtoken';


export const newUser = async (body) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashPassword = await bcrypt.hash(body.password, salt);
  body.password = hashPassword;
  const data = await User.create(body);
  console.log("DATA:",data);;
  return data;
};

export const login = async (body) => {
  const data = await User.findOne({ email: body.email });
  console.log("email",data)
  if (data == null) {
    throw new Error("User doesnt exist");
  } else {
    const result = await bcrypt.compare(body.password,data.password);
    if (result) {
      var token = jwt.sign({"firstname": data.firstname,"id":data._id,"email":data.email}, process.env.SECRET_KEY);
      return token;
    }
    else {
      throw new Error("Incorrect Password");
    }
  }
};
