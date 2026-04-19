// lib/mockData.ts
import { Project, Timesheet, User } from "./types";

// Mock logged in user
export const mockUser: User = {
  id: "1",
  name: "John Doe",
  email: "admin@tentwenty.com",
};

// Mock timesheets data — Year 2026
export const mockTimesheets: Timesheet[] = [
  // Week 1 — COMPLETED (40 hours)
  {
    id: "1",
    weekNumber: 1,
    startDate: "2026-01-05",
    endDate: "2026-01-09",
    dateLabel: "5 - 9 January, 2026",
    status: "completed",
    totalHours: 40,
    targetHours: 40,
    days: [
      {
        id: "d1",
        date: "2026-01-05",
        dayLabel: "Jan 5",
        entries: [
          {
            id: "e1",
            project: "Ticktock",
            typeOfWork: "Feature Development",
            description: "Built the login page UI and integrated next-auth",
            hours: 4,
          },
          {
            id: "e2",
            project: "Ticktock",
            typeOfWork: "Bug fixes",
            description: "Fixed authentication redirect issues",
            hours: 4,
          },
        ],
      },
      {
        id: "d2",
        date: "2026-01-06",
        dayLabel: "Jan 6",
        entries: [
          {
            id: "e3",
            project: "Ticktock",
            typeOfWork: "Feature Development",
            description: "Built dashboard layout and navbar",
            hours: 8,
          },
        ],
      },
      {
        id: "d3",
        date: "2026-01-07",
        dayLabel: "Jan 7",
        entries: [
          {
            id: "e4",
            project: "Ticktock",
            typeOfWork: "Code Review",
            description: "Reviewed PRs and fixed merge conflicts",
            hours: 4,
          },
          {
            id: "e5",
            project: "Ticktock",
            typeOfWork: "Meeting",
            description: "Sprint planning and team standup",
            hours: 4,
          },
        ],
      },
      {
        id: "d4",
        date: "2026-01-08",
        dayLabel: "Jan 8",
        entries: [
          {
            id: "e6",
            project: "Ticktock",
            typeOfWork: "Feature Development",
            description: "Built timesheet table with filters",
            hours: 8,
          },
        ],
      },
      {
        id: "d5",
        date: "2026-01-09",
        dayLabel: "Jan 9",
        entries: [
          {
            id: "e7",
            project: "Ticktock",
            typeOfWork: "Testing",
            description: "Wrote unit tests for components",
            hours: 8,
          },
        ],
      },
    ],
  },

  // Week 2 — COMPLETED (40 hours)
  {
    id: "2",
    weekNumber: 2,
    startDate: "2026-01-12",
    endDate: "2026-01-16",
    dateLabel: "12 - 16 January, 2026",
    status: "completed",
    totalHours: 40,
    targetHours: 40,
    days: [
      {
        id: "d6",
        date: "2026-01-12",
        dayLabel: "Jan 12",
        entries: [
          {
            id: "e8",
            project: "Ticktock",
            typeOfWork: "Feature Development",
            description: "Built Add New Entry modal",
            hours: 8,
          },
        ],
      },
      {
        id: "d7",
        date: "2026-01-13",
        dayLabel: "Jan 13",
        entries: [
          {
            id: "e9",
            project: "Ticktock",
            typeOfWork: "Bug fixes",
            description: "Fixed modal form validation issues",
            hours: 4,
          },
          {
            id: "e10",
            project: "Ticktock",
            typeOfWork: "Code Review",
            description: "Reviewed teammates PRs",
            hours: 4,
          },
        ],
      },
      {
        id: "d8",
        date: "2026-01-14",
        dayLabel: "Jan 14",
        entries: [
          {
            id: "e11",
            project: "Ticktock",
            typeOfWork: "Feature Development",
            description: "Pagination implementation",
            hours: 8,
          },
        ],
      },
      {
        id: "d9",
        date: "2026-01-15",
        dayLabel: "Jan 15",
        entries: [
          {
            id: "e12",
            project: "Ticktock",
            typeOfWork: "Testing",
            description: "End to end testing of dashboard",
            hours: 8,
          },
        ],
      },
      {
        id: "d10",
        date: "2026-01-16",
        dayLabel: "Jan 16",
        entries: [
          {
            id: "e13",
            project: "Ticktock",
            typeOfWork: "Meeting",
            description: "Sprint review and retrospective",
            hours: 8,
          },
        ],
      },
    ],
  },

  // Week 3 — INCOMPLETE (less than 40 hours — only 20 hours)
  {
    id: "3",
    weekNumber: 3,
    startDate: "2026-01-19",
    endDate: "2026-01-23",
    dateLabel: "19 - 23 January, 2026",
    status: "incomplete",
    totalHours: 20,
    targetHours: 40,
    days: [
      {
        id: "d11",
        date: "2026-01-19",
        dayLabel: "Jan 19",
        entries: [
          {
            id: "e14",
            project: "Ticktock",
            typeOfWork: "Feature Development",
            description: "Started working on week detail view",
            hours: 8,
          },
        ],
      },
      {
        id: "d12",
        date: "2026-01-20",
        dayLabel: "Jan 20",
        entries: [
          {
            id: "e15",
            project: "Ticktock",
            typeOfWork: "Bug fixes",
            description: "Fixed responsive layout issues",
            hours: 4,
          },
          {
            id: "e16",
            project: "Ticktock",
            typeOfWork: "Meeting",
            description: "Client meeting and requirements discussion",
            hours: 4,
          },
        ],
      },
      {
        id: "d13",
        date: "2026-01-21",
        dayLabel: "Jan 21",
        entries: [
          {
            id: "e17",
            project: "Ticktock",
            typeOfWork: "Code Review",
            description: "Reviewed and merged PRs",
            hours: 4,
          },
        ],
      },
      // Jan 22 and Jan 23 — no entries (sick leave)
      {
        id: "d14",
        date: "2026-01-22",
        dayLabel: "Jan 22",
        entries: [],
      },
      {
        id: "d15",
        date: "2026-01-23",
        dayLabel: "Jan 23",
        entries: [],
      },
    ],
  },

  // Week 4 — COMPLETED (40 hours)
  {
    id: "4",
    weekNumber: 4,
    startDate: "2026-01-26",
    endDate: "2026-01-30",
    dateLabel: "26 - 30 January, 2026",
    status: "completed",
    totalHours: 40,
    targetHours: 40,
    days: [
      {
        id: "d16",
        date: "2026-01-26",
        dayLabel: "Jan 26",
        entries: [
          {
            id: "e18",
            project: "Ticktock",
            typeOfWork: "Feature Development",
            description: "Built week detail page",
            hours: 8,
          },
        ],
      },
      {
        id: "d17",
        date: "2026-01-27",
        dayLabel: "Jan 27",
        entries: [
          {
            id: "e19",
            project: "Ticktock",
            typeOfWork: "Feature Development",
            description: "Connected APIs to frontend",
            hours: 8,
          },
        ],
      },
      {
        id: "d18",
        date: "2026-01-28",
        dayLabel: "Jan 28",
        entries: [
          {
            id: "e20",
            project: "Ticktock",
            typeOfWork: "Testing",
            description: "Full app testing and bug fixes",
            hours: 8,
          },
        ],
      },
      {
        id: "d19",
        date: "2026-01-29",
        dayLabel: "Jan 29",
        entries: [
          {
            id: "e21",
            project: "Ticktock",
            typeOfWork: "Code Review",
            description: "Final code review before deployment",
            hours: 8,
          },
        ],
      },
      {
        id: "d20",
        date: "2026-01-30",
        dayLabel: "Jan 30",
        entries: [
          {
            id: "e22",
            project: "Ticktock",
            typeOfWork: "Meeting",
            description: "Deployment planning and handover",
            hours: 8,
          },
        ],
      },
    ],
  },

  // Week 5 — MISSING (no hours at all)
  {
    id: "5",
    weekNumber: 5,
    startDate: "2026-02-02",
    endDate: "2026-02-06",
    dateLabel: "2 - 6 February, 2026",
    status: "missing",
    totalHours: 0,
    targetHours: 40,
    days: [
      {
        id: "d21",
        date: "2026-02-02",
        dayLabel: "Feb 2",
        entries: [],
      },
      {
        id: "d22",
        date: "2026-02-03",
        dayLabel: "Feb 3",
        entries: [],
      },
      {
        id: "d23",
        date: "2026-02-04",
        dayLabel: "Feb 4",
        entries: [],
      },
      {
        id: "d24",
        date: "2026-02-05",
        dayLabel: "Feb 5",
        entries: [],
      },
      {
        id: "d25",
        date: "2026-02-06",
        dayLabel: "Feb 6",
        entries: [],
      },
    ],
  },
  {
    id: "6",
    weekNumber: 6,
    startDate: "2026-03-02",
    endDate: "2026-03-06",
    dateLabel: "2 - 6 March, 2026",
    status: "completed",
    totalHours: 40,
    targetHours: 40,
    days: [
      {
        id: "d26",
        date: "2026-03-02",
        dayLabel: "Mar 2",
        entries: [
          {
            id: "e26",
            project: "Ticktock",
            typeOfWork: "Feature Development",
            description: "Worked on analytics dashboard UI",
            hours: 8,
          },
        ],
      },
      {
        id: "d27",
        date: "2026-03-03",
        dayLabel: "Mar 3",
        entries: [
          {
            id: "e27",
            project: "Ticktock",
            typeOfWork: "Bug fixes",
            description: "Fixed chart rendering bugs",
            hours: 8,
          },
        ],
      },
      {
        id: "d28",
        date: "2026-03-04",
        dayLabel: "Mar 4",
        entries: [
          {
            id: "e28",
            project: "Ticktock",
            typeOfWork: "Code Review",
            description: "Reviewed dashboard PRs",
            hours: 8,
          },
        ],
      },
      {
        id: "d29",
        date: "2026-03-05",
        dayLabel: "Mar 5",
        entries: [
          {
            id: "e29",
            project: "Ticktock",
            typeOfWork: "Testing",
            description: "Tested analytics module",
            hours: 8,
          },
        ],
      },
      {
        id: "d30",
        date: "2026-03-06",
        dayLabel: "Mar 6",
        entries: [
          {
            id: "e30",
            project: "Ticktock",
            typeOfWork: "Meeting",
            description: "Sprint planning",
            hours: 8,
          },
        ],
      },
    ],
  },
  {
    id: "7",
    weekNumber: 7,
    startDate: "2026-03-09",
    endDate: "2026-03-13",
    dateLabel: "9 - 13 March, 2026",
    status: "incomplete",
    totalHours: 24,
    targetHours: 40,
    days: [
      {
        id: "d31",
        date: "2026-03-09",
        dayLabel: "Mar 9",
        entries: [
          {
            id: "e31",
            project: "Ticktock",
            typeOfWork: "Feature Development",
            description: "Started notifications module",
            hours: 8,
          },
        ],
      },
      {
        id: "d32",
        date: "2026-03-10",
        dayLabel: "Mar 10",
        entries: [
          {
            id: "e32",
            project: "Ticktock",
            typeOfWork: "Bug fixes",
            description: "Fixed API edge cases",
            hours: 8,
          },
        ],
      },
      {
        id: "d33",
        date: "2026-03-11",
        dayLabel: "Mar 11",
        entries: [
          {
            id: "e33",
            project: "Ticktock",
            typeOfWork: "Meeting",
            description: "Client sync",
            hours: 8,
          },
        ],
      },
      {
        id: "d34",
        date: "2026-03-12",
        dayLabel: "Mar 12",
        entries: [],
      },
      {
        id: "d35",
        date: "2026-03-13",
        dayLabel: "Mar 13",
        entries: [],
      },
    ],
  },
  {
    id: "8",
    weekNumber: 8,
    startDate: "2026-03-16",
    endDate: "2026-03-20",
    dateLabel: "16 - 20 March, 2026",
    status: "completed",
    totalHours: 40,
    targetHours: 40,
    days: [
      {
        id: "d36",
        date: "2026-03-16",
        dayLabel: "Mar 16",
        entries: [
          {
            id: "e36",
            project: "Ticktock",
            typeOfWork: "Feature Development",
            description: "Implemented notifications UI",
            hours: 8,
          },
        ],
      },
      {
        id: "d37",
        date: "2026-03-17",
        dayLabel: "Mar 17",
        entries: [
          {
            id: "e37",
            project: "Ticktock",
            typeOfWork: "Testing",
            description: "Tested notifications",
            hours: 8,
          },
        ],
      },
      {
        id: "d38",
        date: "2026-03-18",
        dayLabel: "Mar 18",
        entries: [
          {
            id: "e38",
            project: "Ticktock",
            typeOfWork: "Code Review",
            description: "Reviewed module PRs",
            hours: 8,
          },
        ],
      },
      {
        id: "d39",
        date: "2026-03-19",
        dayLabel: "Mar 19",
        entries: [
          {
            id: "e39",
            project: "Ticktock",
            typeOfWork: "Bug fixes",
            description: "Fixed notification bugs",
            hours: 8,
          },
        ],
      },
      {
        id: "d40",
        date: "2026-03-20",
        dayLabel: "Mar 20",
        entries: [
          {
            id: "e40",
            project: "Ticktock",
            typeOfWork: "Meeting",
            description: "Sprint retrospective",
            hours: 8,
          },
        ],
      },
    ],
  },
  {
    id: "9",
    weekNumber: 9,
    startDate: "2026-03-23",
    endDate: "2026-03-27",
    dateLabel: "23 - 27 March, 2026",
    status: "missing",
    totalHours: 0,
    targetHours: 40,
    days: [
      { id: "d41", date: "2026-03-23", dayLabel: "Mar 23", entries: [] },
      { id: "d42", date: "2026-03-24", dayLabel: "Mar 24", entries: [] },
      { id: "d43", date: "2026-03-25", dayLabel: "Mar 25", entries: [] },
      { id: "d44", date: "2026-03-26", dayLabel: "Mar 26", entries: [] },
      { id: "d45", date: "2026-03-27", dayLabel: "Mar 27", entries: [] },
    ],
  },
  {
    id: "10",
    weekNumber: 10,
    startDate: "2026-03-30",
    endDate: "2026-04-03",
    dateLabel: "30 March - 3 April, 2026",
    status: "completed",
    totalHours: 40,
    targetHours: 40,
    days: [
      {
        id: "d46",
        date: "2026-03-30",
        dayLabel: "Mar 30",
        entries: [
          {
            id: "e46",
            project: "Ticktock",
            typeOfWork: "Feature Development",
            description: "Started reports module",
            hours: 8,
          },
        ],
      },
      {
        id: "d47",
        date: "2026-03-31",
        dayLabel: "Mar 31",
        entries: [
          {
            id: "e47",
            project: "Ticktock",
            typeOfWork: "Bug fixes",
            description: "Fixed report filters",
            hours: 8,
          },
        ],
      },
      {
        id: "d48",
        date: "2026-04-01",
        dayLabel: "Apr 1",
        entries: [
          {
            id: "e48",
            project: "Ticktock",
            typeOfWork: "Testing",
            description: "Tested reports module",
            hours: 8,
          },
        ],
      },
      {
        id: "d49",
        date: "2026-04-02",
        dayLabel: "Apr 2",
        entries: [
          {
            id: "e49",
            project: "Ticktock",
            typeOfWork: "Code Review",
            description: "Reviewed reports PR",
            hours: 8,
          },
        ],
      },
      {
        id: "d50",
        date: "2026-04-03",
        dayLabel: "Apr 3",
        entries: [
          {
            id: "e50",
            project: "Ticktock",
            typeOfWork: "Meeting",
            description: "Sprint planning",
            hours: 8,
          },
        ],
      },
    ],
  },
];

export const mockProjects: Project[] = [
  { id: "1", name: "Ticktock" },
  { id: "2", name: "Internal Dashboard" },
  { id: "3", name: "Client Portal" },
  { id: "4", name: "Mobile App" },
];
