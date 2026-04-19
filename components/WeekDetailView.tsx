"use client";

import { useEffect, useState } from "react";
import { Timesheet, TimesheetEntry, TimesheetDay } from "@/lib/types";
import { getTimesheetById, deleteEntry } from "@/lib/localStorage";
import AddEntryModal from "./AddEntryModal";

interface WeekDetailViewProps {
  timesheetId: string;
}

// ••• menu for each entry row
function EntryMenu({
  onEdit,
  onDelete,
}: {
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="text-gray-400 hover:text-gray-600 p-1.5 rounded-md"
      >
        •••
      </button>

      {open && (
        <>
          {/*  */}
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-1 w-28 bg-white border border-gray-200 rounded-md shadow-sm z-20">
            <button
              onClick={() => {
                setOpen(false);
                onEdit();
              }}
              className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              Edit
            </button>
            <button
              onClick={() => {
                setOpen(false);
                onDelete();
              }}
              className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-50"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// Single entry row
function EntryRow({
  entry,
  onEdit,
  onDelete,
}: {
  entry: TimesheetEntry;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-md hover:bg-gray-50/40">
      <span className="text-sm text-gray-800 flex-1">{entry.description}</span>

      <div className="flex items-center gap-5">
        <span className="text-sm text-gray-400 whitespace-nowrap">
          {entry.hours} hrs
        </span>
        <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">
          {entry.project}
        </span>
        <EntryMenu onEdit={onEdit} onDelete={onDelete} />
      </div>
    </div>
  );
}

// Single day section
function DaySection({
  day,
  onAddEntry,
  onEditEntry,
  onDeleteEntry,
}: {
  day: TimesheetDay;
  timesheetId: string;
  onAddEntry: (dayId: string) => void;
  onEditEntry: (dayId: string, entry: TimesheetEntry) => void;
  onDeleteEntry: (dayId: string, entryId: string) => void;
}) {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-gray-700 mb-2">{day.dayLabel}</h3>

      <div className="space-y-2">
        {day.entries.map((entry) => (
          <EntryRow
            key={entry.id}
            entry={entry}
            onEdit={() => onEditEntry(day.id, entry)}
            onDelete={() => onDeleteEntry(day.id, entry.id)}
          />
        ))}

        <button
          onClick={() => onAddEntry(day.id)}
          className="w-full py-2.5 text-sm text-blue-500 hover:text-blue-600 border-t border-dashed border-gray-200 hover:bg-blue-50 transition-colors"
        >
          + Add new task
        </button>
      </div>
    </div>
  );
}

// Progress bar component
function ProgressBar({
  totalHours,
  targetHours,
}: {
  totalHours: number;
  targetHours: number;
}) {
  const percentage = Math.min(
    Math.round((totalHours / targetHours) * 100),
    100,
  );

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-gray-600 whitespace-nowrap">
        {totalHours}/{targetHours} hrs
      </span>
      <div className="w-32 bg-gray-200 rounded-full h-1.5">
        <div
          className="bg-orange-500 h-1.5 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm text-gray-500">{percentage}%</span>
    </div>
  );
}

export default function WeekDetailView({ timesheetId }: WeekDetailViewProps) {
  const [timesheet, setTimesheet] = useState<Timesheet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDayId, setSelectedDayId] = useState<string>("");
  const [editingEntry, setEditingEntry] = useState<TimesheetEntry | null>(null);

  // Load timesheet from localStorage
  useEffect(() => {
    // Wrap in setTimeout to avoid synchronous setState in effect
    const timer = setTimeout(() => {
      try {
        const data = getTimesheetById(timesheetId);
        if (!data) {
          setError("Timesheet not found");
        } else {
          setTimesheet(data);
        }
      } catch (err) {
        setError("Failed to load timesheet");
      } finally {
        setLoading(false);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [timesheetId]);

  // Refresh timesheet from localStorage after changes
  function refreshTimesheet() {
    const data = getTimesheetById(timesheetId);
    if (data) setTimesheet(data);
  }

  // Open modal for adding new entry
  function handleAddEntry(dayId: string) {
    setSelectedDayId(dayId);
    setEditingEntry(null); // no pre-filled data
    setModalOpen(true);
  }

  // Open modal for editing existing entry
  function handleEditEntry(dayId: string, entry: TimesheetEntry) {
    setSelectedDayId(dayId);
    setEditingEntry(entry); // pre-fill with existing data
    setModalOpen(true);
  }

  // Delete entry directly
  function handleDeleteEntry(dayId: string, entryId: string) {
    if (!timesheet) return;
    deleteEntry(timesheet.id, dayId, entryId);
    refreshTimesheet();
  }

  // Called when modal saves successfully
  function handleModalSuccess() {
    setModalOpen(false);
    refreshTimesheet();
  }

  if (loading) {
    return <div className="text-center py-20 text-gray-400">Loading...</div>;
  }

  if (error || !timesheet) {
    return (
      <div className="text-center py-20 text-red-400">
        {error || "Timesheet not found"}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-start justify-between mb-3">
        <div>
          <h1 className="text-lg font-semibold text-gray-800">
            This week&apos;s timesheet
          </h1>
          <p className="text-sm text-gray-400 mt-1">{timesheet.dateLabel}</p>
        </div>

        <ProgressBar
          totalHours={timesheet.totalHours}
          targetHours={timesheet.targetHours}
        />
      </div>

      {/* Divider */}
      <hr className="border-gray-200 mb-6" />

      {/* Days */}
      {timesheet.days.map((day) => (
        <DaySection
          key={day.id}
          day={day}
          timesheetId={timesheet.id}
          onAddEntry={handleAddEntry}
          onEditEntry={handleEditEntry}
          onDeleteEntry={handleDeleteEntry}
        />
      ))}

      {/* Add Entry Modal */}
      {modalOpen && (
        <AddEntryModal
          timesheetId={timesheet.id}
          dayId={selectedDayId}
          editingEntry={editingEntry}
          onSuccess={handleModalSuccess}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}
