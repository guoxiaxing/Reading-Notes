# Buffer 结构

类似于 Array，但是它主要用来操作字节。

## Buffer 对象

因为 node 将 Buffer 对象作为一个全局的属性，所以不需要 require 可以直接使用

Buffer 对象类似于数组，它的元素是一个十六进制的两位数，即每个元素可以表示 0-255 的范围

```
const str = "深入浅出node.js";
const buf = new Buffer(str, "utf-8");
console.log(buf);

// <Buffer e6 b7 b1 e5 85 a5 e6 b5 85 e5 87 ba 6e 6f 64 65 2e 6a 73>
```

不同编码的字符串占用的元素的个数不同，utf-8 编码下，中文占用三个元素，英文字母/半角自符占一个元素

与数组很相似，可以通过 length 属性访问长度，通过下标访问元素

也可以通过下标对其赋值

```
console.log(buf.length);
console.log(buf[0]);
```

## Buffer 的内存分配

```
new Buffer(size)
```

8kb 是界限，小于 8kb 就是小内存对象，大于 8kb 就是大内存对象

## 总结

对于 Buffer 对象，真正的内存是在 node 的 C++层提供的，JavaScript 层只是使用了它

# Buffer 的转换

## 字符串转 Buffer

```
new Buffer(str, encoding)
```

不指定 encoding 的时候默认是 utf-8

## Buffer 转字符串

```
buf.toString([encoding],[start],[end])
```

## Buffer 不支持的编码类型

判断特定编码是否支持转换

```
Buffer.isEncoding(encoding)
```

# Buffer 的拼接

buffer 在使用的时候通常是一段一段的进行传输的

```
data += chunk

// 实际上是

data.toString() + chunk.toString()
```

可读流是可以设置编码的

stream.setEncoding(encoding)

## 正确拼接 Buffer

通过一个数组来存放 buffer 片段并记录长度，最后调用 Buffer.concat()来生成一个合并的 buffer 对象

```
var chunks = [];
var size = 0;
res.on('data', function (chunk) {
  chunks.push(chunk);
  size += chunk.length;
});
res.on('end', function () {
  var buf = Buffer.concat(chunks, size);
  var str = iconv.decode(buf, 'utf8');
  console.log(str);
});
```

# Buffer 与性能

QPS 每秒的查询次数 越大越好

网络中通过 Buffer 传输数据可以是性能得到提升

文件读取的时候，设置 highWaterMark 对文件读取的效率有很大影响

fs.createReadStream(path,{highWaterMark: 1024})
