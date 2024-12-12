import React, { useState, useEffect } from "react";

const DynamicLanguageTable = () => {
  const [languages, setLanguages] = useState([]); // Languages fetched from server
  const [rows, setRows] = useState([]); // Table data rows

  // Mock server response data
  const serverData = [
    { languageID: "1", label: "asu", value: "terr" },
    { languageID: "2", label: "asu", value: "slepet" },
    { languageID: "3", label: "asu", value: "mbroook" },
    { languageID: "4", label: "asu", value: "asemene" },
    { languageID: "1", label: "das", value: "dcxzc" },
    { languageID: "2", label: "das", value: "wqe" },
    { languageID: "3", label: "das", value: "rewr" },
    { languageID: "4", label: "das", value: "fsdd" },
    { languageID: "1", label: "bbdg", value: "d" },
    { languageID: "2", label: "bbdg", value: "adq" },
    { languageID: "3", label: "bbdg", value: "ddsa" },
    { languageID: "4", label: "bbdg", value: "da" },
    { languageID: "1", label: "bcv", value: "ddasda" },
    { languageID: "2", label: "bcv", value: "sd" },
    { languageID: "3", label: "bcv", value: "ddasqw" },
    { languageID: "4", label: "bcv", value: "gdfgd" },
    { languageID: "1", label: "gdfg", value: "sada" },
    { languageID: "2", label: "gdfg", value: "das" },
    { languageID: "3", label: "gdfg", value: "eq" },
    { languageID: "4", label: "gdfg", value: "eegdf" },
  ];

  useEffect(() => {
    // Mock API call to fetch languages
    const fetchLanguages = async () => {
      const response = [
        { id: "1", name: "Bahasa Indonesia" },
        { id: "2", name: "English" },
        { id: "3", name: "China" },
        { id: "4", name: "Jepang" },
      ];
      setLanguages(response);
    };

    fetchLanguages();

    // Process server data into rows
  const groupedRows = serverData.reduce((acc, item) => {
    const existingRow = acc.find((row) => row.label === item.label);
      if (existingRow) {
        existingRow.values[item.languageID] = item.value;
      } else {
        acc.push({
          label: item.label,
          values: { [item.languageID]: item.value },
        });
      }
      return acc;
    }, []);
    setRows(groupedRows);
  }, []);

  // Handle adding a new row
  const addRow = () => {
    setRows([
      ...rows,
      {
        label: "",
        values: {},
      },
    ]);
  };

  // Handle deleting a row
  const deleteRow = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };

  // Handle updating row data
  const updateRow = (index, field, value, languageID) => {
    const updatedRows = [...rows];
    if (field === "label") {
      updatedRows[index].label = value;
    } else {
      updatedRows[index].values = {
        ...updatedRows[index].values,
        [languageID]: value,
      };
    }
    setRows(updatedRows);
  };

  // Prepare data for server submission
  const prepareDataForServer = () => {
    return rows
      .map((row) =>
        Object.entries(row.values).map(([languageID, value]) => ({
          languageID,
          label: row.label,
          value,
        }))
      )
      .flat();
  };

  return (
    <div>
      <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Label</th>
            {languages.map((lang) => (
              <th key={lang.id}>{lang.name}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={row.label}
                  onChange={(e) =>
                    updateRow(index, "label", e.target.value)
                  }
                />
              </td>
              {languages.map((lang) => (
                <td key={lang.id}>
                  <input
                    type="text"
                    value={row.values[lang.id] || ""}
                    onChange={(e) =>
                      updateRow(index, "value", e.target.value, lang.id)
                    }
                  />
                </td>
              ))}
              <td>
                <button onClick={() => deleteRow(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={addRow}>Add Row</button>
      <button
        onClick={() => {
          const dataToSend = prepareDataForServer();
          console.log("Data to send to server:", dataToSend);
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default DynamicLanguageTable;
