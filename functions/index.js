const admin = require('firebase-admin');
const functions = require('firebase-functions');
const cors = require('cors');
const requestlib=require('request');

admin.initializeApp(functions.config().firebase);
var otp = 0;
var db = admin.firestore();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.vote = functions.https.onRequest((request, response) => {
	var corsOptions = {
		origin: '*',
		optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
	}
	var corsFn = cors(corsOptions);
	corsFn(request, response, () => {
		if(request.body.hasOwnProperty('name') && request.body.hasOwnProperty('mobile') && request.body.hasOwnProperty('award') && request.body.hasOwnProperty('value')) {
			mobile = request.body.mobile.replace(/\s+/g, '');
			if (!(/^\d{10}$/.test(mobile))) {
				return response.send({result:0, message: 'Invalid mobile number, provide a 10 digit mobile number.'});
			}
			mobile = parseInt(mobile);
			collection = db.collection('votes').where('mobile', '==', mobile).where('award', '==', request.body.award).limit(1).get().then(querySnapshot => {
				if (!querySnapshot.empty) {
					if(querySnapshot.docs[0].get('status')) {
						return response.send({result:0, message: 'You have already voted for this award using the given mobile number'});
					}
					else {
						otp = querySnapshot.docs[0].get('otp');
						updateData = db.collection('votes').doc(querySnapshot.docs[0].id).update({
							value: request.body.value
						});
						requestlib('http://control.msg91.com/api/sendhttp.php?authkey='+functions.config().msg91.authkey+'&mobiles='+mobile+'&message='+encodeURI("Your OTP to vote for Undergrad Summit Awards is ")+otp+'&sender=STUMGZ&route=4', { json: true }, (err, res, body) => {
							if (err) { return response.send({result: 0, message: 'Something went wrong. Please try again.'});}
							if(body==="Authentication failure"){console.log(body); return response.send({result: 0, message: 'Something went wrong. Please try again.'});}
							return true;
						});
						return response.send({result:1,message:querySnapshot.docs[0].id});
					}
				} else {
					otp = Math.floor(100000 + Math.random() * 900000);
					requestlib('http://control.msg91.com/api/sendhttp.php?authkey='+functions.config().msg91.authkey+'&mobiles='+mobile+'&message='+encodeURI("Your OTP to vote for Undergrad Summit Awards is ")+otp+'&sender=STUMGZ&route=4', { json: true }, (err, res, body) => {
						if (err) { return response.send({result: 0, message: 'Something went wrong. Please try again.'});}
						if(body==="Authentication failure"){console.log(body); return response.send({result: 0, message: 'Something went wrong. Please try again.'});}
						return true;
					});
					new_vote = db.collection('votes').doc();
					setData = new_vote.set({
						name: request.body.name,
						mobile: mobile,
						award: request.body.award,
						value: request.body.value,
						otp: otp,
						status: false
					});
					return setData.then(res => {
						return response.send({result:1,message: new_vote.id});
					});
				}
			});
		}
		else if(request.body.hasOwnProperty('id') && request.body.hasOwnProperty('otp')) {
			db.collection('votes').doc(request.body.id).get().then(querySnapshot => {
				if (!querySnapshot.empty) {
					var data = querySnapshot.data();
					console.log([data,request.body]);
					if(data.otp === request.body.otp) {
						if(data.status) {
							return response.send({result:0, message:'You have already voted, ' + data.name + '. Thank you.'});
						}
						else {
							updateData = db.collection('votes').doc(request.body.id).update({
								status: true
							});
							return updateData.then(res => {
								return response.send({result:1, message: 'Success. Thanks for voting, ' + data.name});
							});
						}
					}
					else {
						return response.send({result:0, message: 'Invalid OTP'});
					}
				} else {
					return response.send({result: 0, message: 'Something went wrong. Please try again.'});
				}
			}).catch(error => {
				response.error(500);
			});
		}
		else {
			response.send({result:0,message:'Error: Invalid Parameters'});
		}
	});
});
