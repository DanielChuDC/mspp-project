// import minio
const Minio = require('minio');
const minioFunction = () => {
  try {
    // Instantiate the minio client with the endpoint
    // and access keys as shown below.
    var minioClient = new Minio.Client({
      endPoint: process.env.minio_host,
      port: +process.env.minio_port,
      useSSL: false,
      accessKey: process.env.minio_access_key,
      secretKey: process.env.minio_secret_key
    });

    // File that needs to be uploaded.
    var file = './README.md';

    // Make a bucket called europetrip.
    minioClient.makeBucket('individualuser', 'singapore', function(err) {
      if (err) return console.log(err);

      console.log('Bucket created successfully in "sng01".');

      var metaData = {
        'Content-Type': 'application/octet-stream',
        'X-Amz-Meta-Testing': 1234,
        example: 5678
      };
      // Using fPutObject API upload your file to the bucket europetrip.
      minioClient.fPutObject('individualuser', 'Readme', file, metaData, function(err, etag) {
        if (err) return console.log(err);
        console.log('File uploaded successfully.');
      });
    });
  } catch (err) {
    console.log(err);
  }
};

const minCreateBucket = function(minBucketName, minRegionName) {
  console.log('initialze a minio connection');
  // Instantiate the minio client with the endpoint
  // and access keys as shown below.
  var minioClient = new Minio.Client({
    endPoint: process.env.minio_host,
    port: +process.env.minio_port,
    useSSL: false,
    accessKey: process.env.minio_access_key,
    secretKey: process.env.minio_secret_key
  });

  // Make a bucket called europetrip.
  minioClient.makeBucket(minBucketName.toString(), minRegionName.toString(), function(err) {
    if (err) return console.log(err);

    console.log('Terraform Bucket created successfully in "sng01".');
  });
};

module.exports = { minioFunction, minCreateBucket };
