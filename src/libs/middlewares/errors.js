'use strict';

module.exports = async (ctx, next) => {
	try {
		await next();
	} catch (e) {
		ctx.status = e.status || 500;

		switch (ctx.status) {
			case 400:
				ctx.body = {
					traceId: '',
					message: e.message,
					errors: e.data
				};

				break;
		}
	}
};
