# Use the official Elasticsearch image from the Docker Hub
FROM docker.elastic.co/elasticsearch/elasticsearch:7.15.2

# Expose the default Elasticsearch ports
EXPOSE 9200

# Start Elasticsearch when the container starts
CMD ["elasticsearch"]