export type TimesheetStatus = "completed" | "incomplete" | "missing";

export type WorkType =
  | "Bug fixes"
  | "Homepage Development"
  | "Feature Development"
  | "Code Review"
  | "Testing"
  | "Meeting";

// single task entry inside a day
export interface TimesheetEntry {
  id: string;
  project: string;
  typeOfWork: WorkType;
  description: string;
  hours: number;
}

// single day inside a week
export interface TimesheetDay {
  id: string;
  date: string;
  dayLabel: string;
  entries: TimesheetEntry[];
}

// single week timesheet
export interface Timesheet {
  id: string;
  weekNumber: number;
  startDate: string;
  endDate: string;
  dateLabel: string;
  status: TimesheetStatus;
  totalHours: number;
  targetHours: number;
  days: TimesheetDay[];
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
}

// filter types

export interface TimesheetFilters {
  startDate?: string;
  endDate?: string;
  status?: TimesheetStatus | "all";
}

export interface Project {
  id: string;
  name: string;
}
