OS ?= $(shell uname)

LIBNAME := libserver
LIBHEAD := $(LIBNAME).h
LIBBIN  := $(LIBBIN).so
ifeq ($(OS), Darwin)
	LIBBIN = $(LIBNAME).dylib
endif

all: build npm

build: $(LIBBIN)

$(LIBBIN): $(wildcard server.*)
	go build -buildmode=c-shared -o $(LIBBIN)

npm: node/node_modules electron/node_modules

node/node_modules:
	cd node && npm install

electron/node_modules:
	cd electron && npm install

node: build
	node node/main.js

electron: build
	electron electron/main.js

clean:
	rm -f $(LIBBIN) $(LIBHEAD)

.PHONY: all build npm node electron clean
