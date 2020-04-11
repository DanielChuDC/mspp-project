# MQTT and SOCKET IO Integration

# socket-io-mqtt

# Introduction

BD is a simple express app showing off socket.io and mqttjs
integration

## Note and declaration

Another modification from [Bearded-Dangerzone](https://github.com/adamvr/bearded-dangerzone)

# Before you begin

- You should create a `.env` file in the root directory

- In the `.env` file need to specific the

```
mqtt_host='<your host>'
mqtt_password='<your password>'
mqtt_username='<your username>'
```

# How to start the project

Run command in the terminal `npm start`

# ISSUE

How to write SHELL js command in async/await
https://gist.github.com/davidrleonard/2962a3c40497d93c422d1269bcd38c8f

```js
const Promise = require('bluebird');
const sh = require('shelljs');

/**
 * Asynchronously executes a shell command and returns a promise that resolves
 * with the result.
 *
 * The `opts` object will be passed to shelljs's `exec()` and then to Node's native
 * `child_process.exec()`. The most commonly used opts properties are:
 *
 * - {String} cwd - A full path to the working directory to execute the `cmd` in
 * - {Boolean} silent - If `true`, the process won't log to `stdout`
 *
 * See shell.js docs: https://github.com/shelljs/shelljs#execcommand--options--callback
 * See Node docs: https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback
 *
 * @example
 *
 *     const execAsync = require('execAsync');
 *     execAsync('ls -al', { silent: true, cwd: '/Users/admin/' });
 *
 * @param {String} cmd - The shell command to execute
 * @param {Object} opts - Any opts to pass in to exec (see shell.js docs and Node's native `exec` documentation)
 * @returns {String.<Promise>} - Resolves with the command results from `stdout`
 */
function execAsync(cmd, opts = {}) {
  return new Promise(function(resolve, reject) {
    // Execute the command, reject if we exit non-zero (i.e. error)
    sh.exec(cmd, opts, function(code, stdout, stderr) {
      if (code != 0) return reject(new Error(stderr));
      return resolve(stdout);
    });
  });
}

module.exports = exports = execAsync;
```
