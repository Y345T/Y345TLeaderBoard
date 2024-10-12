import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors'; // Import cors package

const app = express();
const port = 3000; // You can change this port number if needed

// Enable CORS for all routes
app.use(cors());

// Serve static files like index.html from the public directory
app.use(express.static('public'));

// Proxy endpoint to fetch leaderboard data
app.get('/api/leaderboard', async (req, res) => {
  try {
    const apiUrl = 'https://roobetconnect.com/affiliate/v2/stats?userId=2f895361-12b5-4266-b578-a10ea2c36895'; // Replace this with your real API URL
    const response = await fetch(apiUrl, {
      headers: {
        'Authorization': 'Bearer YOUR_BEARER_TOKEN', // Replace this with your real token
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    console.log('API Response:', data); // Log the full API response to check structure

    // Send the data to the client
    res.json(data); 
  } catch (error) {
    console.error('Error fetching affiliate stats:', error);
    res.status(500).json({ error: 'Error fetching affiliate stats' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
