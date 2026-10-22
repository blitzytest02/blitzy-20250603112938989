# blitzy-20250603112938989
Auto-created public repository with README

A zero-dependency Node.js tutorial service on the built-in `node:http` module. Each registered path answers with a fixed plain-text greeting and nothing else.

## Requirements

Node.js `>=22`, the `engines.node` range declared in `package.json`; `24.x` is the line recommended for learners. The service declares no dependencies, so there is no install step.

## Run

```console
npm start      # node server.js
npm run dev    # node --watch server.js
```

The service binds `127.0.0.1:3000` — the `HOST` and `PORT` constants in `server.js` — and prints one startup line:

```console
Listening on http://127.0.0.1:3000
```

Host and port come from those constants alone; no environment variable overrides them.

## Endpoints

| Method | Path | Status | Content-Type | Body |
|--------|------|--------|--------------|------|
| GET | `/hello` | `200` | `text/plain` | `Hello world` |
| GET | `/hello-world` | `200` | `text/plain` | `Hello world` |
| GET | `/good-evening` | `200` | `text/plain` | `Good evening` |

The listener reads the request URL only and never branches on the method, so a registered path answers other methods with the same response; `GET` is the documented method.

### Examples

```console
$ curl -i http://localhost:3000/hello
HTTP/1.1 200 OK
Content-Type: text/plain

Hello world
```

```console
$ curl -i http://localhost:3000/hello-world
HTTP/1.1 200 OK
Content-Type: text/plain

Hello world
```

```console
$ curl -i http://localhost:3000/good-evening
HTTP/1.1 200 OK
Content-Type: text/plain

Good evening
```

For an HTTP/1.1 request, Node.js adds `Date`, `Connection: keep-alive`, `Keep-Alive: timeout=5` and `Transfer-Encoding: chunked` to the response, and `Content-Length` is not set. An HTTP/1.0 request receives `Date` and `Connection: close` with an identity-framed body and no `Content-Length`.

### Other paths

A path that is not registered answers with status `404`, `Content-Type: text/plain` and the body `Not Found`:

```console
$ curl -i http://localhost:3000/unknown
HTTP/1.1 404 Not Found
Content-Type: text/plain

Not Found
```

The match is exact against the raw request URL, so `/hello/`, `/HELLO`, `/good-evening/`, `/GOOD-EVENING` and a query string such as `/hello?x=1` also answer 404.

## Tests

```console
npm test    # node --test --test-concurrency=1 --test-timeout=30000
```

The suite starts and stops its own service on `127.0.0.1:3000`, so no manually started instance may be running on that port at the same time: a second bind fails with `EADDRINUSE`, which cancels the tests. Both test files use that port, so the runner is pinned to one file at a time.

`test/hello.test.js` covers the greeting at `/hello` and `/hello-world`; `test/good-evening.test.js` covers `/good-evening`. Together they assert 21 cases in 5 suites.
