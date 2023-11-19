const { client } = require("./elasticsearch");

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
      index: "logs",
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

    console.log("Log indexed successfully");
  } catch (err) {
    console.error("Error indexing log:", err.message);
  }
};

const searchLogs = async (filters) => {
  const query = buildQuery(filters);

  const response = await client.search({
    index: "logs",
    body: { query },
  });

  return response.hits.hits;
};

const containsFields = ["message"] // fields which dont require an exact keyword match

const buildQuery = (filters) => {
  const mustClauses = Object.entries(filters).map(([key, value]) => {
    if (key === "startTimestamp" && value) {
      return { range: { timestamp: { gte: value } } };
    }
    if (key === "endTimestamp" && value) {
      return { range: { timestamp: { lte: value } } };
    }
    if (containsFields.includes(key) && value) {
      return { match: { [key]: { query: value, operator: "and" } } };
    }
    if (value) {
      return { term: { [key + ".keyword"]: value } };
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
      index: "logs",
      body: {
        query: {
          match_all: {},
        },
      },
    });

    return response.hits.hits;
  } catch (err) {
    console.error("Error getting all logs:", err.message);
    throw err;
  }
};

module.exports = {
  indexLog,
  searchLogs,
  getAllLogs,
};
