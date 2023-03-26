import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      },
    },
`;

export const QUERY_PROJECT = gql`
query Project($projectId: ID!) {
  project(projectId: $projectId) {
    _id
    description
    projectAuthor
    completed
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

export const QUERY_USERS = gql`
query Users {
  users {
    _id
    email
    username
    projects {
      title
      _id
      description
      completed
      projectAuthor
      steps {
        _id
        completed
        createdAt
        stepText
      }
    }
  }
}
`;


export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      projects {
      title
      _id
      description
      completed
      projectAuthor
      steps {
        _id
        completed
        createdAt
        stepText
      }
    }
  }
}
`;