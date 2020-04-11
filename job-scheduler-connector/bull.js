const Bull = require('bull');
var request = require('request');

// var t_plan_Queue = new Queue('terraform plan');
// var t_apply_Queue = new Queue('terraform apply');
// var t_destroy_Queue = new Queue('terraform destroy');
// var t_state_Queue = new Queue('terraform state');

// import shelljs and uuid
let shell = require('shelljs');
const uuidv4 = require('uuid/v4');

module.exports = function bullinit(myConnectHost, myConnectMethod) {
  console.log('bullinit initialized');

  const myFirstQueue = new Bull('my-first-queue', {
    redis: {
      port: process.env.redis_port,
      host: process.env.redis_host
      // password: Config.redis.password
    }
  });

  (async function ad() {
    const job = await myFirstQueue.add({
      clientid: uuidv4()
    });
  })();

  var shellexec = function(done) {
    shell.exec('terraform version');
    // Make a request to other app , eg: mqtt-connector and terraform-provisioner
    const options = {
      url: myConnectHost + '/' + myConnectMethod,
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-Charset': 'utf-8'
      },
      form: { message: 'me@example.com' }
    };

    // callback in function
    request(options, function(err, res, body) {
      console.log(err);
    });

    // call done as job completed
    done(null, 'the terraform version');
  };

  myFirstQueue.process(async (job, done) => {
    let progress = 0;
    for (i = 0; i < 1; i++) {
      await shellexec(done);
      progress += 1;

      job.progress(progress).catch(err => {
        log.debug({ err }, 'Job progress err');
      });
    }
  });

  // Define a local completed event
  myFirstQueue.on('completed', (job, result) => {
    console.log(`Job completed with result ${result}`);
    // console.log(`Job completed with result ${job.log}`);
  });
};
