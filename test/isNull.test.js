const { assert } = require('chai');
const __ = require('../index');

describe(`isNull(path)`, () => {
	it(`returns 'false' if path doesn't exist`, () => {
		const context = {};
		const path = 'query';
		const hook = __.isNull(path);

		return assert.isFalse(hook(context));
	});

	it(`returns 'false' if path value is undefined`, () => {
		const query = { expand: undefined };
		const context = { query };
		const path = 'query.expand';
		const hook = __.isNull(path);

		return assert.isFalse(hook(context));
	});

	it(`returns 'false' if path value is not null`, () => {
		const query = { expand: 'string' };
		const context = { query };
		const path = 'query.expand';
		const hook = __.isNull(path);

		return assert.isFalse(hook(context));
	});

	it(`returns 'true' if path value is null`, () => {
		const query = { expand: null };
		const context = { query };
		const path = 'query.expand';
		const hook = __.isNull(path);

		return assert.isTrue(hook(context));
	});
});
