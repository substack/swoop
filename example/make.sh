#!/bin/bash
yarnify slides -o yarn.js
browserify entry.js -o bundle.js
