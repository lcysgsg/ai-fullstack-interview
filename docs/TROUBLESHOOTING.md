# Troubleshooting

这份文档用于减少环境问题对面试的干扰。环境配置不是本次实操的核心考察项。

## 先运行环境自检

Windows：

```powershell
./scripts/check-env.ps1
```

macOS / Linux：

```bash
bash ./scripts/check-env.sh
```

## Java 版本不对

确认：

```bash
java -version
mvn -version
```

项目要求 JDK 17 或更高版本。`mvn -version` 输出中的 Java home 应该指向可用 JDK。

## 8080 端口被占用

Windows：

```powershell
Get-NetTCPConnection -LocalPort 8080 -ErrorAction SilentlyContinue
```

macOS / Linux：

```bash
lsof -i :8080
```

也可以临时指定端口：

```bash
cd backend
mvn spring-boot:run -Dspring-boot.run.arguments="--server.port=8081"
```

如果改后端端口，同时设置前端代理目标：

```bash
VITE_API_PROXY_TARGET=http://localhost:8081 npm run dev
```

PowerShell：

```powershell
$env:VITE_API_PROXY_TARGET="http://localhost:8081"
npm run dev
```

## 5173 端口被占用

Vite 会提示端口冲突。可以使用：

```bash
npm run dev -- --port 5174
```

## 页面显示 API 未连接

按顺序检查：

1. `http://localhost:8080/api/health` 是否能打开；
2. 后端终端是否存在启动异常；
3. 浏览器 DevTools → Network 中 `/api/health` 的状态；
4. Vite 是否通过 `localhost:5173` 启动，而不是直接打开 HTML 文件。

## npm install 失败

先确认：

```bash
node -v
npm -v
```

推荐 Node.js 22。若公司网络、代理或 npm registry 导致依赖无法下载，请直接告诉面试官，不要把大量测试时间消耗在网络环境上。

## H2 数据为什么不见了

这是预期行为。当前使用内存数据库，Spring Boot 进程重启后会重新执行 `schema.sql` 和 `data.sql`。

浏览器刷新不会重置数据。

## H2 Console

地址：`http://localhost:8080/h2-console`

- JDBC URL：`jdbc:h2:mem:interview`
- User：`sa`
- Password：空

可以在这里直接查看表和数据，用于 Debug。

## 实在无法启动

可以使用 Docker 兜底：

```bash
docker compose up --build
```

如果仍然是环境问题，请停止折腾环境并告诉面试官。我们更希望把时间用于观察开发与解决问题的能力。
