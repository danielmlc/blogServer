## nestjs学习笔记


### 常用vscode插件

    npm
    TSLint
    Typescript Hero
    .gitignore Generator
    Beautify -- 代码格式化
    DotENV -- .env文件高亮
    Jest -- nest默认测试框架支持


### 在nest中构建项目或文件

new(简写：n) 构建新项目
```
$ nest new my-awesome-app
OR
$ nest n my-awesome-app
```

    generate(简写：g) 生成文件
    class (简写: cl) 类
    controller (简写: co) 控制器
    decorator (简写: d) 装饰器
    exception (简写: e) 异常捕获
    filter (简写: f) 过滤器
    gateway (简写: ga) 网关
    guard (简写: gu) 守卫
    interceptor (简写: i) 拦截器
    middleware (简写: mi) 中间件
    module (简写: mo) 模块
    pipe (简写: pi) 管道
    provider (简写: pr) 供应商
    service (简写: s) 服务
    创建一个users服务文件

```
$ nest generate service users
OR
$ nest g s users

```
> 注意：
必须在项目根目录下创建，（默认创建在src/）。（不能在当前文件夹里面创建，不然会自动生成xxx/src/xxx。）
需要优先新建模块，不然创建的非模块以外的服务，控制器等就会自动注入更新到上级的模块里面


