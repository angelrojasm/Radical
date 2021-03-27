const aws = require('aws-sdk');
const s3Bucket = process.env.main_bucket;
const designBucket = process.env.design_bucket;
aws.config.setPromisesDependency();
aws.config.update({
	region: process.env.region,
	accessKeyId: process.env.accessKeyID,
	secretAccessKey: process.env.secretKey,
});

const s3 = new aws.S3();

exports.uploadFile = (file, fileName) => {
	return new Promise((resolve, reject) => {
		let fileParts = file.name.split('.');
		let fileType = fileParts[1];
		let filename = file.name;
		s3.putObject(
			{
				Bucket: s3Bucket,
				Key: `${filename}`,
				ACL: 'public-read',
				Body: file.data,
				Metadata: { type: fileType },
			},
			function (err) {
				if (err) {
					return reject({ error: true, details: err });
				} else {
					return resolve({ error: false });
				}
			}
		);
	});
};
exports.getFile = (fileName, res) => {
	return new Promise((resolve, reject) => {
		s3.getObject(
			{
				Bucket: s3Bucket,
				Key: `${fileName}`,
			},
			(err, data) => {
				if (err) {
					return reject(err);
				} else {
					return resolve(data.Body);
				}
			}
		);
	});
};
exports.uploadDesignFile = file => {
	return new Promise((resolve, reject) => {
		let fileParts = file.name.split('.');
		let fileType = fileParts[1];
		let filename = file.name;
		s3.putObject(
			{
				Bucket: designBucket,
				Key: `${filename}`,
				ACL: 'public-read',
				Body: file.data,
				Metadata: { type: fileType },
			},
			function (err) {
				if (err) {
					return reject({ error: true, details: err });
				} else {
					return resolve({ error: false });
				}
			}
		);
	});
};

exports.deleteDesignFile = fileName => {
	return new Promise((resolve, reject) => {
		s3.deleteObject(
			{
				Bucket: designBucket,
				Key: fileName,
			},
			function (err, data) {
				if (err) return reject({ error: true, details: err });
				// an error occurred
				else return resolve({ error: false }); // successful response
			}
		);
	});
};
