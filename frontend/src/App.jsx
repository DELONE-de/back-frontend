// App.js
import React, { useState, useEffect } from 'react';

// Main App component
const App = () => {
  // State to store the message fetched from the backend
  const [message, setMessage] = useState('');
  // State to manage loading status
  const [loading, setLoading] = useState(true);
  // State to manage any errors during API call
  const [error, setError] = useState(null);

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    // Define the URL of your Express backend API
    // Ensure this matches the port your Express server is running on
    const backendUrl = 'http://localhost:5000/api/message';

    const fetchMessage = async () => {
      try {
        // Make an asynchronous request to the backend
        const response = await fetch(backendUrl);

        // Check if the response was successful
        if (!response.ok) {
          // If not successful, throw an error
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the JSON response
        const data = await response.json();
        // Update the message state with the data from the backend
        setMessage(data.message);
      } catch (err) {
        // Catch and handle any errors that occur during the fetch operation
        console.error("Failed to fetch message:", err);
        setError(err.message); // Set the error message
      } finally {
        // Set loading to false once the fetch operation completes (either success or error)
        setLoading(false);
      }
    };

    // Call the fetchMessage function
    fetchMessage();
  }, []); // The empty dependency array ensures this effect runs only once after initial render

  return (
    // Main container for the app with Tailwind CSS for centering and styling
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          React Frontend
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Communicating with Express Backend
        </p>

        {loading && (
          // Display loading message while data is being fetched
          <p className="text-blue-500 text-xl animate-pulse">
            Loading message from backend...
          </p>
        )}

        {error && (
          // Display error message if fetching failed
          <p className="text-red-600 text-xl">
            Error: {error}
          </p>
        )}

        {/* Display the message once it's loaded and no error occurred */}
        {!loading && !error && (
          <div className="border-2 border-dashed border-purple-300 p-4 rounded-md bg-purple-50">
            <p className="text-2xl font-semibold text-purple-700">
              {message}
            </p>
          </div>
        )}

        <p className="mt-8 text-sm text-gray-500">
          Ensure your Express backend is running on `http://localhost:5000`.
        </p>
      </div>
    </div>
  );
};

export default App;

// --- Instructions to run this frontend ---
// 1. Make sure you have Node.js and npx installed.
// 2. Create a new folder for your frontend (e.g., `frontend`).
// 3. Navigate into that folder in your terminal: `cd frontend`
// 4. Create a new React app (if you haven't already):
//    `npx create-react-app .` (the dot means create in the current directory)
//    If you prefer Vite: `npm create vite@latest . -- --template react`
// 5. Install Tailwind CSS (if using `create-react-app`):
//    `npm install -D tailwindcss postcss autoprefixer`
//    `npx tailwindcss init -p`
//    Then, configure `tailwind.config.js` and `index.css` or `App.css` as per Tailwind docs.
//    (For Vite, Tailwind setup is slightly different, usually done via `npm install -D tailwindcss postcss autoprefixer` and then `npx tailwindcss init -p`, configuring `tailwind.config.js` and importing `index.css` in `main.jsx`).
// 6. Replace the content of `src/App.js` with the code above.
// 7. Make sure `index.css` (or `App.css`) includes the Tailwind directives:
/*
@tailwind base;
@tailwind components;
@tailwind utilities;
*/
// 8. In `public/index.html` (for create-react-app) or `index.html` (for Vite),
//    add the Google Fonts link in the <head> section for 'Inter':
/*
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
<style>
  body {
    font-family: 'Inter', sans-serif;
  }
</style>
*/
// 9. Run the React development server: `npm start` (for create-react-app) or `npm run dev` (for Vite).
//    It will typically open at http://localhost:3000.
