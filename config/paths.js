const path = require("path");
const fs = require("fs");

var appDirectory = fs.realpathSync(process.cwd());
function resolveApp(relativePath) {
  return path.resolve(appDirectory, relativePath);
}

module.exports = {
  appBuild: resolveApp("build"),
  appSrc: resolveApp("src"),
  appFile: resolveApp("src/app.ts")
};
