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
    completed: Boolean
    steps: [Step]!
  }

type Step {
  _id: ID
  stepText: String
  completed: Boolean
  createdAt: String
  substeps: [Substep]!
}

type Substep {
  _id: ID
  ssText: String
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
    step(stepId: ID!): Step
    me: User
  }
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addProject (title: String!, description: String!, projectAuthor: String!, completed: Boolean!): Project
    removeProject(projectId: ID!): Project
    completedProject(projectId: ID!, completed: Boolean!): Project
    updateProject(projectId: ID!, title: String!, description: String!): Project
    addStep (projectId: ID!, stepText: String!, completed: Boolean!): Project
    deleteStep (projectId: ID!, stepId: ID!): Project 
    updateStep (projectId: ID!, stepId: ID!, stepText: String!): Project
    completedStep (projectId: ID!, stepId: ID!, completed: Boolean!): Project
    addSubstep(ssText: String!, stepId: ID!, completed: Boolean!): Substep
  }`
;

 module.exports = typeDefs;

