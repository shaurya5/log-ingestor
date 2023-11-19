require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { setupElasticsearch } = require('./db/elasticsearch');
const { indexLog, searchLogs, getAllLogs } = require('./db/queries');
const cors = require('cors')

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors())


setupElasticsearch();


app.post('/', async (req, res) => {
  try {
    const { body } = req;
    await indexLog(body);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all logs
app.get('/all-logs', async (req, res) => {
  try {
    const allLogs = await getAllLogs();
    res.json(allLogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Search logs with filters
app.get('/search', async (req, res) => {
  try {
    const filters = req.query;
    const response = await searchLogs(filters);
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
