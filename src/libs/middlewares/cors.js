'use strict';

module.exports = function (options) {
	const defaults = { allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH' };

	options = options || {};

	Object.assign(options, defaults);

	if (Array.isArray(options.exposeHeaders)) {
		options.exposeHeaders = options.exposeHeaders.join(',');
	}

	if (Array.isArray(options.allowMethods)) {
		options.allowMethods = options.allowMethods.join(',');
	}

	if (Array.isArray(options.allowHeaders)) {
		options.allowHeaders = options.allowHeaders.join(',');
	}

	if (options.maxAge) {
		options.maxAge = String(options.maxAge);
	}

	options.credentials = !!options.credentials;
	options.keepHeadersOnError = options.keepHeadersOnError === undefined || !!options.keepHeadersOnError;

	return async (next) => {
		const requestOrigin = this.get('Origin');

		if (!requestOrigin) {
			return await next;
		}

		let origin;

		// Always set Vary header
		// https://github.com/rs/cors/issues/10
		this.vary('Origin');

		if (typeof options.origin === 'function') {
			if (options.origin.constructor.name === 'GeneratorFunction') {
				origin = await options.origin(this);
			} else {
				origin = options.origin(this);
			}
			if (!origin) {
				return await next;
			}
		} else {
			origin = options.origin || requestOrigin;
		}

		const headersSet = {};

		const set = (self, key, value) => {
			self.set(key, value);
			headersSet[key] = value;
		};

		if (this.method !== 'OPTIONS') {
			// Simple Cross-Origin Request, Actual Request, and Redirects

			set(this, 'Access-Control-Allow-Origin', origin);

			if (options.credentials === true) {
				if (origin === '*') {
					this.remove('Access-Control-Allow-Credentials');
				} else {
					set(this, 'Access-Control-Allow-Credentials', 'true');
				}
			}

			if (options.exposeHeaders) {
				set(this, 'Access-Control-Expose-Headers', options.exposeHeaders);
			}

			if (!options.keepHeadersOnError) {
				return await next;
			}

			try {
				await next;
			} catch (err) {
				err.headers = err.headers || {};

				Object.assign(err.headers, headersSet);

				throw err;
			}
		} else {
			if (!this.get('Access-Control-Request-Method')) {
				// this not preflight request, ignore it
				return await next;
			}

			this.set('Access-Control-Allow-Origin', origin);

			if (options.credentials === true) {
				this.set('Access-Control-Allow-Credentials', 'true');
			}

			if (options.maxAge) {
				this.set('Access-Control-Max-Age', options.maxAge);
			}

			if (options.allowMethods) {
				this.set('Access-Control-Allow-Methods', options.allowMethods);
			}

			let allowHeaders = options.allowHeaders;
			if (!allowHeaders) {
				allowHeaders = this.get('Access-Control-Request-Headers');
			}
			if (allowHeaders) {
				this.set('Access-Control-Allow-Headers', allowHeaders);
			}

			this.status = 204;
		}
	};
};
