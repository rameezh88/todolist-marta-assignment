#!/bin/bash

rm -rf node_modules
(cd ios && rm -rf Pods && rm Podfile.lock)
yarn
(cd ios && pod install)