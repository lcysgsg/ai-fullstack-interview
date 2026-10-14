# AI Fullstack Interview · 设备资产台账

[![Baseline Check](https://github.com/lcysgsg/ai-fullstack-interview/actions/workflows/baseline-check.yml/badge.svg)](https://github.com/lcysgsg/ai-fullstack-interview/actions/workflows/baseline-check.yml)

这是一个面向 **0～3 年初级全栈开发（Java + Vue）** 的 AI 协作实操项目。

项目刻意保持小而完整：候选人不需要从零搭框架，而是在一个已经可运行、可验证的基线上完成真实的小需求。

> **如果你是候选人，请先看 [CANDIDATE.md](./CANDIDATE.md)。** 其他架构、排错和 Agent 文档都是辅助材料，不需要在开始前全部读完。

## 候选人快速开始

1. Clone 仓库到本地；
2. 启动后端和前端；
3. 页面右上角出现 **API 已连接** 后，再开始正式开发。

默认不需要 Fork、PR 或 push，最终本地演示即可；如面试官有其他交付要求，以现场说明为准。

## 5 分钟了解项目

```text
Browser
  │
  │  http://localhost:5173
  ▼
Vue 3 + TypeScript + Element Plus
  │
  │  /api proxy
  ▼
Spring Boot + MyBatis-Plus
  │
  ▼
H2 in-memory database
```

当前基线已经实现：

- 设备列表；
- 新增设备；
- 编辑设备；
- 前后端基础校验；
- 统一错误返回；
- API 健康检查；
- H2 初始化数据；
- 后端基线测试；
- GitHub Actions 自动构建检查。

需要了解调用链时再看 [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)。

## 推荐启动方式：本地开发

### 环境

- JDK 17+
- Maven 3.6.3+（3.9+ 推荐）
- Node.js 20.19+ 或 22.12+（Node 22 推荐）
- npm 10+

先运行环境自检：

Windows PowerShell：

```powershell
./scripts/check-env.ps1
```

macOS / Linux：

```bash
bash ./scripts/check-env.sh
```

### 启动后端

```bash
cd backend
mvn spring-boot:run
```

后端地址：`http://localhost:8080`

健康检查：`http://localhost:8080/api/health`

H2 Console：`http://localhost:8080/h2-console`

- JDBC URL：`jdbc:h2:mem:interview`
- User：`sa`
- Password：留空

### 启动前端

另开一个终端：

```bash
cd frontend
npm install
npm run dev
```

前端地址：`http://localhost:5173`

如果页面右上角显示 **API 已连接**，说明基础环境正常。

> 面试场景下，依赖安装和环境排查不属于能力考察。正式开发计时建议从基线页面正常运行后开始。

## 备用启动方式：Docker

如果本机 Java / Maven / Node 环境不方便，可使用：

```bash
docker compose up --build
```

然后访问 `http://localhost:5173`。

Docker 是环境兜底方案，不是考试内容。候选人不需要掌握 Docker 才能完成本题。

## 项目结构

```text
.
├─ AGENTS.md                 # 给 AI Coding Agent 的项目上下文
├─ CANDIDATE.md              # 候选人任务说明
├─ compose.yaml              # Docker 备用启动
├─ scripts/                  # 环境自检
├─ docs/
│  ├─ ARCHITECTURE.md        # 结构与调用链
│  └─ TROUBLESHOOTING.md     # 常见环境问题
├─ backend/                  # Spring Boot API
└─ frontend/                 # Vue 3 Web
```

## 为什么允许 AI

AI 已经是现代研发工具的一部分。这个项目不测试“离开工具以后能记住多少”，而更关注：

- 能否把当前代码和约束准确交给 AI；
- 能否拆解问题，而不是一句话让 AI 重写整个项目；
- 能否阅读、运行和验证 AI 的产出；
- AI 出错时是否知道去看日志、请求、数据库和上下文；
- 是否对最终交付负责，而不是把判断权交给模型。

因此仓库从结构开始就对 AI 协作友好，但最终代码仍需要开发者自己理解。

## 技术栈

- Java 17
- Spring Boot 4.1.1
- MyBatis-Plus 3.5.17
- H2
- Vue 3.5
- TypeScript
- Vite 8
- Element Plus 2.14

版本选择以稳定、主流和较低环境成本为原则，不使用预览版本。
