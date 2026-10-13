# AGENTS.md

This repository is a small full-stack engineering interview sandbox. Read `CANDIDATE.md` before making task-related changes.

## Project facts

- Backend: Java 17, Spring Boot 4.1, MyBatis-Plus, H2.
- Frontend: Vue 3, TypeScript, Vite 8, Element Plus.
- Backend base URL: `http://localhost:8080`.
- Frontend dev URL: `http://localhost:5173`.
- Vite proxies `/api` to the backend.
- H2 is in-memory. Application restart resets seed data.

## Working principles

- Understand the existing implementation before editing it.
- Prefer small, focused changes that follow the current structure.
- Do not introduce new frameworks or dependencies unless they solve a real need.
- Do not replace working modules wholesale just because generation is easier.
- Business constraints that matter for data correctness should be enforced by the backend, not only by UI state.
- Preserve readable names and simple code over unnecessary abstractions.
- Never assume generated code is correct without compiling, running, or otherwise validating it.

## Useful files

- `CANDIDATE.md`: interview task and scope.
- `docs/ARCHITECTURE.md`: current call flow and API baseline.
- `backend/src/main/java/com/lcysgsg/interview/device/`: backend device module.
- `backend/src/main/resources/schema.sql`: database schema.
- `frontend/src/api/`: frontend API layer.
- `frontend/src/views/DeviceList.vue`: main page.

## Validation

Backend:

```bash
cd backend
mvn test
```

Frontend:

```bash
cd frontend
npm run build
```

When debugging, capture the exact error, request/response, relevant code, and what changed before asking an AI model to diagnose the issue.
