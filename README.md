# GraphQL Server Using Firebase Functions

### Description
How to setup GraphQL using firebase functions.
This example app demonstrate how to use firebase cloud functions with graphql query using apollo server express.

## What's [GraphQL](https://graphql.org/)

GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.

## What's [Firebase Cloud Functions](https://firebase.google.com/docs/functions) ?

Cloud Functions for Firebase is a serverless framework that lets you automatically run backend code in response to events triggered by Firebase features and HTTPS requests. Your JavaScript or TypeScript code is stored in Google's cloud and runs in a managed environment. There's no need to manage and scale your own servers.

## What's [Apollo Client](https://www.apollographql.com/docs/react/) ?

Apollo Client is a comprehensive state management library for JavaScript that enables you to manage both local and remote data with GraphQL. Use it to fetch, cache, and modify application data, all while automatically updating your UI.

## QuickStart

NOTE: I recommend you to know basics of [firebase CLI](https://firebase.google.com/docs/cli) and setting up Node projects.

### ◯ Step 1

Create a Firebase project !

You can get the firebase command by installing `firebase tools` globally

```bash
# npm
$ sudo npm install -g firebase-tools

# yarn
$ sudo yarn add firebase-tools -W
```

```bash
$ firebase init
```

Then choose functions and finish the configuration

```bash
◯ Functions: Configure and deploy Cloud Functions
```

### ◯ Step 2

#### Install node modules & apollo server express dependencies

Go to your functions directory

```bash
$ cd functions

# npm
$ npm install && npm install apollo-server-express express graphql

# yarn
$ yarn add apollo-server-express express graphql -W
```

### ◯ Step 3

Let's set up firebase admin

```js
const admin = require("firebase-admin");

// To generate a private key file for your service account:
// 1. In the Firebase console, open Settings > Service Accounts.
// 2. Click Generate New Private Key, then confirm by clicking Generate Key.
// 3. Add the JSON file in the `functions` directory

const serviceAccount = require('./serviceAccount.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://<DATABASE-NAME>.firebasedatabase.app/',
});
```

### ◯ Step 4

#### Construct a gql schema

import gql from apollo-server-express and create a variable called typeDefs for your schema:

```js
const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql`
  type Cat {
    name: String
    lifespan: String
  }

  type Query {
    cats: [Cat]
  }
`;
```

### ◯ Step 5

#### Now the resolver

It will create the query and call your database

```js
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
```

### ◯ Step 6

#### Connecting schema and resolvers to Apollo Server

```js
const express = require('express');

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app, path: '/', cors: true });

/* Change the region as you want */
exports.graphql = functions.region('europe-west1').https.onRequest(app);
```

### ◯ Finally

#### Let's check if it work locally

```bash
firebase serve
```

Maybe you'll have to specify the right url
![screencapture-localhost-5000-gql-test-123-europe-west1-graphql-2021-03-19-14_03_29](https://user-images.githubusercontent.com/58605856/111784674-f70cb880-88bb-11eb-8c2e-d1565a98f0cb.png)
