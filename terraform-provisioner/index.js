const express = require('express');
const app = express();
const debug = require('debug')('myapp:server');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
// Import the minio from minio.js
const { minioFunction, minCreateBucket } = require('./minio');

// Import the bull job scheduler here
var bullinit = require('./bull');

// Using dotnet config
require('dotenv').config();

// Get information about host's operating system
var os = require('os');

// import shelljs
let shell = require('shelljs');

// Construct body parser with express
// The two lines tells express to accept both JSON and url encoded values
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  // debug('Server is up and running on port ', port);
});

app.get('/', function(req, res) {
  return res.send('hello from my app express server!');
});

app.get('/bull', function(req, res) {
  bullinit();
  //console.log(bullinit());
  return res.send('bull is working');
});

app.get('/app', function(req, res) {
  if (shell.which('git')) {
    shell.exec('git --version');
    return res.send(shell.exec('git --version'));
  } else {
    return res.send(console.log('you do not have git installed.'));
    console.log('you do not have git installed.');
  }
});

app.get('/tera', function(req, res) {
  if (shell.which('terraform')) {
    //shell.exec('terraform --version');
    return res.send(shell.exec('terraform --version'));
  } else {
    return res.send(console.log('you do not have terraform installed.'));
    console.log('you do not have terraform installed.');
  }
});

app.get('/git', function(req, res) {
  if (shell.which('git')) {
    //shell.exec('terraform --version');
    return res.send(shell.exec('git --version'));
  } else {
    return res.send('you do not have git installed.');
  }
});

app.get('/min', function(req, res) {
  console.log(minioFunction);
  res.send(minioFunction());
});

app.get('/terraform/ibm', function(req, res) {
  // fs.readFile('~/.terraformrc', 'UTF8', function(err, contents) {
  //   console.log(contents);
  //   return res.send(contents);
  // });
  if (shell.find('~/.terraformrc')) {
    //shell.exec('terraform --version');
    return res.send(shell.exec('cat ~/.terraformrc'));
  } else {
    return res.send(console.log('you do not have terraform ibm plugin installed.'));
  }
});

// name as api to create terraform flow
// terraform init -upgrade
// terraform plan
// terraform apply
// terraform state
// terraform destroy

// terraform init
app.get('/terraform/init', function(req, res) {
  //console.log(req);
  if (!req.body.command || !req.body.bucketname || !req.body.regionname) {
    return res.status(400).send({
      success: 'false',
      message: 'bucketname and command and region name is required'
    });
  } else {
    console.log(req.body.bucketname);
    // create bucket
    minCreateBucket(req.body.bucketname, req.body.regionname);

    shell.exec('pwd');
    // shell.exec('ls ~');
    // shell.exec('ls /home/node/app');
    shell.exec('ls /tmp');

    shell.exec('cd /tmp; terraform init -upgrade;', function(code, stdout, stderr) {
      console.log('Exit code:', code);
      // console.log('Program output:', stdout);
      console.log('Program stderr:', stderr);
      if (code != 0) {
        return res.send('terraform init -upgrade unsuccess');
      } else if (code == 0) {
        return res.send('terraform init -upgrade success');
      }
    });
  }
});

app.get('/terraform/plan', function(req, res) {
  //console.log(req);
  if (!req.body.command) {
    return res.status(400).send({
      success: 'false',
      message: 'command is required'
    });
  } else {
    // create template
    // shell.exec('cd ~/');
    // shell.exec('touch ~/template.tf');

    shell.exec('cd /tmp; terraform plan;', function(code, stdout, stderr) {
      console.log('Exit code:', code);
      // console.log('Program output:', stdout);
      console.log('Program stderr:', stderr);
      if (code != 0) {
        return res.send('terraform plan -upgrade unsuccess');
      } else if (code == 0) {
        return res.send(stdout);
      }
    });
  }
});

// Terraform apply
app.get('/terraform/apply', function(req, res) {
  //console.log(req);
  if (!req.body.command) {
    return res.status(400).send({
      success: 'false',
      message: 'command is required'
    });
  } else {
    bullinit(process.env.mqttconnector_host, process.env.mqttconnector_method);
    //return in progress
    return res.send('provision in progress');
  }
});

// Terraform destroy

app.get('/terraform/destroy', function(req, res) {
  //console.log(req);
  if (!req.body.command) {
    return res.status(400).send({
      success: 'false',
      message: 'command is required'
    });
  } else {
    // create template
    // shell.exec('cd ~/');
    // shell.exec('touch ~/template.tf');

    shell.exec('cd /tmp; terraform destroy -no-color -auto-approve > file.txt;', function(
      code,
      stdout,
      stderr
    ) {
      console.log('Exit code:', code);
      // console.log('Program output:', stdout);
      console.log('Program stderr:', stderr);
      if (code != 0) {
        return res.send('terraform delete unsuccess');
      } else if (code == 0) {
        return res.send(stdout);
      }
    });
  }
});
