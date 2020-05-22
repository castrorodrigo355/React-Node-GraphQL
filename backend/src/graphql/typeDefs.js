const typeDefs = `
  
  type Query {
    hello: String
    welcome: String!
    getName(name: String!): String!
    developers: [Developer!]!
    developer(id: String!): Developer!
  }
  
  type Mutation {
    createDeveloper(input: InputDeveloper): [Developer!]!
    deleteDeveloper(id: String!): [Developer!]!
    updateDeveloper(id: String!, input: InputDeveloper): [Developer!]!
    deleteAllDevelopers(id: String!): String!
    register: Error
  }
  
  type Developer {
    _id: ID!
    name: String!
    language: String!
    tech: String!
  }

  input InputDeveloper {
    name: String!
    language: String!
    tech: String!
  }

  type ErrorDeveloper {
    message: String
  }

  union ResponseFindDev = Developer | ErrorDeveloper
  

  type ValidationError {
    field: String
    msg: String
  }

  type TimeoutError {
    reason: String
    seconds: Int
  }

  union Error = ValidationError | TimeoutError


`;

export default typeDefs;
