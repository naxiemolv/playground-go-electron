# Playground using Go(lang) with Node and Electron.

Bidirectional calls between Node, Electron and a shared Go library using
`node-ffi`. It's a potential alternative to setting up RPC such as
`net/rpc/jsonrpc`, `gRPC` or RESTful `HTTP` servers on ephemeral ports.

There is a lot of code generation potential I haven't explored here.

## Dependencies

* Go. New enough and an architecture that supports `-buildmode=c-shared`
* Node, NPM.

### Windows

Go on Windows doesn't support `-buildmode=c-shared` yet.
See [issue:13494](https://github.com/golang/go/issues/13494) for progress.

## Build

```sh
make
```

### Node

* Start Go goroutine ticker via `ffi` that triggers Node callback periodically.
* Periodically call ping-pong function via `ffi`.

```sh
make node
```

### Electron

* Start Go goroutine ticker via `ffi` that triggers Node callback periodically.
* Periodically call ping-pong function via `ffi`.
* Proxy all events between main and render processes with Electron IPC.

```sh
make electron
```

## TODO

It's the first time I've used `node-ffi` and `electron`.

* Memory leaks? What GC is required if any to ensure variables don't leak on either side of the FFI calls.
* Electron IPC indirection. Can I call Go directly from the renderer process/loop avoiding IPC?
* Build a `cgo` Node native module avoiding `ffi`? We already have Go/C bridging functions in `server.[ch]` anyway.
* Bidirectional. Let Go eval JS inside main and return the result.
* I smell a library.
