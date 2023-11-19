import React from 'react';

const renderCellValue = (key, value) => {
  if (key === 'metadata.parentResourceId') {
    return (
      <div>
        <strong>metadata.parentResourceId:</strong> {value}
      </div>
    );
  }

  if (typeof value === 'object' && value !== null) {
    return Object.entries(value).map(([innerKey, innerValue]) => (
      <div key={innerKey}>
        <strong>{innerKey}:</strong> {renderCellValue(innerKey, innerValue)}
      </div>
    ));
  }

  return value;
};

const LogTable = ({ logs }) => {
  if (logs.length === 0) {
    return <h2 className="w-fit m-auto text-white">No logs available.</h2>;
  }

  const headers = Object.keys(logs[0]._source);

  return (
    <table className="min-w-full border border-gray-300 text-white rounded-lg border-separate">
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header} className="border border-gray-300 px-4 py-2 font-bold">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {logs.map((log, index) => (
          <tr key={index}>
            {headers.map((header) => (
              <td key={header} className="border border-gray-300 px-4 py-2">
                {renderCellValue(header, log._source[header])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LogTable;
