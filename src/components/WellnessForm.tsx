import React, { useState } from "react";
import { WellnessLog } from "../types";

type Props = {
  onSubmit: (log: WellnessLog) => void;
};

const WellnessForm: React.FC<Props> = ({ onSubmit }) => {
  const [mood, setMood] = useState<"Happy" | "Stressed" | "Tired" | "Focused">(
    "Happy"
  );
  const [sleep, setSleep] = useState<number>(8);
  const [notes, setNotes] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (notes.length > 200) {
      setError("Notes must be less than or equel 200 characters");
      return;
    }
    const log: WellnessLog = {
      id: Date.now(),
      mood,
      sleep,
      notes,
    };
    console.log(log);
    onSubmit(log);
    setMood("Happy");
    setSleep(8);
    setNotes("");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded bg-light mt-4">
      {/* Mood */}
      <div className="form-group">
        <label htmlFor="moodSelect">Mood</label>
        <select
          id="moodSelect"
          className="form-control"
          value={mood}
          onChange={(e) => setMood(e.target.value as any)}
        >
          <option value="Happy">😊 Happy</option>
          <option value="Stressed">😫 Stressed</option>
          <option value="Tired">😴 Tired</option>
          <option value="Focused">🎯 Focused</option>
        </select>
      </div>

      {/* Sleep */}
      <div className="form-group">
        <label htmlFor="sleepRange">Sleep (hours): {sleep}</label>
        <input
          id="sleepRange"
          type="range"
          className="form-control-range"
          min="0"
          max="12"
          value={sleep}
          onChange={(e) => setSleep(Number(e.target.value))}
        />
      </div>

      {/* Notes */}
      <div className="form-group">
        <label htmlFor="notesArea">Activity Notes</label>
        <textarea
          id="notesArea"
          className="form-control"
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          maxLength={200}
        />
        {/* Optional character counter: */}
        {/* <small className="form-text text-muted">{notes.length}/200 characters</small> */}
      </div>

      {/* Error Message */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Submit Button */}
      <div className="d-flex justify-content-between">
        <button type="submit" className="btn btn-primary">
          Add Log
        </button>
        <p
          className={`mt-1 mb-0 ${
            notes.length >= 200 ? "text-danger" : "text-muted"
          }`}
        >
          {notes.length}/200 characters
        </p>
      </div>
    </form>
  );
};

export default WellnessForm;
