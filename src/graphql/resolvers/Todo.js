import Todo from "../../models/Todo";
import User from "../../models/User";

const createTodo = async (_, args) => {
  const newTodo = new Todo(args.createTodoInput);
  const owner = await User.findById(args.createTodoInput.userId);
  newTodo.owner = owner;
  await newTodo.save();
  owner.todos.push(newTodo);
  await owner.save();
  return newTodo;
};

const updateTodo = async (_, args) => {
  const updatedTodo = await Todo.findByIdAndUpdate(
    args.todoId,
    args.updateTodoInput,
    { new: true }
  );
  return updatedTodo;
};

const deleteTodo = async (_, args) => {
  const deletedTodo = await Todo.findByIdAndRemove(args.todoId);
  await User.update(
    { _id: deleteTodo.owner },
    { $pull: { todos: deleteTodo.id } }
  );
  return deletedTodo;
};

const todo = async (_, args) => {
  const todo = await Todo.findById(args.todoId);
  return todo;
};

const todos = async () => {
  const todos = await Todo.find({});
  return todos;
};

export default {
  Query: {
    todo,
    todos
  },
  Mutation: {
    createTodo,
    deleteTodo,
    updateTodo
  },
  Todo: {
    owner: async parent => {
      const user = await User.findOne({ _id: parent.owner });
      return user;
    }
  }
};
