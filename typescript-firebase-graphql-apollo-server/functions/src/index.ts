import * as functions from "firebase-functions";
const express = require("express");
import { ApolloServer } from "apollo-server-express";
import { resolvers } from "../graphql/resolvers/index";
import { typeDefs } from "../graphql/schema/index";

const app = express();

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app, path: "/", cors: true });

/* Change the region as you want */
export const graphql = functions.region("europe-west1").https.onRequest(app);
