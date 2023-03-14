const { gql } = require('apollo-server-express');

const typeDefs = gql` 
  type User {
    _id: ID
    username: String
    email: String
    password: String
    projects: [Project]!
  }

  type Project {
    _id: ID
    title: String
    description: String
    projectAuthor: String
    steps: [Step]!
  }

type Step {
  _id: ID
  stepText: String
  completed: Boolean
  createdAt: String
}

  type Auth {
    token: ID!
    user: User
  }
  type Query {
    users: [User]
    user(userId: ID!): User
    project (projectId: ID!): Project
    me: User
  }
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addProject (title: String!, description: String!, projectAuthor: String!): Project
    removeProject(projectId: ID!): Project
    updateProject(projectId: ID!, title: String!, description: String!): Project
    addStep (projectId: ID!, stepText: String!, completed: Boolean!): Project
    deleteStep (projectId: ID!, stepId: ID!): Project 
    updateStep (projectId: ID!, stepId: ID!, stepText: String!, completed: Boolean!): Project
  }`
;

 module.exports = typeDefs;

