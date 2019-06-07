const { assert } = require('chai');
const __ = require('../index');

describe(`isNil(path)`, () => {
	it(`returns 'false' when value at path is string`, () => {
		const query = { expand: 'string' };
		const context = { query };
		const path = 'query.expand';
		const hook = __.isNil(path);

		return assert.isFalse(hook(context));
	});

	it(`returns 'false' when value at path is falsy`, () => {
		const query = { expand: 0 };
		const context = { query };
		const path = 'query.expand';
		const hook = __.isNil(path);

		return assert.isFalse(hook(context));
	});

	it(`returns 'true' if path does not exist (undefined)`, () => {
		const context = {};
		const path = 'query';
		const hook = __.isNil(path);

		return assert.isTrue(hook(context));
	});

	it(`returns 'true' when value at path is null`, () => {
		const query = { expand: null };
		const context = { query };
		const path = 'query.expand';
		const hook = __.isNil(path);

		return assert.isTrue(hook(context));
	});

	it(`returns 'true' when value at path is undefined`, () => {
		const query = { expand: undefined };
		const context = { query };
		const path = 'query.expand';
		const hook = __.isNil(path);

		return assert.isTrue(hook(context));
	});
});
