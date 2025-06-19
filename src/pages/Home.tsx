import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { addLog, getLogs } from "../utils/api";
import { WellnessLog } from "../types";
import WellnessForm from "../components/WellnessForm";
import WellnessTable from "../components/WellnessTable";
import ThemeToggle from "../components/ThemeToggle";
import LogoutModal from "../components/LogoutModal";

const Home = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [logs, setLogs] = useState<WellnessLog[]>([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState<boolean>(false);

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
      <nav className="navbar navbar-dark bg-primary">
        <a className="navbar-brand">Wellness App</a>

        <form className="form-inline">
          <ThemeToggle />
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search notes..."
            aria-label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div
            onClick={() => setShowModal(true)}
            className="btn btn-danger"
            data-toggle="tooltip"
            data-placement="bottom"
            title="Logout"
          >
            <img
              src="/icons/logout-2-svgrepo-com.svg"
              alt="Logout"
              width="24"
              height="24"
            />
          </div>
        </form>
      </nav>

      <WellnessForm onSubmit={handleAddLog} />
      <WellnessTable logs={filtered} />

      {/* Logout Confirmation Modal */}
      <LogoutModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={logout}
      />
    </div>
  );
};

export default Home;
