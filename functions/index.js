const admin = require('firebase-admin');
const functions = require('firebase-functions');
const cors = require('cors');

admin.initializeApp(functions.config().firebase);

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
	corsFn(request, response, function() {
		if(request.body.hasOwnProperty('name') && request.body.hasOwnProperty('mobile') && request.body.hasOwnProperty('award') && request.body.hasOwnProperty('value')) {
			mobile = parseInt(request.body.mobile.replace(/\s+/g, ''));
			collection = db.collection('votes').where('mobile', '==', mobile).where('award', '==', request.body.award).limit(1).get().then(function(querySnapshot) {
				if (!querySnapshot.empty) {
					if(querySnapshot.docs[0].get('status')) {
						response.send({res:0, message: 'You have already voted for this award using the given mobile number'});
					}
					else {
						response.send({res:1,message:querySnapshot.docs[0].id});
					}
				} else {
					new_vote = db.collection('votes').doc();
					setData = new_vote.set({
						name: req.body.name,
						mobile: mobile,
						award: req.body.award,
						college: req.body.college,
						otp: Math.floor(100000 + Math.random() * 900000),
						status: false
					});
					return setDoc.then(res => {
						return response.send({result:1,message: res.id});
					});
				}
				return;
			});
		}
		else if(request.body.hasOwnProperty('id') && request.body.hasOwnProperty('otp')) {
			db.collection('votes').doc(request.body.id).get().then(function(querySnapshot) {
				if (!querySnapshot.empty) {
					var data = querySnapshot.data();
					if(data.otp === request.body.otp) {
						if(data.status) {
							response.send({result:0, message:'You have already voted, ' + data.name + '. Thank you.'});
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
						response.send({result:0, message: 'Invalid OTP'});
					}
				} else {
					response.send({result: 0, message: 'Something went wrong. Please try again.'});
				}
				return;
			}).catch(error => {
				response.error(500);
			});
		}
		else {
			response.status(500).send('Error: Invalid Parameters');
		}
	});
});
