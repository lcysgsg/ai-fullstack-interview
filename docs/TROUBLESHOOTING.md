# Troubleshooting

## Environment check

Windows:

```powershell
./scripts/check-env.ps1
```

macOS / Linux:

```bash
bash ./scripts/check-env.sh
```

## Java or Maven

```bash
java -version
mvn -version
```

Use JDK 17 or later. Confirm Maven is using the expected JDK.

## Port 8080 in use

Windows:

```powershell
Get-NetTCPConnection -LocalPort 8080 -ErrorAction SilentlyContinue
```

macOS / Linux:

```bash
lsof -i :8080
```

Run the backend on another port if needed:

```bash
cd backend
mvn spring-boot:run -Dspring-boot.run.arguments="--server.port=8081"
```

Then set the frontend proxy target:

```bash
VITE_API_PROXY_TARGET=http://localhost:8081 npm run dev
```

PowerShell:

```powershell
$env:VITE_API_PROXY_TARGET="http://localhost:8081"
npm run dev
```

## Port 5173 in use

```bash
npm run dev -- --port 5174
```

## API not connected

Check:

1. `http://localhost:8080/api/health`
2. Backend startup logs
3. Browser DevTools → Network → `/api/health`
4. Frontend is running through Vite, not opened as a local HTML file

## npm install fails

```bash
node -v
npm -v
```

Use a supported Node.js version. If dependency download is blocked by network or registry settings, notify the interviewer.

## H2 data reset

H2 is configured as an in-memory database. Restarting Spring Boot reloads `schema.sql` and `data.sql`. Browser refresh does not reset data.

H2 Console: `http://localhost:8080/h2-console`

- JDBC URL: `jdbc:h2:mem:interview`
- User: `sa`
- Password: empty

## Docker fallback

```bash
docker compose up --build
```
