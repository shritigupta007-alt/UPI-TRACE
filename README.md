# UPI-TRACE

**Consent & Context Audit Layer for Incoming UPI Payments**

UPI-TRACE is a prototype dashboard for documenting and reviewing incoming UPI payments from unknown sources. It brings transaction records, recipient responses, event timelines, integrity checks, and evidence summaries into one investigator-facing workspace.

## Features

- **Overview** — summary of simulated transactions and flagged activity.
- **Transactions** — searchable transaction records and sender-risk context.
- **Recipient Response** — recipient declarations and recorded responses.
- **Evidence Timeline** — chronological view of recorded events.
- **Integrity Verification** — audit-trail hash verification interface.
- **Evidence Reports** — evidence summaries for review and export workflows.
- **Privacy & Access** — overview of data handling, retention, and access controls.

## Technology

- React + TypeScript
- Vite
- Tailwind CSS
- Lucide React

## Run locally

Requirements: Node.js and npm.

```bash
npm install
npm run dev
```

## Quality checks

```bash
npm run typecheck
npm run lint
npm run build
```

## Project status

This is a prototype for demonstration and hackathon evaluation. Use the included demo data for testing; do not treat simulated records or interface-level integrity indicators as verified real-world financial or legal evidence.
