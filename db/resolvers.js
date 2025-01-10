import { v4 as uuidv4 } from "uuid";
import { Customer, Brand } from "../models/types";

const resolvers = {
  getBrands: async () => {
    try {
      const brands = await Brand.findAll();
      if (!brands) {
        throw new Error(`Error fetching brands`);
      }
      return brands;
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching brands");
    }
  },
  getCustomer: async ({ id }) => {
    try {
      const customer = await Customer.findOne({ where: { id } });
      if (!customer) {
        throw new Error(`Customer with id ${id} not found`);
      }
      return customer;
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching customer");
    }
  },
  getCustomers: async () => {
    try {
      const customer = await Customer.findAll();
      if (customer.length === 0) {
        throw new Error(`Customer with id ${id} not found`);
      }
      return customer;
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching customer");
    }
  },
  addCustomer: async ({ input }) => {
    try {
      const newCustomer = await Customer.create({
        id: uuidv4(),
        name: input.name,
        email: input.email,
        address: input.address,
        age: input.age,
        preferredSize: input.preferredSize, // Correctly use the enum here
        preferredBrands: input.preferredBrands,
      });
      return `Customer added successfully with id: ${newCustomer.id}`;
    } catch (error) {
      console.error(error);
      return "Error adding customer";
    }
  },
};

export default resolvers;
