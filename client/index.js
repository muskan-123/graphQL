import React from "react";
import ReactDOM from "react-dom/client"; // Updated import for React 18

import App from './App'

// Use React 18's createRoot instead of render
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
