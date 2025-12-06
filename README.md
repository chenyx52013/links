# 短链接管理系统

一个功能完整的短链接管理系统，使用 React、TypeScript 和 Prisma ORM 构建，设计用于部署到 Netlify、Vercel 或 Cloudflare Pages。

## 功能特性

- 📦 **URL 缩短**：将长 URL 转换为简短易记的链接
- 🎨 **自定义 Slug**：支持为短链接使用自定义后缀
- 📊 **访问统计**：跟踪链接点击、引荐来源和用户代理
- 🔐 **身份认证**：带有电子邮件/密码认证的安全管理面板
- 💾 **PostgreSQL 数据库**：将链接和分析数据存储在 PostgreSQL 中
- 🌐 **多平台支持**：部署到 Netlify、Vercel 或 Cloudflare Pages
- ⚡ **边缘函数**：使用平台原生边缘函数实现快速重定向
- 🎯 **响应式设计**：移动端友好的管理面板

## 技术栈

### 前端
- **框架**：React 18
- **类型系统**：TypeScript
- **构建工具**：Vite
- **样式**：Tailwind CSS
- **UI 组件**：Radix UI
- **表单处理**：React Hook Form

### 后端
- **ORM**：Prisma
- **数据库**：PostgreSQL
- **认证**：Auth.js
- **边缘函数**：平台原生函数

## 快速开始

### 前置条件

- Node.js 18+（用于本地开发）
- PostgreSQL 数据库（用于生产环境）
- Git

### 本地开发

1. **克隆仓库**
   ```bash
   git clone https://github.com/yourusername/short-link-system.git
   cd short-link-system
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **配置环境变量**
   - 将 `.env.example` 复制为 `.env`
   - 使用您的 PostgreSQL 连接字符串更新 `DATABASE_URL`
   - 设置安全的 `AUTH_SECRET`

4. **运行数据库迁移**
   ```bash
   npx prisma migrate dev
   ```

5. **启动开发服务器**
   ```bash
   npm run dev
   ```

6. **打开浏览器**
   导航至 `http://localhost:3000`

## 部署

### 部署到 Netlify

1. **连接仓库**
   - 前往 [Netlify](https://app.netlify.com/)
   - 点击 "Add new site" → "Import an existing project"
   - 连接到您的 GitHub 仓库

2. **配置构建设置**
   - 构建命令：`npm run build`
   - 发布目录：`dist`

3. **设置环境变量**
   - 转到站点设置 → 环境变量
   - 添加 `.env` 中的所有变量

4. **部署站点**
   - 点击 "Deploy site"

### 部署到 Vercel

1. **连接仓库**
   - 前往 [Vercel](https://vercel.com/)
   - 点击 "Add New"
   - 导入您的 GitHub 仓库

2. **配置构建设置**
   - 框架预设：Vite
   - 构建命令：`npm run build`
   - 输出目录：`dist`

3. **设置环境变量**
   - 在环境变量部分添加 `.env` 中的所有变量

4. **部署**
   - 点击 "Deploy"

### 部署到 Cloudflare Pages

1. **连接仓库**
   - 前往 [Cloudflare Pages](https://dash.cloudflare.com/)
   - 点击 "Create a project"
   - 连接到您的 GitHub 仓库

2. **配置构建设置**
   - 框架：Vite
   - 构建命令：`npm run build`
   - 构建输出目录：`dist`

3. **设置环境变量**
   - 在环境变量部分添加 `.env` 中的所有变量

4. **部署站点**
   - 点击 "Save and Deploy"

## 数据库配置

### PostgreSQL 设置

1. **创建 PostgreSQL 数据库**
   ```bash
   # 使用 PostgreSQL CLI
   createdb short-links
   
   # 使用 Docker
   docker run --name short-links-db -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
   ```

2. **连接字符串格式**
   ```
   postgresql://username:password@host:port/database?schema=public
   ```

3. **示例连接字符串**
   ```
   # 本地 PostgreSQL
   postgresql://postgres:postgres@localhost:5432/short-links?schema=public
   
   # Supabase
   postgresql://postgres:your-supabase-password@db.your-project.supabase.co:5432/postgres?schema=public
   
   # Railway
   postgresql://postgres:your-railway-password@containers-us-west-123.railway.app:1234/railway
   ```

### 数据库迁移

1. **创建新迁移**
   ```bash
   npx prisma migrate dev --name migration-name
   ```

2. **在生产环境中运行迁移**
   ```bash
   npx prisma migrate deploy
   ```

3. **查看数据库架构**
   ```bash
   npx prisma studio
   ```

## 环境变量

| 变量名 | 描述 | 必填 | 默认值 |
|--------|------|------|--------|
| `DATABASE_URL` | PostgreSQL 连接字符串 | ✅ | - |
| `AUTH_SECRET` | 认证密钥 | ✅ | - |
| `AUTH_TRUST_HOST` | 是否信任主机 | ❌ | `false` |
| `NODE_ENV` | 运行环境（development/production） | ❌ | `development` |
| `BASE_URL` | 短链接基础 URL | ❌ | `http://localhost:3000` |
| `REDIS_URL` | Redis 连接字符串（可选） | ❌ | - |

## 项目结构

```
short-link-system/
├── public/                # 静态资源
├── src/
│   ├── components/        # React 组件
│   ├── pages/             # 页面组件
│   ├── lib/               # 工具函数
│   │   ├── db/            # 数据库连接
│   │   ├── auth/          # 认证逻辑
│   │   └── utils/         # 辅助函数
│   ├── types/             # TypeScript 类型定义
│   └── hooks/             # 自定义 React Hooks
├── functions/             # 边缘函数
│   ├── api/               # API 端点
│   └── redirect.ts        # 短链接重定向函数
├── prisma/                # Prisma 配置
├── netlify.toml           # Netlify 配置
├── vercel.json            # Vercel 配置
├── wrangler.toml          # Cloudflare Pages 配置
└── package.json           # 项目依赖
```

## API 端点

### 链接 API

- `GET /api/links` - 获取当前用户的所有短链接
- `POST /api/links` - 创建新短链接
- `PUT /api/links` - 更新短链接
- `DELETE /api/links` - 删除短链接

### 统计 API

- `GET /api/stats?linkId=:id` - 获取短链接的点击统计

## 身份认证

应用使用 Auth.js 进行身份认证。目前支持的方法：
- 电子邮件/密码认证

### 认证流程

1. 用户访问管理面板
2. 如果未认证，重定向到登录页面
3. 用户使用电子邮件和密码登录
4. Auth.js 创建安全会话
5. 用户访问管理面板

## 性能优化

### 短链接重定向
- 使用边缘函数实现低延迟重定向
- 数据库查询通过索引优化
- 可选的 Redis 缓存，用于频繁访问的链接

### 前端性能
- 使用 React.lazy() 进行代码分割
- 图片优化
- 最小化依赖
- 使用 React Hooks 实现高效渲染

## 安全性

- **输入验证**：所有用户输入都经过验证
- **SQL 注入防护**：使用 Prisma ORM 和参数化查询
- **XSS 防护**：实现内容安全策略 (CSP)
- **CSRF 防护**：使用 Auth.js 内置的 CSRF 保护
- **密码哈希**：使用 bcrypt 存储密码
- **速率限制**：API 端点有限速保护

## 自定义

### 添加新功能

1. **向 Prisma schema 添加新模型**
   ```prisma
   // prisma/schema.prisma
   model NewFeature {
     id String @id @default(cuid())
     // 字段定义
   }
   ```

2. **生成 Prisma 客户端**
   ```bash
   npx prisma generate
   ```

3. **创建 API 端点**
   ```typescript
   // functions/api/new-feature.ts
   export const handler = async (req: Request) => {
     // API 逻辑
   }
   ```

4. **添加前端组件**
   ```typescript
   // src/components/NewFeatureComponent.tsx
   const NewFeatureComponent = () => {
     // 组件逻辑
   }
   ```

### 自定义样式

- 修改 `tailwind.config.js` 自定义颜色、字体等
- 更新 `src/index.css` 进行全局样式修改
- 使用 Tailwind 工具类进行组件特定样式设计

## 贡献

1. Fork 仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 许可证

根据 MIT 许可证分发。有关更多信息，请参见 `LICENSE`。

## 故障排除

### 常见问题

1. **数据库连接错误**
   - 检查 `DATABASE_URL` 环境变量
   - 确保 PostgreSQL 服务器正在运行
   - 验证数据库凭据

2. **部署失败**
   - 检查构建日志中的错误
   - 确保所有环境变量都已设置
   - 验证构建命令和输出目录

3. **认证问题**
   - 检查 `AUTH_SECRET` 环境变量
   - 验证电子邮件和密码是否正确
   - 检查浏览器开发者控制台中的错误

### 支持

- 对于 bug 报告，请在 GitHub 上打开一个 issue
- 对于问题，请加入我们的 Discord 社区
- 对于功能请求，请提交一个 pull request




## 致谢

- 灵感来自流行的 URL 缩短服务，如 Bitly 和 TinyURL
- 使用现代 Web 技术构建
- 设计注重性能和可扩展性
- 开源且社区驱动

---

使用 React、TypeScript 和 Prisma 构建 ❤️
注：这玩意是Trae SOLO模式写的，作为自用。