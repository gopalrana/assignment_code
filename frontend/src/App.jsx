import React, { useState } from "react";

const availableFields = [
  { type: "text", label: "Name", name: "name" },
  { type: "radio", label: "Gender", name: "gender", options: ["Male", "Female"] },
  { type: "checkbox", label: "Hobbies", name: "hobbies", options: ["Cricket", "Music", "Reading"] },
];

const App = () => {
  const [formFields, setFormFields] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [submittedData, setSubmittedData] = useState(null); // new state

  const onDragStart = (e, field) => {
    e.dataTransfer.setData("field", JSON.stringify(field));
  };

  const onDrop = (e) => {
    e.preventDefault();
    const field = JSON.parse(e.dataTransfer.getData("field"));

    if (!formFields.find((f) => f.name === field.name)) {
      setFormFields([...formFields, field]);
    }
  };

  const handleChange = (e, field) => {
    const { name, value, checked, type } = e.target;

    if (type === "checkbox") {
      const currentValues = formValues[name] || [];
      const updated = checked
        ? [...currentValues, value]
        : currentValues.filter((v) => v !== value);

      setFormValues({ ...formValues, [name]: updated });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      const data = await response.json();
      console.log("Submitted & Received:", data);
      setSubmittedData(data);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div style={{ display: "flex", padding: 20 }}>
      {/* Sidebar */}
      <div style={{ width: "30%", paddingRight: 20 }}>
        <h3>Drag These</h3>
        {availableFields.map((field, i) => (
          <div
            key={i}
            draggable
            onDragStart={(e) => onDragStart(e, field)}
            style={{
              border: "1px solid #ccc",
              padding: 10,
              marginBottom: 10,
              cursor: "grab",
              backgroundColor: "#f9f9f9",
            }}
          >
            {field.label}
          </div>
        ))}
      </div>

      {/* Form Area */}
      <div
        style={{
          width: "70%",
          minHeight: 300,
          border: "2px dashed #aaa",
          padding: 20,
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
      >
        <h3>Form Area</h3>
        <form onSubmit={handleSubmit}>
          {formFields.map((field, i) => {
            if (field.type === "text") {
              return (
                <div key={i} style={{ marginBottom: 15 }}>
                  <label>{field.label}: </label>
                  <input
                    type="text"
                    name={field.name}
                    onChange={(e) => handleChange(e, field)}
                  />
                </div>
              );
            } else if (field.type === "radio") {
              return (
                <div key={i} style={{ marginBottom: 15 }}>
                  <label>{field.label}: </label>
                  {field.options.map((opt, j) => (
                    <label key={j} style={{ marginLeft: 10 }}>
                      <input
                        type="radio"
                        name={field.name}
                        value={opt}
                        onChange={(e) => handleChange(e, field)}
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              );
            } else if (field.type === "checkbox") {
              return (
                <div key={i} style={{ marginBottom: 15 }}>
                  <label>{field.label}: </label>
                  {field.options.map((opt, j) => (
                    <label key={j} style={{ marginLeft: 10 }}>
                      <input
                        type="checkbox"
                        name={field.name}
                        value={opt}
                        onChange={(e) => handleChange(e, field)}
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              );
            } else {
              return null;
            }
          })}

          {formFields.length > 0 && (
            <button type="submit" style={{ marginTop: 20 }}>
              Submit
            </button>
          )}
        </form>

        {/* Show submitted response */}
        {submittedData && (
          <div style={{ marginTop: 30, background: "#eef", padding: 15 }}>
            <h4>Submitted JSON Response:</h4>
            <pre>{JSON.stringify(submittedData, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;