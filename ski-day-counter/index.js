const { 
    ApolloServer,
    gql,
    MockList
 } = require("apollo-server");

// setup schema in type definitions
// create an enumeration type (Conditions)
// add an input type (addDayInput)
// add a custom scalar (date)
// add a custom mocks date and string 
// generate a random value in the mocks list to return
// set up a subscription (though we won't finish it in this lesson!)

const typeDefs = gql`
scalar Date
scalar Email
scalar URL

"""
an object that describes the cheracteristis of a ski day
"""
type SkiDay {
        "A ski day's unique identifier"
    id: ID!
        "The date a ski day occured"
    date: Date!
        "The location a ski day occured"
    mountain: String!
        "The conditions for the ski day"
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
    date: Date!
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
    removeDay(id: ID!): RemoveDayPayLoad!
}
type Subscription {
    newDay: SkiDay!
}
`;

const mocks = {
    Date: () => "1/2/2025",
    String: () => "set some cool data",
    Query: () => ({
        allDays: () => new MockList([1, 5])
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
