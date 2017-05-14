import _ from "lodash";
import AppleHealthKit from "react-native-apple-healthkit";

const kOptions = {
	permissions: {
		read: _.map(AppleHealthKit.Constants.Permissions)
	}
};

const methodSrc = {
	Height: "getLatestHeight",
	Weight: "getLatestWeight",
	StepCount: "getStepCount",
	DateOfBirth: "getDateOfBirth"
};

const promiseArray = _.map(methodSrc, method => {
	return new Promise((resolve, reject) => {
		let alreadyResponded = false;

		setTimeout(() => {
			alreadyResponded = true;
			resolve(null);
		}, 500);

		AppleHealthKit[method](null, (err, res) => {
			if (alreadyResponded) {
				console.error("Fail!", { err, res });
				return;
			}

			if (err) {
				return reject(err);
			}

			resolve(res);
		});
	});
});

function getHealthData() {
	return new Promise((resolve, reject) => {
		console.info("getHealthData");

		AppleHealthKit.initHealthKit(kOptions, (err, res) => {
			if (err) {
				return reject(err);
			}

			Promise.all(promiseArray)
				.then(res => {
					const objRes = _.reduce(
						Object.keys(methodSrc),
						(reduceRes, healthKey, healthKeyIdx) => {
							reduceRes[healthKey] = res[healthKeyIdx] || null;
							return reduceRes;
						},
						{}
					);

					resolve(objRes);
				})
				.catch(err => {
					reject(err);
				});
		});
	});
}

module.exports = getHealthData;
