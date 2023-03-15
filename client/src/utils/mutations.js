import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_PROJECT = gql`
 mutation Mutation($title: String!, $description: String!, $projectAuthor: String!) {
  addProject(title: $title, description: $description, projectAuthor: $projectAuthor) {
    _id
    description
    projectAuthor
    title
    steps {
      stepText
      createdAt
      completed
      _id
    }
  }
}
`;

export const UPDATE_PROJECT = gql`
mutation Mutation($projectId: ID!, $title: String!, $description: String!) {
  updateProject(projectId: $projectId, title: $title, description: $description) {
    _id
    description
    projectAuthor
    title
    steps {
      stepText
      createdAt
      completed
      _id
    }
  }
}
`;


export const REMOVE_PROJECT = gql`
mutation RemoveProject($projectId: ID!) {
  removeProject(projectId: $projectId) {
    _id
    description
    projectAuthor
    title
    steps {
      _id
      completed
      createdAt
      stepText
    }
  }
}
`;


export const ADD_STEP = gql`
mutation($projectId: ID!, $stepText: String!, $completed: Boolean!) {
  addStep(projectId: $projectId, stepText: $stepText, completed: $completed) {
    description
    projectAuthor
    _id
    title
    steps {
      stepText
      createdAt
      completed
      _id
    }
  }
}
`;

export const UPDATE_STEP = gql`
mutation UpdateStep($projectId: ID!, $stepId: ID!, $stepText: String!, $completed: Boolean!) {
  updateStep(projectId: $projectId, stepId: $stepId, stepText: $stepText, completed: $completed) {
    _id
    description
    projectAuthor
    title
    steps {
      stepText
      createdAt
      completed
      _id
    }
  }
}
`;

export const DELETE_STEP = gql`
mutation Mutation($projectId: ID!, $stepId: ID!) {
  deleteStep(projectId: $projectId, stepId: $stepId) {
    _id
    description
    projectAuthor
    title
    steps {
      _id
      createdAt
      stepText
      completed
    }
  }
}
`;

