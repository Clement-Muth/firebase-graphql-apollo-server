const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const serviceAccount = require('./serviceAccount.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://<DATABASE-NAME>.firebasedatabase.app/',
});

const typeDefs = gql`
  type Cat {
    name: String
    lifespan: String
  }

  type Query {
    cats: [Cat]
  }
`;

const resolvers = {
  Query: {
    cats: () => {
      return admin
        .database()
        .ref('cats')
        .once('value')
        .then((snap) => snap.val())
        .then((val) => Object.keys(val).map((key) => val[key]));
    },
  },
};

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app, path: '/', cors: true });

/* Change the region as you want */
exports.graphql = functions.region('europe-west1').https.onRequest(app);
