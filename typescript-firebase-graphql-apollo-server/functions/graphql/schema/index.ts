import { gql } from 'apollo-server-express';
import { catsSchema } from "./cats";

const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
  type Subscription {
    _: Boolean
  }
`;

export const typeDefs = [linkSchema, catsSchema];