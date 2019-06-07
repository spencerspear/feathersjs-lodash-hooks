const { assert } = require('chai');
const __ = require('../index');

describe(`arrayHasValue(path, value)`, () => {
	it(`returns 'false' if path doesn't exist`, () => {
		const context = {};
		const path = 'query.expand';
		const valueToFind = { test: 'object' };
		const hook = __.arrayHasValue(path, valueToFind);

		return assert.isFalse(hook(context));
	});

	it(`returns 'false' if path is not array`, () => {
		const query = { expand: 'string' };
		const context = { query };
		const path = 'query.expand';
		const valueToFind = {};
		const hook = __.arrayHasValue(path, valueToFind);

		return assert.isFalse(hook(context));
	});

	it(`returns 'false' if value is not present in array`, () => {
		const elem = 0;
		const query = { expand: [elem] };
		const context = { query };
		const path = 'query.expand';
		const valueToFindToFind = 1;
		const hook = __.arrayHasValue(path, valueToFindToFind);

		return assert.isFalse(hook(context));
	});

	it(`returns 'false' if value object has additional own properties`, () => {
		const elem = { prop: 'val', prop2: 'val' };
		const similar = { prop: 'val' };
		const query = { expand: [elem] };
		const context = { query };
		const path = 'query.expand';
		const hook = __.arrayHasValue(path, similar);

		return assert.isFalse(hook(context));
	});

	it(`returns 'true' if value object has same own properties`, () => {
		const elem = { prop: 'val' };
		const copy = { prop: 'val' };
		const query = { expand: [elem] };
		const context = { query };
		const path = 'query.expand';
		const hook = __.arrayHasValue(path, copy);

		return assert.isTrue(hook(context));
	});
});
