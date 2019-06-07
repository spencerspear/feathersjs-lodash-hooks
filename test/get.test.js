const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const { assert } = chai;

const __ = require('../index');

describe(`get(path, callback)`, () => {
	it(`returns a function`, () => {
		return assert.isFunction(__.get);
	});

	it(`passes the value at path into callback as first param`, (done) => {
		const headers = { test: 'header' };
		const params = { headers };
		const parentContext = { params  };
		const path = 'params.headers.test';

		const callback = (value, context) => {
			if(value === parentContext.params.headers.test) {
				return done();
			}

			return done(new Error('value does not match that from context'));
		};

		const fn = __.get(path, callback);

		fn(parentContext);
	});

	it(`passes in 'undefined' if path is not found in context`, (done) => {
		const parentContext = {};
		const path = 'params.headers.test';

		const callback = (value, context) => {
			if(value === undefined) {
				return done();
			}

			return done(new Error(`'undefined' was not passed in as first parameter to callback`));
		};

		const fn = __.get(path, callback);

		fn(parentContext);
	});

	describe(`callback`, () => {
		it(`passes the context as the second argument to the callback`, (done) => {
			const path = 'some.fake.path';
			const parentContext = {};
			const callback = (value, context) => {
				if (context === parentContext) {
					return done();
				}

				return done(new Error('context was not passed in as second argument to callback'));
			};
			const fn = __.get(path, callback);

			return fn(parentContext);
		});

		it(`returns whatever you return in the callback`, () => {
			const path = 'some.fake.path';
			const parentContext = {};
			const callback = (value, context) => {
				return context;
			};
			const fn = __.get(path, callback);
			const result = fn(parentContext);

			return assert.strictEqual(parentContext, result);
		});
	});
});
