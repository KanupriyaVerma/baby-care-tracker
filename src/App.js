import { useState, useEffect, useRef } from "react";
import AddEntry from "./components/AddEntry";

function App() {
  const [entries, setEntries] = useState([]);
  const isFirstLoad = useRef(true);
    
  useEffect(() => {
    try {
      const savedData = localStorage.getItem("babyData");
      if (savedData) {
        setEntries(JSON.parse(savedData));
      }
    } catch (error) {
      console.error("Error loading data", error);
    }
  }, []);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }

    localStorage.setItem("babyData", JSON.stringify(entries));
  }, [entries]);

  const handleDelete = (indexToDelete) => {
      const updatedData = entries.filter((_, index) => index !== indexToDelete);
      setEntries(updatedData);
    };

  return (
    <div style={{
      background: "#f5e6e0",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "30px"
    }}>

      {/* LEFT - FORM */}
      <div style={{
        width: "350px",
        padding: "20px",
        background: "#fdf6f0",
        borderRadius: "20px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
        textAlign: "center"
      }}>
        <h1>👶 Baby Tracker</h1>
        <AddEntry entries={entries} setEntries={setEntries} />
      </div>

      {/* RIGHT - ENTRIES */}
      <div style={{
          width: "350px",
          background: "#ffffff",
          borderRadius: "10px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
          overflow: "hidden"   // IMPORTANT for clean edges
        }}>

      <h2 style={{
        padding: "15px",
        margin: 0,
        borderBottom: "1px solid #eee",
        background: "#fafafa"
      }}>
        📋 Entries
      </h2>

      <div style={{
        maxHeight: "350px",
        overflowY: "auto"
      }}>

        {entries.length === 0 ? (
          <p style={{ padding: "15px" }}>No entries yet</p>
        ) : (
          entries.map((entry, index) => (
            <div key={index} style={{
                padding: "12px 15px",
                borderBottom: "1px solid #ccc",
                borderTop: index === 0 ? "1px solid #ccc" : "none", // top border for first item
                background: "#ffffff",
                marginBottom: "2px"
              }}>

              <div style={{
                display: "flex",
                justifyContent: "space-between"
              }}>
                <strong style={{ textTransform: "capitalize" }}>
                  {entry.type}
                </strong>

                <span style={{ fontSize: "12px", color: "#777" }}>
                  {entry.time}
                </span>
              </div>

              <p style={{
                marginTop: "5px",
                fontSize: "14px"
              }}>
                {entry.note || "No notes"}
              </p>
              <button className="addbtn" onClick={() => handleDelete(index)}>Delete</button>
            </div>
            ))
          )}

        </div>
      </div>

    </div>
  );
}

export default App;