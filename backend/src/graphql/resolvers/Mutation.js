import Message from "../../models/Message";

const Mutation = {
  createMessage: async (_, { input }) => {
    const newMessage = new Message(input);
    await newMessage.save();
    const response = await Message.find();
    return response;
  },
  deleteMessage: async (_, { id }) => {
    await Message.findByIdAndDelete(id);
    const response = await Message.find();
    return response;
  },
  updateMessage: async (_, { id, input }) => {
    await Message.findByIdAndUpdate(id, input);
    const response = await Message.find();
    return response;
  },
  deleteAllMessages: async (_, { id }) => {
    const response = await Message.deleteMany({});
    return "Removed";
  }
};

export default Mutation;
