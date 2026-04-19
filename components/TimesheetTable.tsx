"use client";

import { Timesheet, TimesheetFilters, TimesheetStatus } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Pagination from "./Pagination";
import StatusBadge from "./StatusBadge";

// const ROWS_PER_PAGE = 5;

function SortArrow({
  field,
  sortField,
  sortOrder,
}: {
  field: "weekNumber" | "startDate";
  sortField: "weekNumber" | "startDate";
  sortOrder: "asc" | "desc";
}) {
  const isActive = sortField === field;
  return (
    <span
      className={`ml-1 text-xs ${isActive ? "text-blue-600" : "text-gray-400"}`}
    >
      {isActive ? (sortOrder === "asc" ? "↑" : "↓") : "↕"}
    </span>
  );
}

function ActionButton({
  timesheet,
  onClick,
}: {
  timesheet: Timesheet;
  onClick: () => void;
}) {
  const config = {
    completed: { label: "View" },
    incomplete: { label: "Update" },
    missing: { label: "Create" },
  };

  return (
    <button
      onClick={onClick}
      className={`text-sm font-medium text-blue-600 hover:underline cursor-pointer`}
    >
      {config[timesheet.status].label}
    </button>
  );
}

// Date Range dropdown component
function DateRangeFilter({
  startDate,
  endDate,
  onStartChange,
  onEndChange,
  onClear,
}: {
  startDate: string;
  endDate: string;
  onStartChange: (val: string) => void;
  onEndChange: (val: string) => void;
  onClear: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Label shown on the button
  const label =
    startDate && endDate
      ? `${startDate} → ${endDate}`
      : startDate
        ? `From ${startDate}`
        : "Date Range";

  return (
    <div ref={ref} className="relative">
      {/* Trigger button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-600 hover:border-gray-400 bg-white"
      >
        {label}
        {/* Chevron */}
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute top-10 left-0 z-20 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-64">
          <p className="text-xs font-medium text-gray-500 mb-3 uppercase tracking-wide">
            Select Date Range
          </p>

          {/* Start date */}
          <div className="flex flex-col gap-1 mb-3">
            <label className="text-xs text-gray-500">From</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => onStartChange(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* End date */}
          <div className="flex flex-col gap-1 mb-4">
            <label className="text-xs text-gray-500">To</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => onEndChange(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                onClear();
                setOpen(false);
              }}
              className="text-xs text-gray-400 hover:text-gray-600 underline"
            >
              Clear
            </button>
            <button
              onClick={() => setOpen(false)}
              className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Status dropdown component
function StatusFilter({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: TimesheetStatus | "all") => void;
}) {
  return (
    <div className="relative flex items-center">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as TimesheetStatus | "all")}
        className="appearance-none border border-gray-300 rounded px-3 py-1.5 pr-8 text-sm text-gray-600 focus:outline-none focus:border-blue-500 bg-white cursor-pointer"
      >
        <option value="all">Status</option>
        <option value="completed">Completed</option>
        <option value="incomplete">Incomplete</option>
        <option value="missing">Missing</option>
      </select>
      {/* Decorative arrow */}
      <svg
        className="w-4 h-4 text-gray-400 absolute right-2 pointer-events-none"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>
  );
}

export default function TimesheetTable() {
  const router = useRouter();

  const [timesheets, setTimesheets] = useState<Timesheet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [filters, setFilters] = useState<TimesheetFilters>({
    startDate: "",
    endDate: "",
    status: "all",
  });

  const [sortField, setSortField] = useState<"weekNumber" | "startDate">(
    "weekNumber",
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  async function fetchTimesheets() {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (filters.startDate) params.set("startDate", filters.startDate);
      if (filters.endDate) params.set("endDate", filters.endDate);
      if (filters.status && filters.status !== "all") {
        params.set("status", filters.status);
      }

      const res = await fetch(`/api/timesheets?${params.toString()}`);
      const json = await res.json();

      if (!res.ok) throw new Error(json.error || "Failed to fetch");

      setTimesheets(json.data);
      setCurrentPage(1);
    } catch (err) {
      setError("Failed to load timesheets. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTimesheets();
  }, [filters]);

  function handleSort(field: "weekNumber" | "startDate") {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  }

  const sorted = [...timesheets].sort((a, b) => {
    if (sortField === "weekNumber") {
      return sortOrder === "asc"
        ? a.weekNumber - b.weekNumber
        : b.weekNumber - a.weekNumber;
    } else {
      return sortOrder === "asc"
        ? new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        : new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    }
  });

  const totalPages = Math.ceil(sorted.length / rowsPerPage);
  const paginated = sorted.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1);
    }
  }, [totalPages, currentPage]);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      {/* Header */}
      <h1 className="text-xl font-semibold text-gray-800 mb-5">
        Your Timesheets
      </h1>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-6">
        <DateRangeFilter
          startDate={filters.startDate ?? ""}
          endDate={filters.endDate ?? ""}
          onStartChange={(val) => setFilters({ ...filters, startDate: val })}
          onEndChange={(val) => setFilters({ ...filters, endDate: val })}
          onClear={() => setFilters({ ...filters, startDate: "", endDate: "" })}
        />

        <StatusFilter
          value={filters.status ?? "all"}
          onChange={(val) => setFilters({ ...filters, status: val })}
        />

        {/* Clear all filters */}
        {(filters.startDate || filters.endDate || filters.status !== "all") && (
          <button
            onClick={() =>
              setFilters({ startDate: "", endDate: "", status: "all" })
            }
            className="text-sm text-gray-400 hover:text-gray-600 underline"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Error state */}
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                <button
                  onClick={() => handleSort("weekNumber")}
                  className="flex items-center hover:text-gray-700"
                >
                  Week #
                  <SortArrow
                    field="weekNumber"
                    sortField={sortField}
                    sortOrder={sortOrder}
                  />
                </button>
              </th>

              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                <button
                  onClick={() => handleSort("startDate")}
                  className="flex items-center hover:text-gray-700"
                >
                  Date
                  <SortArrow
                    field="startDate"
                    sortField={sortField}
                    sortOrder={sortOrder}
                  />
                </button>
              </th>

              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Status ↓
              </th>

              <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan={4} className="text-center py-10 text-gray-400">
                  Loading...
                </td>
              </tr>
            )}

            {!loading && paginated.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-10 text-gray-400">
                  No timesheets found
                </td>
              </tr>
            )}

            {!loading &&
              paginated.map((timesheet) => (
                <tr
                  key={timesheet.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-4 px-2 text-gray-700 bg-gray-50">
                    {timesheet.weekNumber}
                  </td>
                  <td className="py-4 px-4 text-gray-700">
                    {timesheet.dateLabel}
                  </td>
                  <td className="py-4 px-4">
                    <StatusBadge status={timesheet.status} />
                  </td>
                  <td className="py-4 px-4 text-right cursor-pointer">
                    <ActionButton
                      timesheet={timesheet}
                      onClick={() => router.push(`/dashboard/${timesheet.id}`)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
        <div className="text-sm text-gray-500">
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
          </select>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
