# OpenGpt

网址：https://open-gpt.app/

最近看到了非常多基于 #OpenAI 的项目。我们每个人都应该具有创建这些项目的能力，从而解决自己的问题。
我准备创建一个 AI 平台，让所有用户都可以使用并创建 #ChatGPT 小应用。开源！
会在 [Twitter](https://twitter.com/EclipsePrayer) 上实时推送进展，欢迎点赞关注!

[![OpenGpt](./public/screenshot.png)](https://twitter.com/EclipsePrayer)

# 本地设置
首先，安装该项目所需的依赖项。运行下面的命令。
```bash
npm install next react react-dom
npm install package.json
```
MySQL的设置
接下来，在你的本地机器上设置MySQL。按照以下步骤：使用以下命令拉出MySQL Docker镜像。
```bash
docker pull mysql
```
用以下命令启动一个名为`mysql'的新Docker容器
```bash
docker run --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password -d mysql:8
```

这将启动一个新的MySQL实例，根密码设置为```password```。在MySQL数据库中创建一个名为```OpenGptApp```的表。使用以下命令来创建表格：
```sql
CREATE TABLE OpenGptApp (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(255),
  hint TEXT,
  demoInput TEXT,
  prompt TEXT,
  usedCount INT(11) DEFAULT 0,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) 
```
运行项目

现在你已经设置了依赖关系和MySQL，你可以运行该项目。按照以下步骤：设置环境变量``SKIP_ENV_VALIDATION``为``dev````。
```bash
输出SKIP_ENV_VALIDATION=dev
```
设置环境变量`DATABASE_URL`为`mysql://root:password@localhost:3306/app`。

```bash
export DATABASE_URL=mysql://root:password@localhost:3306/app
```

在开发模式下运行该项目。
```bash
npm run dev
```

这将启动该项目，你可以在 `http://localhost:3000/` 访问。


## 计划的功能

- [x] 用户可以直接运行每一个 App
  - ✅ 2023-03-04 上线第一个 App “Free Style 说唱歌词生成器”
  - ✅ 2023-03-05 上线共 6 款 App，砖已足够，需要引玉
- [x] 用户可以创建自己的 App
  - ✅ 2023-03-08 用户可以创建自己的 App，第一阶段计划完成
  - ✅ 2023-03-08 上线第一天，用户已经创建了 100 多个 App！🤯
  - ✅ 2023-03-11 用户创建的 App 数量超过 800！🤯🤯🤯
- [x] 支持用户使用自己的 API token，从而放开 rate limit 限制

下一阶段计划

- [ ] 整理一些明显不好用的 App，在首页隐藏不显示
- [ ] 加入用户登录功能
- [ ] 可以点赞，并可以据此排序
- [ ] 可以收藏，创建属于自己的 App 应用列表
- [ ] 为 App 添加标签
- [ ] 可以创建只属于自己的私有 App
- [ ] i18n 国际化支持


## 共同建设

加入 [Discord](https://discord.gg/84J7aMyyCG)，我们一起讨论产品未来
