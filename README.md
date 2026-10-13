# AI Fullstack Interview

一个面向 **0～3 年初级全栈开发（Java + Vue）** 的 AI 协作实操测试项目。

目标不是考复杂算法或背诵框架知识，而是观察候选人是否能够：

- 阅读并理解已有代码；
- 使用任意 AI 工具辅助完成真实的小需求；
- 对 AI 生成的代码进行基本判断和复核；
- 遇到报错时能够定位、提供上下文并解决问题；
- 解释自己最终提交的核心代码。

> 候选人请直接阅读 [CANDIDATE.md](./CANDIDATE.md)。

## 项目结构

```text
ai-fullstack-interview/
├─ backend/       Spring Boot + MyBatis Plus + H2
├─ frontend/      Vue 3 + TypeScript + Element Plus
└─ CANDIDATE.md   候选人测试说明
```

## 环境要求

- JDK 17+
- Maven 3.9+
- Node.js 20+
- npm 10+

## 启动后端

```bash
cd backend
mvn spring-boot:run
```

后端默认地址：`http://localhost:8080`

H2 Console：`http://localhost:8080/h2-console`

连接信息：

- JDBC URL：`jdbc:h2:mem:interview`
- User：`sa`
- Password：留空

## 启动前端

```bash
cd frontend
npm install
npm run dev
```

前端默认地址：`http://localhost:5173`

Vite 已将 `/api` 代理到 `http://localhost:8080`。

## 基础功能

初始项目已经完成：

- 设备列表；
- 新增设备；
- 编辑设备；
- 基础表单校验；
- 后端基本业务校验；
- H2 初始化数据。

候选人无需从零搭项目，只需基于现有代码完成指定需求。
