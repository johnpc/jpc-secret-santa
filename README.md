# Secret Santa Gift Exchange App

A modern web application for organizing Secret Santa gift exchanges with automatic assignment generation and secure participant access.

## Purpose

This app simplifies Secret Santa organization by:

- Creating groups with unique admin access codes
- Adding participants with individual access codes
- Automatically randomizing gift assignments (ensuring everyone gives and receives)
- Providing secure, shareable links for each participant
- Allowing admins to view all assignments while participants only see their own

## Tech Stack

- **Frontend**: Next.js 15 (React 18) with TypeScript
- **Backend**: AWS Amplify Gen 2 (serverless)
- **Database**: AWS AppSync + DynamoDB
- **State Management**: TanStack React Query
- **UI Components**: shadcn/ui (Radix UI + Tailwind CSS)
- **Authentication**: Amplify Guest Access (unauthenticated)

## Architecture

### Data Model

- **Group**: Contains name, admin code, assignment status, and participants
- **Participant**: Contains name, email, access code, and assignment reference

### Assignment Algorithm

Uses a circular shuffle algorithm to ensure:

- Every participant gives to exactly one person
- Every participant receives from exactly one person
- No one is assigned to themselves

### Access Control

- **Admin URL**: `/admin/[adminCode]` - View all participants and assignments
- **Participant URL**: `/participant/[accessCode]` - View only your assignment
- All access is unauthenticated via Amplify guest mode

## Available Scripts

### `npm run dev`

Starts the Next.js development server at [http://localhost:3000](http://localhost:3000)

### `npm run build`

Creates an optimized production build

### `npm run start`

Runs the production build locally

### `npm run lint`

Runs ESLint to check code quality

### `npm run sandbox`

Deploys the Amplify backend to a sandbox environment using the `personal` AWS profile

## Getting Started

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Start Amplify sandbox** (in a separate terminal):

   ```bash
   npm run sandbox
   ```

   This deploys your backend and generates `amplify_outputs.json`

3. **Start the dev server**:

   ```bash
   npm run dev
   ```

4. **Open the app**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage Flow

1. **Create a Group**: Enter a group name on the home page
2. **Add Participants**: Use the admin page to add all participants
3. **Generate Assignments**: Click "Assign Secret Santas" to randomize
4. **Share Links**: Copy and share each participant's unique link
5. **Participants View**: Each person sees only their assignment

## Project Structure

```
├── app/
│   ├── admin/[code]/page.tsx    # Admin view
│   ├── participant/[code]/page.tsx  # Participant view
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Home page
│   └── providers.tsx            # React Query provider
├── components/
│   ├── ui/                      # shadcn/ui components
│   ├── AddParticipant.tsx       # Add participant dialog
│   ├── AssignButton.tsx         # Assignment trigger
│   ├── CreateGroup.tsx          # Group creation form
│   └── ParticipantList.tsx      # Participant display
├── hooks/
│   ├── useGroups.ts             # Group queries/mutations
│   └── useParticipants.ts       # Participant queries/mutations
├── amplify/
│   ├── data/resource.ts         # Data model schema
│   └── backend.ts               # Backend configuration
└── lib/
    ├── amplify.ts               # Amplify configuration
    └── utils.ts                 # Utility functions
```

## Component Design

All components are kept under 200 lines and follow single-responsibility principles:

- **CreateGroup**: Group creation form
- **AddParticipant**: Modal for adding participants
- **ParticipantList**: Displays participants with copy-link functionality
- **AssignButton**: Handles assignment randomization

## Deployment

Deploy to AWS Amplify Hosting:

```bash
npx ampx pipeline-deploy --branch main --app-id <your-app-id>
```

Or deploy to Vercel/other platforms - just ensure Amplify backend is deployed first.
