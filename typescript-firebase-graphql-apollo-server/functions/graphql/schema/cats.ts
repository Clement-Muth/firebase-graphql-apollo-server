import { gql } from "apollo-server-express";

export const catsSchema = gql`
  extend type Query {
    getCats(name: String!): [Cat]
  }

  type Cat {
    name: String
    lifespan: String
    description: String
    weight: String
  }
`;
