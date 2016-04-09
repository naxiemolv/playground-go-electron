#pragma once

// Node ticker FFI C callback function signature.
typedef void (*ticker_cb) (char *);

// Ticker callback bridging function.
//
// Go can't call a C callback directly. To get around this we call a C bridging
// function defined in server.[ch] with the callback pointer and arguments to
// be passed to the callback. The bridge function simply calls the callback
// with the argument.
void server_call_ticker_cb(ticker_cb cb, char *value);
