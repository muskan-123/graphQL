import express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./db/schema";
import resolvers from "./db/resolvers";
import path from "path";
import cors from "cors";

import sequelize from './db'; 

sequelize.sync({ force: false })
  .then(() => {
    console.log('Database & tables have been created');
  })
  .catch((error) => {
    console.error('Error creating database tables:', error);
  });

const PORT = 8080;

const app = express();


app.use(cors());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

app.use(
  "/graphql",
  graphqlHTTP({
    schema, // GraphQL schema
    rootValue: resolvers, // Resolvers for GraphQL queries/mutations
    graphiql: true, // Enable GraphiQL for interactive API exploration
  })
);

// Route to serve an HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Fallback route for non-matching requests
app.use((req, res) => {
  res.status(404).send("Page not found");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`GraphQL API available at http://localhost:${PORT}/graphql`);
});