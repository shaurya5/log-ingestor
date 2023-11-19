const TextAreaDark = ({ value, onChange }) => {
  return (
    <textarea
      className="bg-gray-800 text-white p-4 w-fit h-fit"
      value={value}
      onChange={onChange}
      rows={12}
      cols={40}
      placeholder="Enter your query here"
    />
  );
};

export default TextAreaDark;