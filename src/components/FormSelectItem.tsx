export const SelectComponent = ({ options, onChange, value }) => {
  const handleChange = (e) => {
    const selectedValue = e.target.value;
    onChange(selectedValue);
  };

  return (
    <select value={value} onChange={handleChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};