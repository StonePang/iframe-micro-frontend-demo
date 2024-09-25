# 基于iframe的主子应用message事件demo

demo中的主应用和子应用都是next14搭建的服务端渲染项目，但是iframe组件基于浏览器window事件传参，必须是客户端渲染组件；

子应用可以是普通的spa应用；

demo展示了主/子应用间基于window的`message`事件的数据传递


# 本地启动

```node
  // 安装依赖
  pnpm bootstrap

  // 本地启动
  pnpm dev
```

主应用：http://localhost:3010
子应用：http://localhost:3011

# 其他
node: >=18.17.0