# HTTP 报文首部

首部内容为客户端和服务器分别处理请求和响应提供所需要的信息。

## HTTP 请求报文

HTTP 请求报文由方法、URI、HTTP 版本、HTTP 首部字段等部分构成。

## HTTP 响应报文

HTTP 报文由 HTTP 版本、状态码（数字和原因短语）、HTTP 首部字段 3 部分构成

# HTTP 首部字段

## HTTP 首部字段传递重要信息

HTTP 首部字段是构成 HTTP 报文的要素之一。

## HTTP 首部字段结构

```
首部字段名：首部字段值

eg:

// 单个值

Content-Type: text/html

// HTTP 首部有多个值时
Keep-Alive: timeout=15, max=100
```

**若 HTTP 首部字段重复了会如何**

这种情况在规范内尚未明确，根据浏览器内部处理逻辑的不同，结果可能并不一致。有些浏览器会优先处理第一次出现的首部字段，而有些则会优先处理最后出现的首部字段。

##  四种 HTTP 首部字段类型

### 通用首部字段

请求报文和响应报文双方都会使用的字段

### 请求首部字段

从客户端向服务器端发送请求报文时使用的首部。

### 响应首部字段

从服务器端向客户端返回响应报文时使用的首部。

### 实体首部字段

针对请求报文和响应报文的实体部分使用的首部。

## HTTP 1.1 首部字段一览

### 通用首部字段

- Cache-Control

- Connection

- Date --- 创建报文的日期时间

- Pragma --- 报文指令

- Trailer --- 报文末端的首部一览

- Transfer-Encoding --- 指定报文主体的传输编码方式

- Upgrade --- 升级为其它协议

- Via --- 代理服务器的相关信息

- Warning --- 错误通知

### 请求首部字段

- Accept

- Accept-Encoding

- Accept-Language

- Accept-Charset

- Authorization

- Expect --- 期待服务器的特定行为

- From --- 用户的电子邮箱地址

- Host --- 请求资源所在的服务器地址

- If-Match

- If-None-Match

- If-Modified-Since

- If-Unmodified-Since

- If-Range --- 资源未更新时发送实体 Byte 的范围请求

- Max-Forwards --- 最大传输逐跳数

- Proxy-Authorization

- Range --- 实体的字节范围请求

- Referer --- 对请求中 URI 的原始获取方（也就是客户端的域名）

- TE --- 传输编码的优先级

- User-Agent --- 客户端程序信息

### 响应首部字段

- Accept-Ranges --- 是否接受字节范围请求

- Age --- 推算资源创建经过的时间

- Etag

- Location --- 客户端重定向至的 URI

- Retry-After --- 再次发起请求的实际

- Proxy-Authenticate --- 代理服务器对客户端的认证信息

- Server --- 服务器的安装信息

- Vary --- 代理服务器缓存的管理信息

- WWW-Authenticate --- 服务器对客户端的认证信息

### 实体首部字段

- Allow --- 实体支持的方法

- Content-Encoding

- Content-Language

- Content-Length

- Content-Location --- 替代资源对应的 URI

- Content-MD5

- Content-Range --- 实体主体的位置范围

- Content-Type

- Expires --- 实体主体资源过期的时间

- Last-Modified --- 资源最后的修改日期

## 非 HTTP 1.1 首部字段

Cookie、Set-Cookie 和 Content-Disposition 等

## End-to-end 首部和 Hop-by-hop 首部

### 端到端首部（End-to-end）

会转发给请求/响应对应的最终接收目标，且必须保存在由缓存生成的响应中，另外规定它必须被转发。

### 逐跳首部（Hop-by-hop）

分在此类别中的首部只对单次转发有效，会因通过缓存或代理而不再转发。

HTTP/1.1 和之后版本中，如果要使用 hop-by-hop 首部，需提供 Connection 首部字段。

- Connection

- Keep-Alive

- Proxy-Authenticate

- Proxy-Authorization

- Trailer

- TE

- Transfer-Encoding

- Upgrade

上面几字段是逐跳字段，除这几个字段之外，其余都是端到端字段

# HTTP 1.1 通用首部字段

## Cache-Control 控制缓存

多个指令之间使用 , 分割

```
Cache-Control: no-cache, max-age=0, private
```

缓存请求指令

1. no-cache 可以缓存，但是不直接使用，向源服务器发送请求验证资源的有效性（中间服务器不缓存资源）

2. no-store 不缓存

3. max-age = xx s 响应最大的 age 值

另外，当指定 max-age 值为 0，那么缓存服务器通常需要将请求转发给源服务器。

4. max-stale = xx s 接受已经过期的响应

5. min-fresh = xx s 期望在指定时间内响应仍有效

6. no-transform 代理不可更改媒体类型

7. only-if-cached 从缓存中获取资源

8. cache-extension 新指令标记

缓存响应指令

1. no-cache 可以缓存，但是不直接使用，向服务器发送请求验证资源的有效性

2. no-store 不缓存

3. max-age = xx s 响应最大的 age 值

4. no-transform 代理不可更改媒体类型

5. cache-extension 新指令标记

6. public 可以向任意方提供缓存的响应

7. private 仅向特定用户返回响应

8. must-revalidate 可以缓存但必须再次向原服务器进行确认

9. proxy-revalidate 要求缓存服务器确实缓存有效性

10. s-maxage

用 HTTP/1.1 版本的缓存服务器遇到同时存在 Expires 首部字段的情况时，会优先处理 max-age 指令，而忽略掉 Expires 首部字段。而 HTTP/1.0 版本的缓存服务器的情况却相反，max-age 指令会被忽略掉。

## Connection

1. 控制不再转发给代理的首部

2. 管理持久链接

### 控制不再转发给代理的首部

```
Connection: 字段名称（hop by hop 字段）
```

- Connection

- Keep-Alive

- Proxy-Authenticate

- Proxy-Authorization

- Trailer

- TE

- Transfer-Encoding

- Upgrade

### 管理持久连接

```
Connection: close/Keep-Alive
```

客户端发送请求(Connection: Keep-Alive)给服务器时，服务器端会像上图那样加上首部字段 Keep-Alive 及首部字段 Connection 后返回响应。

## Date

部字段 Date 表明创建 HTTP 报文的日期和时间。

## Tailer

说明在报文主体之后记录了哪些首部字段

## Transfer-Encoding

规定了在传输报文主体的时候采用的编码方式

## Upgrade

检测 HTTP 协议及其他协议是否可使用更高的版本进行通信，其参数值可以用来指定一个完全不同的通信协议。

服务器可用 101 Switching Protocols 状态码作为响应返回。

## Via

追踪客户端与服务器之间的请求和响应报文的传输路径。

报文经过代理或网关时，会先在首部字段 Via 中附加该服务器的信息，然后再进行转发。

首部字段 Via 不仅用于追踪报文的转发，还可避免请求回环的发生。

# 请求首部字段

## Accept

用户代理能够处理的媒体类型及媒体类型的相对优先级。可使用 type/subtype 这种形式，一次指定多种媒体类型。

## Accept-Charset

Accept-Charset 首部字段可用来通知服务器用户代理支持的字符集及字符集的相对优先顺序。Accept-Charset 首部字段可用来通知服务器用户代理支持的字符集及字符集的相对优先顺序。

## Accept-Encoding

用户代理支持的内容编码(gzip/deflate)及内容编码的优先级顺序。可一次性指定多种内容编码。可使用星号（\*）作为通配符，指定任意的编码格式。

## Accept-Language

## Authorization 认证信息

想要通过服务器认证的用户代理会在接收到返回的 401 状态码响应后，把首部字段 Authorization 加入请求中。

## Expect

用户代理会通过这个字段告诉服务器，他期望的行为

## From

用户代理的电子邮件

## Host

请求资源在互联网上的域名和端口号 HTTP1.1 规范中唯一一个要求必须被包含在首部中的字段

## If-Match

## If-Modified-Since

## If-None-Match

## If-Unmodified-Since

## Max-Forwards

## Proxy-Authorization

## Range

```
Rang: bytes=5001-10000
```

## Referer

```
 Referer: https://www.baidu.com
```

首部字段 Referer 会告知服务器请求的原始资源的 URI。

正确拼写应该是 Referrer

## TE

首部字段 TE 会告知服务器客户端能够处理响应的传输编码方式及相对优先级。

## User-Agent 用户代理的信息

# 响应首部字段

## Accept-Ranges

首部字段 Accept-Ranges 是用来告知客户端服务器是否能处理范围请求。可处理范围请求时指定其为 bytes，反之则指定其为 none。

## Age

告诉客户端 服务器在多久之前创建了响应 单位 s

## ETag

服务器生成的所请求资源的唯一标识

- 强 Etag

无论资源发生多么细微的变化，其值都会发生改变

- 弱 Etag

只有资源发生了根本改变，产生差异时才会改变 ETag 值。

## Location

指定资源重定向的地址

## Proxy-Authenticate

首部字段 Proxy-Authenticate 会把由代理服务器所要求的认证信息发送给客户端

## Retry-After

告诉客户端多久之后再来发送请求

可以是具体的日期时间，也可以是秒数

## Server

服务器信息

## Vary

## WWW-Authenticate

告诉客户端需要认证的信息

# 实体首部字段

请求报文和响应报文中的实体部分所使用的首部

## Allow

## Content-Encoding

实体所使用的编码方式

gzip....

## Content-Language

## Content-Length

首部字段 Content-Length 表明了实体主体部分的大小（单位是字节）。对实体主体进行内容编码传输时，不能再使用 Content-Length 首部字段。

## Content-Location

Content-Location 表示的是报文主体返回资源对应的 URI。

## Conent-MD5

检查报文主体在传输过程中是否保持完整，以及确认传输到达。

## Content-Range

```
Content-Range: bytes 5001-10000/10000
```

字段值以字节为单位，表示当前发送部分及整个实体大小。

## Content-Type

## Expires

## Last-Modified

# 为 Cookie 服务的首部字段

Cookie 用于状态管理

- Set-Cookie

响应首部字段，用于设置 cookie

1. expires cookie 的有效期，不设置默认就是当前会话，关闭浏览器 cookie 就消失

2. secure 只能通过 https 协议携带 cookie

3. domain 设置有效域名，限制 cookie 的访问范围只能在该域名及其子域名下

4. HttpOnly 不能通过 js 操作 cookie

5. path Cookie 的 path 属性可用于限制指定 Cookie 的发送范围的文件目录

6. Max-Age：在 cookie 失效之前需要经过的秒数（一些老的浏览器（ie6、ie7 和 ie8）不支持这个属性。对于其他浏览器来说，该属性的优先级高于 Expires）

- Cookie

请求首部字段，用于携带 Cookie

# 其它首部字段

## X-Frame-Options

```
X-Frame-Options: DENY
```

响应首部，用于控制网站内容在其他 Web 网站的 Frame 标签内的显示问题。其主要目的是为了防止点击劫持（clickjacking）攻击。

仅有两个值

1. DENY（deny） 拒绝

2. SAMEORIGIN (sameorigin) 仅同源域名下的页面

3. allow-from uri 表示该页面可以在指定来源的 frame 中展示。

## X-XSS-Protection

响应首部，它是针对跨站脚本攻击（XSS）的一种对策，用于控制浏览器 XSS 防护机制的开关

值：

1. 0 -- 将 XSS 过滤设置成无效状态

2. 1 -- 将 XSS 过滤设置成有效状态

## DNT Do Not Track 拒绝个人信息被收集

请求首部，拒绝被精准广告追踪的一种方法。

值

1. 0 -- 同意被追踪

2. 1 -- 拒绝被追踪

## P3P

响应首部

可以让 Web 网站上的个人隐私变成一种仅供程序可理解的形式，以达到保护用户隐私的目的。

> 协议中对 X-前缀的废除
> 在 HTTP 等多种协议中，通过给非标准参数加上前缀 X-，来区别于标准参数，并使那些非标准的参数作为扩展变成可能。但是这种简单粗暴的做法有百害而无一益，因此在“RFC 6648- Deprecating the "X-" Prefix and SimilarConstructs in Application Protocols”中提议停止该做法。然而，对已经在使用中的 X-前缀来说，不应该要求其变更。
