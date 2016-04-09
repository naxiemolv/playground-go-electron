const ffi = require('ffi');

// Load shared Go libserver.{so,dylib,dll} library.
const server = ffi.Library(__dirname + '/../libserver', {
  'ticker': ['void', ['pointer']],
  'ping':   ['string', []]
});

// Run for 10 seconds.
//
// In the example the libuv loop isn't informed about the goroutine work so
// node would exit immediately
var running = true;
setTimeout(function () {running = false}, 10000);

// Start the go background ticker.
function ticker_callback(argument) {
  console.warn('ticker_callback called with argument: ' + argument)
}

var ticker_callback_ptr = ffi.Callback('void', ['string'], ticker_callback);
server.ticker(ticker_callback_ptr);

// Call Go ping() every 2s and warn result.
(function ping() {
  var result = server.ping();
  console.warn('ping returned: ' + result);

  if (running)
    setTimeout(ping, 2000);
})();
