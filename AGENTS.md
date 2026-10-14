# AGENTS.md

## Project

- Backend: Java 17, Spring Boot 4.1, MyBatis-Plus, H2
- Frontend: Vue 3, TypeScript, Vite 8, Element Plus
- Backend: `http://localhost:8080`
- Frontend: `http://localhost:5173`
- Vite proxies `/api` to the backend
- H2 is in-memory; backend restart resets seed data

Read `CANDIDATE.md` before making task-related changes.

## Working rules

- Follow the existing project structure and naming conventions.
- Prefer small, focused changes.
- Do not add frameworks or dependencies without a clear need.
- Do not rewrite working modules wholesale.
- Enforce data-integrity and business-state rules on the backend.
- Keep code simple and readable.
- Do not modify `README.md`, `CANDIDATE.md`, `AGENTS.md`, or files under `docs/` unless explicitly requested.
- Do not remove or weaken baseline tests to make changes pass.

## Relevant paths

- `backend/src/main/java/com/lcysgsg/interview/device/`
- `backend/src/main/resources/schema.sql`
- `frontend/src/api/`
- `frontend/src/types/`
- `frontend/src/views/DeviceList.vue`

## Validation

```bash
cd backend
mvn test
```

```bash
cd frontend
npm run build
```
