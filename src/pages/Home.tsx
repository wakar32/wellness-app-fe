import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { addLog, getLogs } from "../utils/api";
import { WellnessLog } from "../types";
import WellnessForm from "../components/WellnessForm";
import WellnessTable from "../components/WellnessTable";
import ThemeToggle from "../components/ThemeToggle";

const Home = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [logs, setLogs] = useState<WellnessLog[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!token) navigate("/login");
    else {
      getLogs(token).then(setLogs);
    }
  }, [token]);

  const handleAddLog = async (log: WellnessLog) => {
    const newLog = await addLog(log, token);
    setLogs((prev) => [...prev, newLog]);
  };

  const filtered = logs.filter((l) =>
    l.notes.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <button onClick={logout}>Logout</button>
      <ThemeToggle />
      <input
        placeholder="Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <WellnessForm onSubmit={handleAddLog} />
      <WellnessTable logs={filtered} />
    </div>
  );
};

export default Home;
