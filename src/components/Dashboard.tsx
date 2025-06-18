import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getLogs, addLog } from "../utils/api";
import { WellnessLog } from "../types";
import WellnessForm from "./WellnessForm";
import WellnessTable from "./WellnessTable";
import ThemeToggle from "./ThemeToggle";

const Dashboard: React.FC = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const [logs, setLogs] = useState<WellnessLog[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      getLogs(token)
        .then(setLogs)
        .catch(() => {
          logout(); // Invalid token fallback
          navigate("/login");
        });
    }
  }, [token]);

  const handleAddLog = async (log: WellnessLog) => {
    try {
      const newLog = await addLog(log, token);
      setLogs((prev) => [...prev, newLog]);
    } catch (err) {
      console.error("Failed to add log:", err);
    }
  };

  const filteredLogs = logs.filter((log) =>
    log.notes.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <header style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Wellness Dashboard</h2>
        <div>
          <ThemeToggle />
          <button onClick={logout}>Logout</button>
        </div>
      </header>

      <section>
        <input
          type="text"
          placeholder="Search activity notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>

      <section>
        <WellnessForm onSubmit={handleAddLog} />
      </section>

      <section>
        <WellnessTable logs={filteredLogs} />
      </section>
    </div>
  );
};

export default Dashboard;
