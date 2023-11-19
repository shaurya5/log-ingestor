# Log Ingestor and Query Interface

## Overview
A log ingestor system that can efficiently handle vast volumes of log data and a query interface that can be used for posting and filtering the queries. Both the programs have been made using Javascript. 

## Technology used
1. ***Node.js*** for the backend
2. ***Elastic Search*** for querying
3. ***ReactJS*** for the frontend query interface
4. ***Docker*** for containerization

## Implementation
To ensure scalility and efficiency of the backend system, Elastic Search has been used that uses indexing and sharding to efficiently search through huge volumes of data. 
A query can be posted either through the web interface or a POST request can be made to `http://localhost:3000/`. 

## Features implemented
1. Filters made based on all the parameters present in the request body
2. For the message filter, a search can be made using any substring within the message body. For the other parameters, the search word has to be exact as those are unique fields/keywords 
3. Search within specific timestamps has been implemented
4. Multiple filters can be combined for results
5. Real time log ingestion and searching can be done

## How to run
Run `.\script.sh` in the root directory

## Future Work
1. Role-based access to the query interface can be implemented
2. Utilizing regex for searching