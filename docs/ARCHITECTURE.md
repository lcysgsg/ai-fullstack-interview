# Architecture

## Request flow

```text
Browser :5173
    ↓
Vue 3 / TypeScript
    ↓  /api
Vite Dev Proxy
    ↓  :8080
Spring MVC Controller
    ↓
Service
    ↓
MyBatis-Plus Mapper
    ↓
H2 Database
```

## Backend

```text
backend/src/main/java/com/lcysgsg/interview/
├─ common/
├─ device/
├─ system/
└─ GlobalExceptionHandler.java
```

Device module:

- `DeviceController`: HTTP endpoints
- `DeviceService`: business logic
- `DeviceMapper`: persistence
- `Device`: entity
- `DeviceRequest`: create/update request validation

### Baseline API

| Method | Path | Description |
| --- | --- | --- |
| GET | `/api/health` | Health check |
| GET | `/api/devices` | List devices |
| POST | `/api/devices` | Create device |
| PUT | `/api/devices/{id}` | Update device |

Business errors use a common response shape:

```json
{
  "code": "BUSINESS_ERROR",
  "message": "设备编号已存在",
  "timestamp": "2026-10-13T17:00:00"
}
```

## Database

H2 runs in MySQL compatibility mode.

- `backend/src/main/resources/schema.sql`: schema
- `backend/src/main/resources/data.sql`: seed data
- Browser refresh keeps data
- Backend restart reloads seed data

## Frontend

```text
frontend/src/
├─ api/
├─ types/
├─ views/
├─ App.vue
└─ main.ts
```

## Baseline checks

```bash
cd backend && mvn test
cd frontend && npm run build
```

GitHub Actions runs both checks on the baseline branch.
