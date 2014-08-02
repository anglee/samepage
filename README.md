Samepage
=======
Start

```
$ node samepage.js
connect to: http://localhost:3000
```

/page

```
$ curl http://localhost:3000
Hello Samepage
$ curl http://localhost:3000/page?foo=bar
req.method = GET
req.url =/page?foo=bar
req.query = {"foo":"bar"}
req.body = {}
req.params = {}
$ curl http://localhost:3000/page -d foo=bar
req.method = POST
req.url =/page
req.query = {}
req.body = {"foo":"bar"}
req.params = {}
$ curl http://localhost:3000/page/1
req.method = GET
req.url =/page/1
req.query = {}
req.body = {}
req.params = {"id":"1"}
```

/eval

```
$ curl http://localhost:3000/eval --data-urlencode exp="1+1"
2
```
