const net = require("net");

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

  send() {
    return new Promise((resolve, reject) => {

    })
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

  console.log(response);

}();