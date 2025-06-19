import React from "react";
import { WellnessLog } from "../types";

type Props = {
  logs: WellnessLog[];
};

const WellnessTable: React.FC<Props> = ({ logs }) => {
  if (!logs.length) return <p>No logs available</p>;

  return (
    <div className="table-responsive mt-4">
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Id</th>
            <th>Mood</th>
            <th>Sleep</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td>{log.id}</td>
              <td>{log.mood}</td>
              <td>{log.sleep} hrs</td>
              <td>{log.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WellnessTable;
