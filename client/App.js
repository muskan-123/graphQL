import React, { useState, useEffect } from "react";
import "./css";

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    preferredBrands: [],
    preferredSize: "",
  });

  const brands = ["Nike", "Adidas", "Puma", "Reebok", "Under Armour","Zara"];
  const sizes = ["S", "M", "L", "XL",'XXL'];

  const handleBrandSelection = (brand) => {
    setFormData((prev) => ({
      ...prev,
      preferredBrands: prev.preferredBrands.includes(brand)
        ? prev.preferredBrands.filter((b) => b !== brand)
        : [...prev.preferredBrands, brand],
    }));
  };

  const handleSizeSelection = (size) => {
    setFormData((prev) => ({
      ...prev,
      preferredSize: prev.preferredSize === size ? "" : size,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
              query getCustomers {
                getCustomers {
                  id
                  name
                  email
                }
              }
            `,
          }),
        });
        const result = await response.json();
        console.log("GraphQL Response:", result); // Debug the response
        if (result.errors) {
          throw new Error(result.errors[0].message);
        }
        setLoading(false);
        setData(result.data.getCustomers);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="app-background">
      <div className="container">
        <div className="whiteBackgroundDiv">
          <h1 className="title">Welcome to Shopaholic</h1>
          <h2 className="description">Your one stop for various brands sale</h2>
          {/* Name Field */}
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleInputChange}
            className="text-field"
          />

          {/* Email Field */}
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            className="text-field"
          />

          {/* Preferred Brands */}
          <div className="field">
            <h4 className="label">Preferred Brands:</h4>
            <ul className="brand-list">
              {brands.map((brand) => (
                <li
                  key={brand}
                  className={`brand-item ${
                    formData.preferredBrands.includes(brand) ? "selected" : ""
                  }`}
                  onClick={() => handleBrandSelection(brand)}
                >
                  {brand}
                </li>
              ))}
            </ul>
          </div>

          {/* Preferred Size */}
          <div className="field">
            <h4 className="label">Preferred Size:</h4>
            <div className="size-buttons">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`size-button ${
                    formData.preferredSize === size ? "selected" : ""
                  }`}
                  onClick={() => handleSizeSelection(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* <h1>Items</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <strong>{item.name}</strong>
            <h2>{' '+item.email}</h2>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default App;
