import React, { useEffect, useState } from "react";
import axios from "axios";
import LogTable from "../components/LogTable";
import { BounceLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const App = () => {
  const [logs, setLogs] = useState([]);
  const [filters, setFilters] = useState({
    level: "",
    message: "",
    resourceId: "",
    startDate: "",
    endDate: "",
    commit: "",
    parentResourceId: "",
    traceId: "",
    spanId: "",
  });

  const [loading, setLoading] = useState(true);
  const [filtersChanged, setFiltersChanged] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLogs();
  }, []);

  useEffect(() => {
    if (filtersChanged) {
      fetchLogs();
      setFiltersChanged(false);
    }
  }, [filters, filtersChanged]);

  const fetchLogs = async () => {
    try {
      if (filters.startDate !== "" && filters.endDate === "") {
        alert("End Date is required");
        return;
      }
      setLoading(true);
      const response = await axios.get("http://localhost:3000/search", {
        params: filters,
      });
      setLogs(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const handleFilterSubmit = () => {
    setFiltersChanged(true);
  };

  const handlePostSubmit = () => {
    navigate('/');
  }

  const handleClearSubmit = () => {
    setFilters({
      level: "",
      message: "",
      resourceId: "",
      startDate: "",
      endDate: "",
      commit: "",
      parentResourceId: "",
      traceId: "",
      spanId: "",
    });
    setFiltersChanged(true);
  };

  return (
    <div className="container p-6 min-h-screen bg-gray-900 flex flex-col min-w-screen">
      <h1 className="text-4xl font-bold w-fit m-auto mb-4 text-white">
        Filter Queries
      </h1>
      <div className="flex flex-row space-x-4">
        <div
          className="sticky top-10 h-full flex flex-col space-y-3"
          style={{ minWidth: "200px" }}
        >
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            placeholder="Filter by level"
            value={filters.level}
            onChange={(e) => handleFilterChange("level", e.target.value)}
          />
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            placeholder="Filter by message"
            value={filters.message}
            onChange={(e) => handleFilterChange("message", e.target.value)}
          />
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Filter by resourceId"
            value={filters.resourceId}
            onChange={(e) => handleFilterChange("resourceId", e.target.value)}
          />
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Filter by commit"
            value={filters.commit}
            onChange={(e) => handleFilterChange("commit", e.target.value)}
          />
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Filter by startTime"
            value={filters.startDate}
            onChange={(e) => handleFilterChange("startDate", e.target.value)}
          />
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Filter by endTime"
            value={filters.endDate}
            onChange={(e) => handleFilterChange("endDate", e.target.value)}
          />
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Filter by traceId"
            value={filters.traceId}
            onChange={(e) => handleFilterChange("traceId", e.target.value)}
          />
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Filter by spanId"
            value={filters.spanId}
            onChange={(e) => handleFilterChange("spanId", e.target.value)}
          />
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Filter by parentResourceId"
            value={filters.parentResourceId}
            onChange={(e) =>
              handleFilterChange("parentResourceId", e.target.value)
            }
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleFilterSubmit}
          >
            Filter
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={handleClearSubmit}
          >
            Clear Filters
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded"
            onClick={handlePostSubmit}
          >
            Post Query
          </button> 
        </div>

        <div className="flex-grow">
          {loading ? (
            <BounceLoader className="m-auto mt-[10rem]" color="#36d7b7" />
          ) : (
            <LogTable logs={logs} />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
