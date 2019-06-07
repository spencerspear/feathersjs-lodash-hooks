const { assert } = require('chai');
const __ = require('../index');

describe(`has(path)`, () => {
	it(`returns 'false' if the path is falsy`, () => {
		const context = {};
		const path = null;
		const hook = __.has(path);

		return assert.isFalse(hook(context));
	});

	it(`returns 'false' if the path does not exist`, () => {
		const query = { expand: true };
		const context = { query };
		const path = 'route';
		const hook = __.has(path);

		return assert.isFalse(hook(context));
	});

	it(`returns 'true' if path exists`, () => {
		const query = { expand: true };
		const context = { query };
		const path = 'query.expand';
		const hook = __.has(path);

		return assert.isTrue(hook(context));
	});

	it(`returns 'true' even of value at path is falsy`, () => {
		const query = { expand: null };
		const context = { query };
		const path = 'query.expand';
		const hook = __.has(path);

		return assert.isTrue(hook(context));
	});
});
