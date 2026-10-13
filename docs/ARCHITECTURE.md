# Architecture

这个项目刻意保持小而完整。目标是让候选人把时间花在业务理解、代码修改和验证上，而不是先研究一个庞大的脚手架。

## 调用链

```text
┌──────────────────────────────┐
│ Browser · localhost:5173     │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│ Vue 3 / TypeScript           │
│ views → api → axios          │
└──────────────┬───────────────┘
               │ /api
               ▼
┌──────────────────────────────┐
│ Vite Dev Proxy               │
└──────────────┬───────────────┘
               │ :8080
               ▼
┌──────────────────────────────┐
│ Spring MVC Controller        │
└──────────────┬───────────────┘
               ▼
┌──────────────────────────────┐
│ Service                      │
│ business rules / transaction │
└──────────────┬───────────────┘
               ▼
┌──────────────────────────────┐
│ MyBatis-Plus Mapper          │
└──────────────┬───────────────┘
               ▼
┌──────────────────────────────┐
│ H2 in-memory database        │
└──────────────────────────────┘
```

## Backend

关键目录：

```text
backend/src/main/java/com/lcysgsg/interview/
├─ common/         通用 API 错误模型
├─ device/         设备业务模块
├─ system/         健康检查
└─ GlobalExceptionHandler.java
```

当前设备模块的职责：

- `DeviceController`：HTTP 输入输出；
- `DeviceService`：业务规则；
- `DeviceMapper`：数据访问；
- `Device`：数据库实体；
- `DeviceRequest`：新增 / 编辑输入校验。

### 当前 API

| Method | Path | Description |
| --- | --- | --- |
| GET | `/api/health` | 服务健康检查 |
| GET | `/api/devices` | 查询设备列表 |
| POST | `/api/devices` | 新增设备 |
| PUT | `/api/devices/{id}` | 编辑设备 |

业务错误统一返回类似：

```json
{
  "code": "BUSINESS_ERROR",
  "message": "设备编号已存在",
  "timestamp": "2026-10-13T17:00:00"
}
```

## Database

H2 使用 MySQL 兼容模式，初始化文件：

- `schema.sql`：表结构；
- `data.sql`：演示数据。

当前 `device` 表只包含基线功能所需字段。面试任务需要的新业务信息，应由候选人根据需求补充。

H2 是内存数据库：

- 刷新浏览器不会丢数据；
- 重启 Spring Boot 会恢复初始数据。

这能保证每次面试很容易回到相同起点。

## Frontend

```text
frontend/src/
├─ api/            HTTP 请求
├─ types/          TypeScript 类型
├─ views/          页面
├─ App.vue
└─ main.ts
```

页面不使用额外状态管理库，因为当前业务规模不需要。新增一个依赖必须有明确收益，而不是为了展示技术栈。

## Baseline quality gate

GitHub Actions 会自动执行：

```bash
cd backend && mvn test
```

以及：

```bash
cd frontend && npm run build
```

它保证候选人拿到的 `main` 分支本身是一个可验证的起点。
