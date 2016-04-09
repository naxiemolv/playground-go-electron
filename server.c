#include "server.h"

void server_call_ticker_cb(ticker_cb cb, char *value) {
  cb(value);
}
