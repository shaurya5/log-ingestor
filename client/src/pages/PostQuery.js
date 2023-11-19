import React, { useState } from "react";
import TextAreaDark from "../components/TextAreaDark";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const PostQuery = () => {
  const notifySuccess = () => {
    toast.success("Query Posted Successfully!");
  };

  const notifyError = () => {
    toast.error("Error while posting query!");
  };

  const [sampleQuery] = useState(
    JSON.stringify(
      {
        level: "error",
        message: "Failed to connect to DB",
        resourceId: "server-1234",
        timestamp: "2023-09-15T08:00:00Z",
        traceId: "abc-xyz-123",
        spanId: "span-456",
        commit: "5e5342f",
        metadata: {
          parentResourceId: "server-0987",
        },
      },
      null,
      2
    )
  );

  const [customQuery, setCustomQuery] = useState("");

  const handleCustomQueryChange = (event) => {
    setCustomQuery(event.target.value);
  };

  const handleSampleSubmit = async () => {
    console.log("Sample Query Submitted");
    try {
      const data = await axios.post(
        "http://localhost:3000/logs",
        JSON.parse(sampleQuery)
      );
      notifySuccess();
    } catch (err) {
      console.log(err);
      notifyError();
    }
  };

  const handleCustomSubmit = async () => {
    console.log("Custom Query Submitted");
    try {
      const data = await axios.post(
        "http://localhost:3000/",
        JSON.parse(customQuery)
      );
      notifySuccess();
    } catch (err) {
      console.log(err);
      notifyError();
    }
  };

  const handleFilterSubmit = () => {
    navigate("/filter-queries");
  };

  const navigate = useNavigate();

  return (
    <div className="flex flex-row justify-center items-center h-screen bg-gray-900">
      <div className="flex flex-col items-center w-[20] p-8 bg-gray-700 rounded-lg">
        <h2 className="text-4xl text-white mb-4">Post Query</h2>
        <div className="flex flex-row space-x-10">
          <div className="mb-4 w-full flex flex-col">
            <p className="text-gray-400 mb-2">Sample Query:</p>
            <TextAreaDark value={sampleQuery} onChange={() => {}} readOnly />
            <button
              className="bg-blue-300 rounded-lg w-[10rem] m-auto mt-3 h-[2rem]"
              onClick={handleSampleSubmit}
            >
              Post Sample Query
            </button>
          </div>
          <div className="w-full flex flex-col">
            <p className="text-gray-400 mb-2">Custom Query:</p>
            <TextAreaDark
              value={customQuery}
              onChange={handleCustomQueryChange}
            />
            <button
              className="bg-blue-300 rounded-lg w-[10rem] m-auto mt-3 h-[2rem]"
              onClick={handleCustomSubmit}
            >
              Post Custom Query
            </button>
          </div>
        </div>
        <button
          className="bg-red-300 rounded-lg w-[10rem] m-auto mt-3 h-[2rem]"
          onClick={handleFilterSubmit}
        >
          Filter Queries
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PostQuery;
