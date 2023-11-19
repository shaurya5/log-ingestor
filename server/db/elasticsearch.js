require('dotenv').config();
const elasticsearch = require('@elastic/elasticsearch');
const fs = require('fs');

const client = new elasticsearch.Client({
  node: 'https://localhost:9200',
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

module.exports = {
  client,
  setupElasticsearch,
};
