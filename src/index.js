import { GraphQLServer } from "graphql-yoga";
import uuid from "uuid/v4";
import bcrypt from "bcryptjs";

const users = [];
const todos = [];

const server = new GraphQLServer({
  typeDefs: `
	input CreateUserInput{
		username: String!
		password: String!
	}
	input UpdateUserInput{
		username: String!
		password: String!
	}
	type Todo{
		id: ID!
		title: String!
		description: String!
		owner: User!
	}
	type User{
		id: ID!
		username: String!
		password: String!
		todos: [Todo!]!
	}
	type Mutation{
		createUser(createUserInput: CreateUserInput!): User!
		updateUser(updateUserInput: UpdateUserInput): User!
		deleteUser(userId: ID!): User!
		deleteTodo(todoId: ID!): Todo!
	}
	type Query{
		 users: [User!]!
		 user(userId: ID!): User!
		 todos: [Todo!]!
		 todo(todoId: ID!): Todo!
	}
	`,
  resolvers: {
    Query: {
      users: () => {
        return users;
      },
      user: (_, { userId }) => {
        const foundUser = users.find(user => user.id === userId);
        if (!foundUser) throw new Error("user not found");
        return foundUser;
      }
    },
    Mutation: {
      createUser: async (_, { createUserInput: { username, password } }) => {
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = {
          id: uuid(),
          username,
          password: hashedPassword,
          todos: []
        };
        users.push(newUser);
        return newUser;
      }
    }
  }
});

server.start({ port: 3000 }, ({ port }) => {
  console.log(`server started at port ${port}`);
});
