import React from "react";
import { WellnessLog } from "../types";

type Props = {
  logs: WellnessLog[];
};

const WellnessTable: React.FC<Props> = ({ logs }) => {
  if (!logs.length) return <p>No logs available</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>Mood</th>
          <th>Sleep</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((log) => (
          <tr key={log.id}>
            <td>{log.mood}</td>
            <td>{log.sleep} hrs</td>
            <td>{log.notes}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WellnessTable;
