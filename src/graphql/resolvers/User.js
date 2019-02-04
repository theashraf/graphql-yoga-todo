import User from "../../models/User";
import Todo from "../../models/Todo";

const createUser = async (_, args) => {
  const newUser = new User({ ...args.createUserInput });
  await newUser.save();
  return newUser;
};
const updateUser = async (_, args) => {
  const updatedUser = await User.findByIdAndUpdate(
    args.userId,
    args.updateUserInput,
    { new: true }
  );
  return updatedUser;
};
const deleteUser = async (_, args) => {
  const deletedUser = await User.findByIdAndRemove(args.userId);
  await Todo.remove({ owner: args.userId });
  return deletedUser;
};
const user = async (_, args) => {
  const user = await User.findById(args.userId);
  return user;
};
const users = async () => {
  const users = await User.find({});
  return users;
};

export default {
  Query: {
    user,
    users
  },
  Mutation: {
    createUser,
    deleteUser,
    updateUser
  },
  User: {
    todos: async parent => {
      const userId = parent.id;
      const todos = await Todo.find({ owner: userId });
      return todos;
    }
  }
};
