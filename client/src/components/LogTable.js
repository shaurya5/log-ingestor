const renderCellValue = (value) => {
  if (typeof value === 'object' && value !== null) {
    return Object.entries(value).map(([key, val]) => (
      <div key={key}>
        <strong>{key}:</strong> {renderCellValue(val)}
      </div>
    ));
  }
  return value;
};

const LogTable = ({ logs }) => {
  if (logs.length === 0) {
    return <h2 className="w-fit m-auto text-white">No logs available.</h2>;
  }

  const headers = ["_source"]

  return (
    <table className="min-w-full bg-white border border-gray-300">
      <thead>
        <tr>
          {headers.map((header) => (
            <th
              key={header}
              className="border border-gray-300 px-4 py-2 font-bold"
            >
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
                {renderCellValue(log[header])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LogTable;
