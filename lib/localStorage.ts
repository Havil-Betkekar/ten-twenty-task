import { mockTimesheets } from "./mockData";
import { Timesheet, TimesheetStatus, WorkType } from "./types";

const STORAGE_KEY = "ticktock_timesheets";

interface EntryInput {
  project: string;
  typeOfWork: WorkType;
  description: string;
  hours: number;
}

//
export function getTimesheets(): Timesheet[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      // Data exists in localStorage — use it
      return JSON.parse(stored) as Timesheet[];
    } else {
      // First time — seed localStorage with mock data
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockTimesheets));
      return mockTimesheets;
    }
  } catch (error) {
    // If anything goes wrong, fall back to mock data
    console.log(error);
    return mockTimesheets;
  }
}

// get timesheets by id
export function getTimesheetById(id: string): Timesheet | null {
  const timesheets = getTimesheets();
  return timesheets.find((t) => t.id === id) ?? null;
}

// save all timesheets to localstorage
export function saveTimesheets(timesheets: Timesheet[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(timesheets));
  } catch (error) {
    console.error("Failed to save timesheets:", error);
  }
}

// calculate status based on total hours
function calculateStatus(totalHours: number): TimesheetStatus {
  if (totalHours === 0) return "missing";
  if (totalHours < 40) return "incomplete";
  return "completed";
}

// to add new entry to a specific day in timesheet

export function addEntry(
  timesheetId: string,
  dayId: string,
  entry: EntryInput,
): Timesheet[] {
  const timesheets = getTimesheets();

  const updated = timesheets.map((timesheet) => {
    if (timesheet.id !== timesheetId) return timesheet;

    // Add entry to the correct day
    const updatedDays = timesheet.days.map((day) => {
      if (day.id !== dayId) return day;

      const newEntry = {
        id: `entry_${Date.now()}`, // unique id using timestamp
        project: entry.project,
        typeOfWork: entry.typeOfWork,
        description: entry.description,
        hours: entry.hours,
      };

      return {
        ...day,
        entries: [...day.entries, newEntry],
      };
    });

    // Recalculate total hours for this timesheet
    const totalHours = updatedDays.reduce((weekTotal, day) => {
      return (
        weekTotal + day.entries.reduce((dayTotal, e) => dayTotal + e.hours, 0)
      );
    }, 0);

    return {
      ...timesheet,
      days: updatedDays,
      totalHours,
      status: calculateStatus(totalHours),
    };
  });

  saveTimesheets(updated);
  return updated;
}

// to edit exiting array
export function editEntry(
  timesheetId: string,
  dayId: string,
  entryId: string,
  updatedEntry: EntryInput,
): Timesheet[] {
  const timesheets = getTimesheets();

  const updated = timesheets.map((timesheet) => {
    if (timesheet.id !== timesheetId) return timesheet;

    const updatedDays = timesheet.days.map((day) => {
      if (day.id !== dayId) return day;

      return {
        ...day,
        entries: day.entries.map((entry) => {
          if (entry.id !== entryId) return entry;
          return {
            ...entry,
            project: updatedEntry.project,
            typeOfWork: updatedEntry.typeOfWork,
            description: updatedEntry.description,
            hours: updatedEntry.hours,
          };
        }),
      };
    });

    // Recalculate total hours
    const totalHours = updatedDays.reduce((weekTotal, day) => {
      return (
        weekTotal + day.entries.reduce((dayTotal, e) => dayTotal + e.hours, 0)
      );
    }, 0);

    return {
      ...timesheet,
      days: updatedDays,
      totalHours,
      status: calculateStatus(totalHours),
    };
  });

  saveTimesheets(updated);
  return updated;
}

// to delete entry

export function deleteEntry(
  timesheetId: string,
  dayId: string,
  entryId: string,
): Timesheet[] {
  const timesheets = getTimesheets();

  const updated = timesheets.map((timesheet) => {
    if (timesheet.id !== timesheetId) return timesheet;

    const updatedDays = timesheet.days.map((day) => {
      if (day.id !== dayId) return day;

      return {
        ...day,
        entries: day.entries.filter((entry) => entry.id !== entryId),
      };
    });

    // Recalculate total hours
    const totalHours = updatedDays.reduce((weekTotal, day) => {
      return (
        weekTotal + day.entries.reduce((dayTotal, e) => dayTotal + e.hours, 0)
      );
    }, 0);

    return {
      ...timesheet,
      days: updatedDays,
      totalHours,
      status: calculateStatus(totalHours),
    };
  });

  saveTimesheets(updated);
  return updated;
}
