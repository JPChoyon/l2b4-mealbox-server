import { TUser } from './user.interface';
import { UserModel } from './user.model';

const createUserInDB = async (payload: TUser) => {
  const result = await UserModel.create(payload);
  return result;
};
const findAllUserInDB = async () => {
  const result = await UserModel.find();
  return result;
};
const findUserByEmail = async (email: string) => {
  return await UserModel.findOne({ email });
};
const findAUserInDB = async (id: string) => {
  const result = await UserModel.findById(id);
  return result;
};

export const userServices = {
  findAllUserInDB,
  createUserInDB,
  findAUserInDB,
  findUserByEmail,
};
