const { ApolloServer, gql } = require("apollo-server");

// setup schema in type definitions
// create an enumeration type (Conditions)
// add an input type (addDayInput)
// add a custom scaler (date)
const typeDefs = gql`
scaler Date,
scaler Email,
scaler URL

type SkiDay {
    id: ID!
    date: String!
    mountain: String!
    conditions: Conditions
}

enum Conditions {
    POWDER
    HEAVY
    ICE
    THIN
}

type Query {
    totalDays: Int!
    allDays: [SkiDay!]!
}
input AddDayInput {
    date: String!
    mountain: String!
    conditions: Conditions
}

type RemoveDayPayLoad {
    day: SkiDay!
    removed: Boolean
    totalBefore: Int
    totalAfter: Int
}

type Mutation {
        addDay(input: AddDayInput!): SkiDay
    removeDay(id: ID!): RemoveDAyPayLoad!
}
`;

const mocks = {
    Date: () => "1/2/2025",
    String: () => "set some cool data",
    Query: () => ({
        allDays: () => new MockList(8)
    })
}

// return the data from the server
const resolvers = {};

// setup mock data to be returned  
const server = new ApolloServer({
  typeDefs,
  mocks
});

// create the server and start on localhost using 'npm start'
server.listen().then(({ url }) => console.log(`server running at ${url}`));
