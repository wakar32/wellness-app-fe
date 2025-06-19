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
      setError("Notes must be less than 200 characters");
      return;
    }
    const log: WellnessLog = {
      id: Date.now(),
      mood,
      sleep,
      notes,
    };
    onSubmit(log);
    setMood("Happy");
    setSleep(8);
    setNotes("");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Mood:
        <select value={mood} onChange={(e) => setMood(e.target.value as any)}>
          <option value="Happy">Happy</option>
          <option value="Stressed">Stressed</option>
          <option value="Tired">Tired</option>
          <option value="Focused">Focused</option>
        </select>
      </label>

      <label>
        Sleep (hours): {sleep}
        <input
          type="range"
          min="0"
          max="12"
          value={sleep}
          onChange={(e) => setSleep(Number(e.target.value))}
        />
      </label>

      <label>
        Activity Notes:
        {/* {notes.length}/200 */}
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          maxLength={200}
        />
      </label>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <button type="submit">Add Log</button>
    </form>
  );
};

export default WellnessForm;
