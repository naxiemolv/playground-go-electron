package main

// #include "server.h"
import "C"

import (
	"time"
)

// Create a background ticker that calls a Node callback with a 'tick' string
// every 1s.
//
//export ticker
func ticker(cb C.ticker_cb) {
	// Create a leaky goroutine to call the C callback passed from Node via FFI.
	go func() {
		ticker := time.Tick(1 * time.Second)
		for range ticker {
			// Go can't call a C callback directly. To get around this we call a C
			// bridging function defined in server.[ch] with the callback pointer and
			// arguments to be passed to the callback. The bridge function simply calls
			// the callback with the argument.
			C.server_call_ticker_cb(cb, C.CString("tock"))
		}
	}()
}

// Basic ping pong function. Returns a 'pong' string back to Node.
//
//export ping
func ping() *C.char {
	return C.CString("pong")
}

// -buildmode=c-shared requires main.
func main() {
}
