import Message from "../../models/Message";

const Query = {
  welcome: () => "Welcome to GraphQL",
  getName: (_, { name }) => "Welcome " + name,
  messages: async () => await Message.find(),
  message: async (_, { id }) => await Message.findById(id)
};

export default Query;
