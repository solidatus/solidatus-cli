mkdir solidatus-cli
pkg ./index.js --targets latest-win-x64
mv ./index.exe ./solidatus-cli/solidatus-cli-x64.exe
pkg ./index.js --targets latest-macos-x64
mv ./index ./solidatus-cli/solidatus-cli-macos
pkg ./index.js --targets latest-linux-x64
mv ./index ./solidatus-cli/solidatus-cli-linux

