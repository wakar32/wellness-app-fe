import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { addLog, getLogs } from "../utils/api";
import { WellnessLog } from "../types";
import WellnessForm from "../components/WellnessForm";
import WellnessTable from "../components/WellnessTable";
import ThemeToggle from "../components/ThemeToggle";
import LogoutModal from "../components/LogoutModal";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { startLoading, stopLoading } from "../store/loadingSlice";

const Home = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);

  const [logs, setLogs] = useState<WellnessLog[]>([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      dispatch(startLoading());
      getLogs(token)
        .then(setLogs)
        .catch(() => {
          logout();
          navigate("/login");
        })
        .finally(() => {
          dispatch(stopLoading());
        });
    }
  }, [token, dispatch, navigate, logout]);

  const handleAddLog = async (log: WellnessLog) => {
    dispatch(startLoading());
    try {
      const newLog = await addLog(log, token);
      setLogs((prev) => [...prev, newLog]);
    } catch (err) {
      console.error("Failed to add log:", err);
    } finally {
      dispatch(stopLoading());
    }
  };

  const filtered = logs.filter((l) =>
    l.notes.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <nav className="navbar navbar-dark bg-primary px-3 py-2 responsive-navbar">
        <div className="top-row d-flex justify-content-between align-items-center w-100">
          <a className="navbar-brand mb-0">Wellness App</a>

          <div className="d-flex align-items-center gap-2">
            <ThemeToggle />
            <div
              onClick={() => setShowModal(true)}
              className="btn btn-danger ml-2"
              title="Logout"
            >
              <img
                src="/icons/logout-2-svgrepo-com.svg"
                alt="Logout"
                width="24"
                height="24"
              />
            </div>
          </div>
        </div>

        <div className="search-row mt-2 w-100">
          <input
            className="form-control"
            type="search"
            placeholder="Search notes..."
            aria-label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </nav>

      <WellnessForm onSubmit={handleAddLog} />
      {isLoading ? (
        <div style={{ padding: "1rem", fontWeight: "bold" }}>Loading...</div>
      ) : (
        <>
          <WellnessTable logs={filtered} />
        </>
      )}

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
