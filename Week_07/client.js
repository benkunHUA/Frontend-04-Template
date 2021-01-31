const net = require("net");

// 第二步
//在request的构造函数中收集必要的信息
//设计一个send函数，把请求真实发送到服务器
//send函数应该是异步的，所以返回promise
class Request {
  constructor(option) {
    this.method = option.method || 'GET';
    this.host = option.host;
    this.port = option.port || 80;
    this.path = option.path || "/";
    this.body = option.body || {};
    this.headers = option.headers || {};
    if(!this.headers["Content-Type"]) {
      this.headers["Content-Type"] = "application/x-www-form-urlencoded";
    }

    if(this.headers["Content-Type"] === "application/json") {
      this.bodyText = JSON.stringify(this.body);
    } else if(this.headers["Content-Type"] === "application/x-www-form-urlencoded") {
      this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key])}`).join('&');
    }

    this.headers["Content-Length"] = this.bodyText.length;
  }

  // 第三步发送请求
  // 设计支持已有的connection或者自己新建connection
  // 收到数据传给parser
  // 根据parser的状态resolve promise
  send(connection) {
    return new Promise((resolve, reject) => {
      const parser = new ResponseParser;
      if(connection) {
        connection.write(this.toString());
      } else {
        connection = net.createConnection({
          host: this.host,
          port: this.port
        }, () => {
          connection.write(this.toString());
        })
      }

      connection.on('data', (data) => {
        parser.receive(data.toString());
        if(parser.isFinished) {
          resolve(parser.response);
          connection.end();
        }
      });

      connection.on('error', (err) => {
        reject(err);
        connection.end();
      })
    })
  }

  toString() {
    return `${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers).map(key => `${key}: ${this.headers[key]}`).join('\r\n')}\r
\r
${this.bodyText}`
  }
}
// 第四步
// Response必须分段构造，所以我们要用一个ResponseParser来“装配”
// ResponseParser分段处理ResponseText,我们用状态机来分析文本的结构
class ResponseParser {
  constructor() {
    this.WAITING_STATUS_LINE = 0;
    this.WAITING_STATUS_LINE_END = 1;
    this.WAITING_HEADER_NAME = 2;
    this.WAITING_HEADER_SPACE = 3;
    this.WAITING_HEADER_VALUE = 4;
    this.WAITING_HEADER_LINE_END = 5;
    this.WAITING_HEADER_BLOCK_END = 6;
    this.WAITING_BODY = 7;

    this.current = this.WAITING_STATUS_LINE;
    this.statusLine = "";
    this.headers = {};
    this.headerName = "";
    this.headerValue = "";
    this.bodyParser = null;
  }

  get isFinished() {
    return this.bodyParser && this.bodyParser.isFinished;
  }
  get response() {
    this.statusLine.match(/HTTP\/1.1 ([0-9]+) ([\s\S]+)/);
    return {
      statusCode: RegExp.$1,
      statusText: RegExp.$2,
      headers: this.headers,
      body: this.bodyParser.content.join('')
    };
  }
  receive(string) {
    for(let i = 0; i < string.length; i++) {
      this.receiveChar(string.charAt(i));
    }
  }

  receiveChar(char) {
    if(this.current === this.WAITING_STATUS_LINE) {
      if(char === '\r') {
        this.current = this.WAITING_STATUS_LINE_END;
      } else {
        this.statusLine += char;
      }
    } else if(this.current === this.WAITING_STATUS_LINE_END) {
      if(char === '\n') {
        this.current = this.WAITING_HEADER_NAME;
      }
    } else if(this.current === this.WAITING_HEADER_NAME) {
      if(char === ':') {
        this.current = this.WAITING_HEADER_SPACE;
      } else if(char === '\r') {
        this.current = this.WAITING_HEADER_BLOCK_END;
        if(this.headers['Transfer-Encoding'] === 'chunked') {
          this.bodyParser = new TrunkedBodyParser();
        }
      } else {
        this.headerName += char;
      }
    } else if(this.current === this.WAITING_HEADER_SPACE) {
      if(char === ' ') {
        this.current = this.WAITING_HEADER_VALUE;
      }
    } else if(this.current === this.WAITING_HEADER_VALUE) {
      if(char === '\r') {
        this.current = this.WAITING_HEADER_LINE_END;
        this.headers[this.headerName] = this.headerValue;
        this.headerName = "";
        this.headerValue = "";
      } else {
        this.headerValue += char;
      }
    } else if(this.current === this.WAITING_HEADER_LINE_END) {
      if(char === '\n') {
        this.current = this.WAITING_HEADER_NAME;
      }
    } else if(this.current === this.WAITING_HEADER_BLOCK_END) {
      if(char === '\n') {
        this.current = this.WAITING_BODY;
      }
    } else if(this.current === this.WAITING_BODY) {
      console.log(char);
    }
  }
}

class TrunkedBodyParser {
  constructor() {
    this.WAITING_LENGTH = 0;
    this.WAITING_LENGTH_LINE_END = 1;
    this.READING_TRUNK = 2;
    this.WAITING_NEW_LINE = 3;
    this.WAITING_NEW_LINE_END = 4;
    this.length = 0;
    this.content = [];
    this.isFinished = false;
    this.current = this.WAITING_LENGTH;
  }

  receiveChar(char) {
    if(this.current === this.WAITING_LENGTH) {
      if(char === '\r') {
        if(this.length === 0) {
          this.isFinished = true;
        }
        this.current = this.WAITING_LENGTH_LINE_END;
      } else {
        this.length *= 16;
        this.length += parseInt(char, 16);
      }
    } else if(this.current === this.READING_TRUNK) {
      this.content.path(char);
      this.length --;
      if(this.length === 0) {
        this.current = this.WAITING_NEW_LINE;
      }
    } else if(this.current === this.WAITING_NEW_LINE) {
      if(char === '\r') {
        this.current = this.WAITING_LENGTH_LINE_END;
      }
    } else if(this.current === this.WAITING_LENGTH_LINE_END) {
      if(char === '\n') {
        this.current = this.WAITING_LENGTH;
      }
    }
  }
}


void async function (){
  let request = new Request({
    methods: "POST",
    host: "127.0.0.1",
    port: "8088",
    path: "/",
    header: {
      ["X-Foo2"]: "customed"
    },
    body: {
      name: "winter"
    }
  });

  let response = await request.send();

  console.log(response.body);

}();