# HTTP 协议用于客户端和服务器之间通信

客户端： 请求资源的一端

服务端： 响应资源的一端

# 通过请求和响应的交换达成通信

肯定是先由客户端建立通信，然后服务端再进行响应

# HTTP 是不保存状态的协议（无状态协议）

HTTP 协议自身不对请求和响应之间的通信状态进行保存。也就是说在 HTTP 这个级别，协议对于发送过的请求或响应都不做持久化处理

为了实现保存状态的功能，引入了 COOKIE（管理状态）

# 请求 URI 定位资源

HTTP 使用 URI 定位网络上的资源，可以访问到任意位置资源

# 告知服务器意图的 HTTP 请求方法

1. GET： 获取资源

2. POST： 传输资源实体的主题

3. PUT

4. HEAD： 获取报文首部，无主体

5. DELETE： 删除资源

6. OPTIONS： 询问支持的方法

7. TRACE：追踪路径

8. CONNECT： 要求用隧道协议连接代理

# 使用方法下达命令

# 持久连接减少通信量

最初始的 HTTP 协议，每进行一次 HTTP 通信，就需要建立&断开一次 TCP 连接

## 持久连接

只要任意一端没有明确提出断开连接，则保持 TCP 连接状态。

旨在建立 1 次 TCP 连接后进行多次请求和响应的交互

优点：减少了 TCP 连接的重复建立和断开所造成的开销，减轻了服务器端的负载。节省的建立&断开连接的那部分时间可以进行 HTTP 请求的发送，使得网页的响应速度也变快

**在 HTTP/1.1 中，所有的连接默认都是持久连接，HTTP1.0 则不是**

## 管线化

持久连接使得多数请求以管线化（pipelining）方式发送成为可能

从前发送请求后需等待并收到响应，才能发送下一个请求。管线化技术出现后，不用等待响应亦可直接发送下一个请求。

**持久连接**使得客户端可以并行的发送请求，不需要等待前一个请求的响应结果，而且响应的返回顺序与请求发送顺序一致

# 使用 COOKIE 的状态管理

无状态协议当然也有它的优点。由于不必保存状态，自然可减少服务器的 CPU 及内存资源的消耗。

Cookie 技术通过在请求和响应报文中写入 Cookie 信息来控制客户端的状态。

响应报文中的 set-cookie 字段用于存储通知客户端存储 cookie 信息，下次向该 URL 发送请求的时候会将 cookie 信息携带于请求报文的 cookie 字段中发送到服务器
