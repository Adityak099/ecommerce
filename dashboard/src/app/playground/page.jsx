"use client";
import { useState } from "react";

const page = () => {
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({});

  const addField = () => {
    setFields([...fields, { type: "text", name: "", label: "" }]);
  };

  const handleFieldChange = (index, key, value) => {
    const updatedFields = [...fields];
    updatedFields[index][key] = value;
    setFields(updatedFields);
  };

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <div>
      <h1>Form Builder</h1>
      <button onClick={addField}>Add Field</button>
      <form onSubmit={handleSubmit}>
        {fields.map((field, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Field Label"
              value={field.label}
              onChange={(e) =>
                handleFieldChange(index, "label", e.target.value)
              }
            />
            <select
              value={field.type}
              onChange={(e) => handleFieldChange(index, "type", e.target.value)}
            >
              <option value="text">Text</option>
              <option value="number">Number</option>
              <option value="email">Email</option>
            </select>
            <input
              type={field.type}
              placeholder={field.label}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
            />
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default page;
