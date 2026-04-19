// components/AddEntryModal.tsx
"use client";

import { useState } from "react";
import { WorkType, TimesheetEntry } from "@/lib/types";
import { mockProjects } from "@/lib/mockData";
import { addEntry, editEntry } from "@/lib/localStorage";

// All work type options
const WORK_TYPES: WorkType[] = [
  "Bug fixes",
  "Homepage Development",
  "Feature Development",
  "Code Review",
  "Testing",
  "Meeting",
];

interface AddEntryModalProps {
  timesheetId: string;
  dayId: string;
  editingEntry: TimesheetEntry | null; // null = adding, not null = editing
  onSuccess: () => void;
  onClose: () => void;
}

export default function AddEntryModal({
  timesheetId,
  dayId,
  editingEntry,
  onSuccess,
  onClose,
}: AddEntryModalProps) {
  const isEditing = editingEntry !== null;

  // Pre-fill form if editing, empty if adding
  const [project, setProject] = useState(
    editingEntry?.project ?? mockProjects[0].name,
  );
  const [typeOfWork, setTypeOfWork] = useState<WorkType>(
    editingEntry?.typeOfWork ?? WORK_TYPES[0],
  );
  const [description, setDescription] = useState(
    editingEntry?.description ?? "",
  );
  const [hours, setHours] = useState(editingEntry?.hours ?? 1);

  // Validation errors
  const [errors, setErrors] = useState({
    project: "",
    typeOfWork: "",
    description: "",
    hours: "",
  });

  // Validate form
  function validate() {
    const newErrors = {
      project: "",
      typeOfWork: "",
      description: "",
      hours: "",
    };
    let isValid = true;

    if (!project) {
      newErrors.project = "Please select a project";
      isValid = false;
    }

    if (!typeOfWork) {
      newErrors.typeOfWork = "Please select type of work";
      isValid = false;
    }

    if (!description.trim()) {
      newErrors.description = "Task description is required";
      isValid = false;
    }

    if (hours < 1 || hours > 10) {
      newErrors.hours = "Hours must be between 1 and 10";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }

  function handleSubmit() {
    if (!validate()) return;

    if (isEditing && editingEntry) {
      // Edit existing entry
      editEntry(timesheetId, dayId, editingEntry.id, {
        project,
        typeOfWork,
        description,
        hours,
      });
    } else {
      // Add new entry
      addEntry(timesheetId, dayId, {
        project,
        typeOfWork,
        description,
        hours,
      });
    }

    onSuccess();
  }

  // Hours increment and decrement
  function incrementHours() {
    if (hours < 10) setHours(hours + 1);
  }

  function decrementHours() {
    if (hours > 1) setHours(hours - 1);
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg mx-4">
        {/* Modal header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-800">
            {isEditing ? "Edit Entry" : "Add New Entry"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-lg px-2"
          >
            ×
          </button>
        </div>

        {/* Modal body */}
        <div className="px-6 py-5 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Select Project <span className="text-red-500">*</span>
            </label>
            <select
              value={project}
              onChange={(e) => setProject(e.target.value)}
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            >
              {mockProjects.map((p) => (
                <option key={p.id} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>
            {errors.project && (
              <p className="text-red-500 text-xs mt-1">{errors.project}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type of Work <span className="text-red-500">*</span>
            </label>
            <select
              value={typeOfWork}
              onChange={(e) => setTypeOfWork(e.target.value as WorkType)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            >
              {WORK_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.typeOfWork && (
              <p className="text-red-500 text-xs mt-1">{errors.typeOfWork}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Task description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write text here ..."
              rows={4}
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500 resize-none"
            />
            <p className="text-xs text-gray-400 mt-1">A note for extra info</p>
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hours <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2">
              {/* Decrement */}
              <button
                onClick={decrementHours}
                disabled={hours <= 1}
                className="w-8 h-8 border border-gray-300 rounded text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center text-lg"
              >
                −
              </button>

              {/* Hours display */}
              <span className="w-10 h-8 text-center text-sm font-medium text-gray-700">
                {hours}
              </span>

              {/* Increment */}
              <button
                onClick={incrementHours}
                disabled={hours >= 10}
                className="w-8 h-8 border border-gray-300 rounded text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center text-lg"
              >
                +
              </button>
            </div>
            {errors.hours && (
              <p className="text-red-500 text-xs mt-1">{errors.hours}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 px-6 py-4 border-t border-gray-100">
          <button
            onClick={handleSubmit}
            className="flex-1 h-11 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition"
          >
            {isEditing ? "Save changes" : "Add entry"}
          </button>
          <button
            onClick={onClose}
            className="flex-1 h-11 border border-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
