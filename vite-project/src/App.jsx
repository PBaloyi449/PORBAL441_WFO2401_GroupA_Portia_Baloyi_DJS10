import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // State to hold the fetched posts
  const [posts, setPosts] = useState([]);
  // State to hold any error messages
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch posts from the API
    const fetchPosts = async () => {
      try {
        // Make a GET request to fetch posts
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');

        // Check if the response is not ok
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        // Parse the JSON data from the response
        const data = await response.json();
        // Set the fetched posts to the state
        setPosts(data);
      } catch (error) {
        // If there is an error, set the error message to the state
        setError(error.message);
      }
    };

    // Call the fetchPosts function to fetch posts when the component mounts
    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Blog Posts</h1>
      {/* Display error message if there is an error */}
      {error ? (
        <div className="card">
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      ) : (
        // Display the list of posts if there is no error
        <div className="card">
          {posts.map((post, index) => (
            <div key={post.id}>
              <h2>{`${index + 1}. ${post.title}`}</h2>
              <p>{post.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
