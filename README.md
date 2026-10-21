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
