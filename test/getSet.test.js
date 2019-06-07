const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const { assert } = chai;

const __ = require('../index');

describe(`getSet(getPath, setPath, transformFn)`, () => {
	it(`returns a function`, () => {
		return assert.isFunction(__.getSet);
	});

	it(`passes the value found at getPath into the transform function as first argument`, (done) => {
		const headers = { test: 'header' };
		const params = { headers };
		const parentContext = { params  };
		const getPath = 'params.headers.test';
		const setPath = 'params.query.test';

		const transformFn = (getValue, context) => {
			if (getValue === parentContext.params.headers.test) {
				return done();
			}

			return done(new Error('Value at getPath not passed as first argument to transformFn'));
		};

		const fn = __.getSet(getPath, setPath, transformFn);

		fn(parentContext);
	});

	it(`passes the context as the second parameter to the transformFn`, (done) => {
		const headers = { test: 'header' };
		const params = { headers };
		const parentContext = { params  };
		const getPath = 'params.headers.test';
		const setPath = 'params.query.test';

		const transformFn = (value, context) => {
			if (context === parentContext) {
				return done();
			}

			return done(new Error('Context not passed as second parameter to transformFn'))
		};

		const fn = __.getSet(getPath, setPath, transformFn);

		fn(parentContext);
	});

	it(`sets the return value of transformFn as the value at setPath`, (done) => {
		const headers = { test: 'test-value' };
		const params = { headers };
		const parentContext = { params  };
		const getPath = 'params.headers.test';
		const setPath = 'params.query.test';

		const transformFn = (getValue, context) => {
			return getValue;
		};

		const fn = __.getSet(getPath, setPath, transformFn);

		fn(parentContext).then((retVal) => {
			if (retVal === parentContext) {
				return done()
			}

			return done(new Error('The returned value does not equal the parentContext'));
		}).catch((e) => {
			return done(e);
		});
	});
});
