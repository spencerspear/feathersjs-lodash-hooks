const { assert } = require('chai');
const __ = require('../index');

describe(`merge(toPath, fromPath)`, () => {
	it(`throws a 'BadRequest' error if the 'fromPath' is not found`, () => {
		const context = {};
		const fromPath = 'from.obj';
		const toPath = 'to.obj';
		const hook = __.merge(toPath, fromPath);
		const fn = () => hook(context); // eslint-disable-line arrow-body-style

		return assert.throws(fn, ReferenceError);
	});

	it(`creates the 'toPath' if it does not exist`, () => {
		const from = { obj: { prop: 'value' } };
		const context = { from };
		const fromPath = 'from';
		const toPath = 'to';
		const hook = __.merge(toPath, fromPath);
		const result = hook(context);

		return assert.exists(result.to);
	});

	it(`replaces the properties at 'toPath' if they already exists`, () => {
		const to = { obj: { prop: 'value' } };
		const from = { obj: { prop: 'value2' } };
		const context = { from, to };
		const fromPath = 'from';
		const toPath = 'to';
		const hook = __.merge(toPath, fromPath);
		const result = hook(context);

		return assert.equal(result.to.obj.prop, from.obj.prop);
	});

	it(`creates an object with the same own properties as the source object at 'toPath'`, () => {
		const from = { obj: { prop: 'value' } };
		const context = { from };
		const fromPath = 'from';
		const toPath = 'to';
		const hook = __.merge(toPath, fromPath);
		const result = hook(context);

		return assert.deepEqual(result.to, from);
	});

	it(`doesn't maintain references at the top level`, () => {
		const from = { obj: { prop: 'value' } };
		const context = { from };
		const fromPath = 'from';
		const toPath = 'to';
		const hook = __.merge(toPath, fromPath);
		const result = hook(context);

		return assert.notStrictEqual(result.to, from);
	});

	it(`doesn't maintains references at the child level`, () => {
		const from = { obj: { prop: 'value' } };
		const context = { from };
		const fromPath = 'from';
		const toPath = 'to';
		const hook = __.merge(toPath, fromPath);
		const result = hook(context);

		return assert.notStrictEqual(result.to.obj, from.obj);
	});
});
