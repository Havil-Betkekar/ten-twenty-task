# Ten-Twenty Timesheet task

## Live demo url:

## Setup Instructions

### Test Credentials

```
Email: admin@tentwenty.com
Password: password123
```

### Prerequisites

- Node.js 18+
- npm

### Installation -- to run on your system

1. Clone the repository:

````bash
git clone https://github.com/Havil-Betkekar/ten-twenty-task.git
cd tentwenty-timesheet

2. Install dependencies:
```bash
npm install

3. Create a `.env.local` file at the root:
```bash
AUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000

4. Generate AUTH_SECRET:
```bash
npx auth secret

5. Run the development server:
```bash
npm run dev

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Frameworks & Libraries Used
 Next.js - 15 - React framework with App Router
TypeScript - 5 - Type safety
Tailwind CSS -3 - Styling
NextAuth.js - v5 beta - Authentication
 Inter (Google Fonts)  —  Typography

 ## 💡 Assumptions & Notes

- **Authentication**: Implemented using NextAuth.js v5 with dummy credentials. In a real app this would connect to a backend API or database.
- **Data Persistence**: Timesheet data is seeded from mock data and persisted in `localStorage`. Data survives page refreshes but resets if browser storage is cleared.
- **API Routes**: All client side API calls go through internal Next.js API routes as required. These act as a middleware layer between the frontend and data source.
- **Edit and Create actions**: Both open the same Add Entry modal — pre-filled for edit, empty for create.

## Time Spent
| Task | Time |
|---|---|
| Project setup and NextAuth | ~1 hour |
| Mock data, Types and API routes | ~3 hour |
| Login page UI | ~1 hour |
| Dashboard table with filters and pagination | ~3 hours |
| Week detail page and Add/Edit modal | ~3 hours |
| Bug fixes and UI polish | ~2 hour |
| **Total** | **~14 hours** |

## Environment Variables

| Variable | Description |
|---|---|
| `AUTH_SECRET` | Secret key for NextAuth JWT signing |
| `NEXTAUTH_URL` | Base URL of your app |
````
