# Full-Stack Engineering Exercise

[![Baseline Check](https://github.com/lcysgsg/ai-fullstack-interview/actions/workflows/baseline-check.yml/badge.svg)](https://github.com/lcysgsg/ai-fullstack-interview/actions/workflows/baseline-check.yml)

一个用于全栈开发实操的精简项目，技术栈为 Java + Vue。项目提供可运行的设备资产台账基线，候选人在现有代码上完成指定业务需求。

候选人请阅读 [CANDIDATE.md](./CANDIDATE.md)。

## 基线功能

- 设备列表
- 新增设备
- 编辑设备
- 前后端参数校验
- 统一错误返回
- API 健康检查
- H2 初始化数据
- 后端基线测试
- GitHub Actions 构建检查

## 环境要求

- JDK 17+
- Maven 3.6.3+（推荐 3.9+）
- Node.js 22.12+（与前端 engines 要求一致）
- npm 10+

可先运行环境检查：

```powershell
# Windows PowerShell
./scripts/check-env.ps1
```

```bash
# macOS / Linux
bash ./scripts/check-env.sh
```

## 本地启动

后端：

```bash
cd backend
mvn spring-boot:run
```

- API: `http://localhost:8080`
- Health: `http://localhost:8080/api/health`
- H2 Console: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:interview`
- User: `sa`
- Password: 空

前端：

```bash
cd frontend
npm install
npm run dev
```

访问 `http://localhost:5173`。页面右上角显示 **API 已连接** 即表示基线服务正常。

## Docker 启动

本地环境不便时可使用：

```bash
docker compose up --build
```

访问 `http://localhost:5173`。

## 项目结构

```text
.
├─ CANDIDATE.md
├─ AGENTS.md
├─ compose.yaml
├─ scripts/
├─ docs/
│  ├─ ARCHITECTURE.md
│  └─ TROUBLESHOOTING.md
├─ backend/
└─ frontend/
```

## 技术栈

- Java 17
- Spring Boot 4.1.1
- MyBatis-Plus 3.5.17
- H2
- Vue 3.5
- TypeScript
- Vite 8
- Element Plus 2.14

架构与调用链见 [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)，环境问题见 [docs/TROUBLESHOOTING.md](./docs/TROUBLESHOOTING.md)。

## 异步考察与公开检查

- 先阅读 [CANDIDATE.md](./CANDIDATE.md)，按指定任务完成；[SUBMISSION.md](./SUBMISSION.md) 提供简短交付模板。
- 建议实际投入 45 分钟（含验证及交付说明），环境准备单独估计；允许部分完成，后续约 15 分钟代码交流。
- 从仓库根目录运行以下命令。HTTP 检查需运行本地后端（默认 http://127.0.0.1:8080，可设 API_BASE_URL）；仅用于模拟数据，脚本会写入新的验收记录，不要连接生产环境。

```bash
node scripts/check-env.mjs
node scripts/baseline-http-smoke.mjs
node scripts/check-task.mjs
```

基线检查检验原有功能（初始仓库应通过），任务检查检验新需求（未修复前预期失败）。每个场景独立生成数据，重复执行无需手工清表；重启 H2 内存后端可清理全部模拟记录。输出 PASS/FAIL 和汇总，退出码 0 为全部通过、1 为存在失败、2 为环境阻塞/调用方式错误。HTTP 结果不等于浏览器验收；前端页面请按题单手工检查。现有 Maven 测试、前端构建和 CI 仍保留。

### 停用接口适配（可选）

默认调用 PATCH /api/devices/{id}/disable，JSON reason，列表字段 disabledReason、disabledAt。可通过以下环境变量适配其他等价契约：

| 变量 | 默认值 |
| --- | --- |
| DISABLE_PATH | /api/devices/{id}/disable |
| DISABLE_METHOD | PATCH |
| DISABLE_INPUT_KEY | reason |
| DISABLED_REASON_KEY | disabledReason |
| DISABLED_TIME_KEY | disabledAt |

例如 Bash: DISABLE_METHOD=POST node scripts/check-task.mjs；PowerShell: $env:DISABLE_METHOD="POST"; node scripts/check-task.mjs。其他接口结构可附等价验证说明。
