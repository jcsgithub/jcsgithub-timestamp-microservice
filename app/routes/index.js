'use strict';

var moment = require('moment');
moment().format();

var path = process.cwd();

module.exports = function (app) {
	
	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});
		
	app.route('/:str')
		.get(function (req, res) {
			var finalData = { unix: null, natural: null };
			var str = req.params.str;
			
			var isNumbersOnly = /^\d+$/.test(str);
			
			if (isNumbersOnly) {
				finalData.unix = Number(str);
				finalData.natural = moment.unix(Number(str)).format('MMMM DD, YYYY');
			} else {
				var dateFormats = [
					'M-D-YYYY',
					'MM-D-YYYY',
					'MMM-D-YYYY',
					'MMMM-D-YYYY',
					'M-DD-YYYY',
					'MM-DD-YYYY',
					'MMM-DD-YYYY',
					'MMMM-DD-YYYY',
					'YYYY-MM-DD'
				];
				var momentObject = moment(str, dateFormats);
				if (momentObject.isValid()) {
					finalData.unix = Number(momentObject.format('X'));
					finalData.natural = momentObject.format('MMMM DD, YYYY');
				}
			}
			
			res.json(finalData);
		});
};
