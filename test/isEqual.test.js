const { assert } = require('chai');
const __ = require('../index');

describe(`isEqual(path, value)`, () => {
	it(`returns 'false' if path doesn't exist`, () => {
		const query = {};
		const context = { query };
		const path = 'query.expand';
		const value = { expand: '1' };
		const hook = __.isEqual(path, value);

		return assert.isFalse(hook(context));
	});

	it(`returns 'false' if the value object has additional own properties`, () => {
		const query = { expand: '1' };
		const context = { query };
		const path = 'query';
		const value = { expand: '1', expand2: '1' };
		const hook = __.isEqual(path, value);

		return assert.isFalse(hook(context));
	});

	it(`returns 'false' if the value object has the same properties but different values`, () => {
		const query = { expand: '1' };
		const context = { query };
		const path = 'query';
		const value = { expand: '2' };
		const hook = __.isEqual(path, value);

		return assert.isFalse(hook(context));
	});

	it(`returns 'true' if the value object has the same own properties and values`, () => {
		const query = { expand: '1' };
		const context = { query };
		const path = 'query';
		const value = { expand: '1' };
		const hook = __.isEqual(path, value);

		return assert.isTrue(hook(context));
	});
});
