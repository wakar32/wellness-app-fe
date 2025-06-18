import { LoginData, SignupData, WellnessLog } from "../types";

const API_URL = "https://96f7d7af-792c-41c4-afd4-8bc038b7c527.mock.pstmn.io";

export async function login(data: LoginData) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function signup(data: SignupData) {
  const response = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function getLogs(token: string) {
  const response = await fetch(`${API_URL}/logs`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.json();
}

export async function addLog(data: WellnessLog, token: string) {
  const response = await fetch(`${API_URL}/logs`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}
