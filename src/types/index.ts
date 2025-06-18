export interface LoginData {
  email: string;
  password: string;
}

export interface SignupData extends LoginData {
  confirmPassword: string;
}

export interface WellnessLog {
  id: number;
  mood: "Happy" | "Stressed" | "Tired" | "Focused";
  sleep: number;
  notes: string;
}
