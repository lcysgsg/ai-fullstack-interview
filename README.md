# AI Fullstack Interview · 设备资产台账

[![Baseline Check](https://github.com/lcysgsg/ai-fullstack-interview/actions/workflows/baseline-check.yml/badge.svg)](https://github.com/lcysgsg/ai-fullstack-interview/actions/workflows/baseline-check.yml)

这是一个面向 **0～3 年初级全栈开发（Java + Vue）** 的 AI 协作实操项目。

我们刻意把业务规模缩小，但保留真实研发里最常见的事情：阅读已有项目、理解数据流、修改前后端、处理错误、验证结果，以及判断 AI 给出的代码是否真的适合当前工程。

> 这不是算法闯关，也不是“禁止 AI 的闭卷考试”。我们希望看到的是：有工具的情况下，你能不能把一个小需求可靠地做完，并理解自己交付的代码。

候选人请从 **[CANDIDATE.md](./CANDIDATE.md)** 开始。

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

架构说明见 [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)。

## 推荐启动方式：本地开发

### 环境

- JDK 17+
- Maven 3.9+
- Node.js 22+
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

## 备用启动方式：Docker

如果本机 Java / Maven / Node 环境不方便，可使用：

```bash
docker compose up --build
```

然后访问 `http://localhost:5173`。

> Docker 是环境兜底方案，不是考试内容。候选人不需要掌握 Docker 才能完成本题。

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

## 我们为什么允许 AI

AI 已经是现代研发工具的一部分。单纯禁止 AI，只能测试“离开工具后能记住多少”；而实际研发更需要：

- 能把当前代码和约束准确交给 AI；
- 能拆解问题，而不是一句话让 AI 重写整个项目；
- 能阅读、运行和验证 AI 的产出；
- AI 出错时知道去看日志、请求、数据库和上下文；
- 对最终交付负责，而不是把判断权交给模型。

因此本项目从仓库结构开始就对 AI 协作友好，但最终代码仍需要候选人自己理解。

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
