import { DataTypes } from 'sequelize';
import sequelize from '../db'; 

const Customer = sequelize.define('Customer', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,  
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  preferredSize: {
    type: DataTypes.ENUM('S','M','X','XL','XXL'),
    allowNull: false,
  },
  preferredBrands: {  // New field (you will need a new table if it's many-to-many)
    type: DataTypes.JSONB,  // or use DataTypes.ARRAY(DataTypes.STRING) if it's just an array of strings
    allowNull: true,
  },
}, {
    tableName: 'customers', // Ensure Sequelize uses the correct table
    timestamps: false,      // Disable Sequelize's automatic creation of createdAt/updatedAt fields if not needed
  });


const Brand = sequelize.define('Brand', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,  
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
      tableName: 'brands',
      timestamps: false,     
    });
  

export { Customer, Brand };