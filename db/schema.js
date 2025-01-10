import { buildSchema } from "graphql";

const schema = buildSchema(`
    type Brand {
        name: String
    }

    enum Size {
        S
        M
        X
        XL
    }

    type Customer {
        id: String
        name: String
        email: String
        age: String
        address: String
        preferredSize: Size
        preferredBrands: [Brand]
    }

    input BrandInput {
        name: String
    }

    input CustomerInput {
        name: String
        email: String
        age: String
        address: String
        preferredSize: Size
        preferredBrands: [BrandInput]
    }

    type Query {
        getCustomer(id: String!): Customer
        getCustomers: [Customer]
        getBrands: [Brand]
    }

    type Mutation {
        addCustomer(input: CustomerInput): String
    }
`);

export default schema;
