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
    const apiUrl = 'https://roobetconnect.com/affiliate/v2/stats?userId=2f895361-12b5-4266-b578-a10ea2c36895';
    const response = await fetch(apiUrl, {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJmODk1MzYxLTEyYjUtNDI2Ni1iNTc4LWExMGVhMmMzNjg5NSIsIm5vbmNlIjoiY2FkYWExOGQtMDc2My00MmY2LTkxZDEtMDMzYTJjZmU2MGVkIiwic2VydmljZSI6ImFmZmlsaWF0ZVN0YXRzIiwiaWF0IjoxNzI2MDE0Njc0fQ.YivdvQYS5wbM-y38z7hlZ_ia83ZLiUPz3u-uzHb3F5Y',
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    if (!Array.isArray(data)) {
      return res.status(500).json({ error: 'Unexpected response format from API', data });
    }
    res.json(data); // Send the data to the client
  } catch (error) {
    console.error('Error fetching affiliate stats:', error);
    res.status(500).json({ error: 'Error fetching affiliate stats' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
