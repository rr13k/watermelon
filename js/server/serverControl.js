

class serverControl {
  constructor(){
    this._init()
  }

  _init(){
    const http2 = require('http2');
    const fs = require('fs');

    const server = http2.createSecureServer({
      key: fs.readFileSync('./src/assets/localhost-privkey.pem'),
      cert: fs.readFileSync('./src/assets/localhost-cert.pem')
    });
    server.on('error', (err) => console.error(err));
    console.log("httpServer","服务器初始化")

    // server.on('request',(req,res)=>{
    //   console.dir(123123)
    //   console.dir("请求了")
    //   let reqPath = req.url === '/' ? '/index.html' : req.url
    //   //获取html资源
    //   // const file = publicFiles.get(reqPath)
    //   // 文件不存在
    //   let file = false
    //   if (!file) {
    //     res.statusCode = 200
    //     res.setHeader("Content-Type", "text/html; charset=utf-8")
    //     res.end("没有文件")
    //   }
    //   // res.stream.respondWithFD(file.fileDescriptor, file.headers)
    // })

    server.on('stream', (stream, headers) => {
      // stream is a Duplex
      console.dir(12312)
      stream.respond({
        'content-type': 'text/html',
        ':status': 200
      });
      stream.end('<h1>Hello World</h1>');
    });

  }

}

exports.serverControl = serverControl