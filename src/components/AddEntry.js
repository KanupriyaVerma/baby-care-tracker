import React, { useState } from "react";
import "./AddEntry.css";

function AddEntry({ entries, setEntries }) {
  const [selectedType, setSelectedType] = useState("");
  const [note, setNote] = useState("");
  const [time, setTime] = useState("");

  const handleAdd = () => {
    if (!selectedType || !time) {
      alert("Please select type and time");
      return;
    }

    const newEntry = {
      type: selectedType,
      note: note,
      time: time,
    };

    setEntries((prevEntries) => {
      const updated = [...prevEntries, newEntry];
      localStorage.setItem("babyData", JSON.stringify(updated)); // FORCE SAVE
      return updated;
    });

    setSelectedType("");
    setNote("");
    setTime("");
  };

  return (
    <div className="form-container">
      <h2>Add Entry</h2>

      <div className="type-buttons">
        <button
          className={selectedType === "feeding" ? "active" : ""}
          onClick={() => setSelectedType("feeding")}
        >
          🍼 Feeding
        </button>

        <button
          className={selectedType === "sleep" ? "active" : ""}
          onClick={() => setSelectedType("sleep")}
        >
          😴 Sleep
        </button>

        <button
          className={selectedType === "diaper" ? "active" : ""}
          onClick={() => setSelectedType("diaper")}
        >
          🧷 Diaper
        </button>
      </div>

      <input
        className="input"
        placeholder="Notes (optional)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <input
        className="input"
        placeholder="Time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />

      <button className="add-btn" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
}

export default AddEntry;