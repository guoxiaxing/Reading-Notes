# 构建 web 应用

如果查询字符串的键出现多次，那么返回的 value 是一个数组 (无论是使用 querystring.parse 还是 url.parse)

判断请求是否有 body 的方式 看请求头是不是有 transfer-encoding / content-length 首部

- application/x-www-form-urlencoded 可以使用 body-parser 解析

- 文件上传 multipart-form-data 可以使用 multer 模块

## CSRF --- 跨站请求伪造

用户登陆受信任的网站 A，在不登出 A 的情况下访问危险网站 B，网站 B 就可以发送一些请求，这些请求会自动携带上用户的 cookie

- 防止方式

1. 随机数验证：客户端在发送请求的时候携带随机数，服务端也按照相同的规则生产随机数，进行校验

2. Cookie 的 SameSite 属性

## 附件下载

有些场景，无论响应什么养的 MEMI，不需要客户端打开它，而是弹出弹窗下载它

Content-Disposition 就是用来满足这个需求的 --- 客户端会根据他的值判断是将响应的内容作为及时浏览还是当作附件来下载

inline --- 即时查看

attachment --- 作为文件存储

另外 Content-Disposition 还可以指定文件存储的文件名

```
Content-Disposition: attachment; filename="filename.ext"
```

```
res.sendfile = function (filepath) {
  fs.stat(filepath, function(err, stat) {
    var stream = fs.createReadStream(filepath);
    // 设置内容
    res.setHeader('Content-Type', mime.lookup(filepath));
    // 设置长度
    res.setHeader('Content-Length', stat.size);
    // 设置为附件
    res.setHeader('Content-Disposition' 'attachment; filename="' + path.basename(filepath) + '"');
    res.writeHead(200);
    stream.pipe(res);
  });
};
```

## 响应 JSON

```
res.json = function (json) {
  res.setHeader('Content-Type', 'application/json');
  res.writeHead(200);
  res.end(JSON.stringify(json));
};
```

## 响应跳转

```
res.redirect = function (url) {
  res.setHeader('Location', url);
  res.writeHead(302);
  res.end('Redirect to ' + url);
};
```

php ---- 服务端的动态网页技术

## 总结

请求处理 可以使用 node 的框架 --- express/koa

模版渲染可以使用模版框架 --- jade/ejs 等

不推荐手写原生的 node
