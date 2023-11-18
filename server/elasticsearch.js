require('dotenv').config();
const elasticsearch = require('@elastic/elasticsearch');
const fs = require('fs');

const client = new elasticsearch.Client({
  node: 'https://localhost:9200', // Your Elasticsearch server
  auth: {
    username: process.env.ELASTICSEARCH_USERNAME,
    password: process.env.ELASTICSEARCH_PASSWORD,
  },
  tls: {
    ca: fs.readFileSync('./static/http_ca.crt'),
    rejectUnauthorized: false,
  },
  requestTimeout: 60000,
});

const setupElasticsearch = async () => {
  try {
    const indexExists = await client.indices.exists({ index: 'logs' });

    if (!indexExists) {
      await client.indices.create({ index: 'logs' });
      console.log('Index created');
    } else {
      console.log('Index already exists');
    }
  } catch (err) {
    console.error('Error setting up Elasticsearch:', err.message);
  }
};

const indexLog = async (log) => {
  try {
    const {
      level,
      message,
      resourceId,
      timestamp,
      traceId,
      spanId,
      commit,
      metadata: { parentResourceId },
    } = log;

    await client.index({
      index: 'logs',
      body: {
        level,
        message,
        resourceId,
        timestamp,
        traceId,
        spanId,
        commit,
        metadata: {
          parentResourceId,
        },
      },
    });

    console.log('Log indexed successfully');
  } catch (err) {
    console.error('Error indexing log:', err.message);
  }
};

const searchLogs = async (filters) => {
  const query = buildQuery(filters);

  const response = await client.search({
    index: 'logs',
    body: { query },
  });

  return response.hits.hits;
};

const buildQuery = (filters) => {
  const mustClauses = Object.entries(filters).map(([key, value]) => {
    if (value) {
      return { match: { [key]: value } };
    }
    return { match_all: {} };
  });

  return {
    bool: {
      must: mustClauses,
    },
  };
};

const getAllLogs = async () => {
  try {
    const response = await client.search({
      index: 'logs',
      body: {
        query: {
          match_all: {},
        },
      },
    });

    return response.hits.hits;
  } catch (err) {
    console.error('Error getting all logs:', err.message);
    throw err;
  }
};

module.exports = {
  setupElasticsearch,
  indexLog,
  searchLogs,
  getAllLogs,
};
