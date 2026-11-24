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

## Async assessment contract

- Follow the single assigned task in CANDIDATE.md; open discussion is optional and does not require implementation.
- The candidate owns decisions and checks final diff, actual test outcomes, and pushed commit. Keep default config portable; local DB and secrets must not be committed.
- Run the baseline HTTP check and the assigned public task check with the local backend running. Initial task checks are expected to fail; never edit checks to hide failures. State blocked, failing, or unrun checks honestly. Preserve existing tests.
- Do not expand the task solely to finish every optional item. Follow SUBMISSION.md; no fabricated logs or claims.
