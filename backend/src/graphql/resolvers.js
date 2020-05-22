import Developer from "../models/developer";

let showTimeoutError = false;

const resolvers = {
  Query: {
    hello: () => "hi",
    welcome: () => "Welcome to GraphQL",
    getName: (_, { name }) => "Welcome " + name,

    developers: async () => {
      const response = await Developer.find()
        .then(result => {
          return result;
        })
        .catch(err => response.push({ message: "Something was wrong" }));
      return response;
    },

    developer: async (_, { id }) => {
      const response = await Developer.findById(id)
        .then(result => {
          return result;
        })
        .catch(err => response.push({ message: "Something was wrong" }));
      return response;
    }
  },

  ResponseFindDev: {
    __resolveType: source => (source.message ? "ErrorDeveloper" : "Developer")
  },

  Mutation: {
    createDeveloper: async (_, { input }) => {
      const newDeveloper = new Developer(input);
      await newDeveloper.save();
      const response = await Developer.find();
      return response;
    },

    deleteDeveloper: async (_, { id }) => {
      await Developer.findByIdAndDelete(id);
      const response = await Developer.find();
      return response;
    },

    updateDeveloper: async (_, { id, input }) => {
      await Developer.findByIdAndUpdate(id, input);
      const response = await Developer.find();
      return response;
    },

    deleteAllDevelopers: async (_, { id }) => {
      const response = await Developer.deleteMany({});
      return "Removed";
    },

    register: () => {
      let error = {};
      if (showTimeoutError) {
        error = { reason: "too many requests", seconds: 180 };
      } else {
        error = { field: "email", msg: "already taken" };
      }
      showTimeoutError = !showTimeoutError;
      return error;
    }
  },

  Error: {
    __resolveType: obj => {
      console.log(obj);
      if (obj.reason) {
        return "TimeoutError";
      }

      if (obj.field) {
        return "ValidationError";
      }

      return null;
    }
  }
};

export default resolvers;
