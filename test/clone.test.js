const { assert } = require('chai');
const __ = require('../index');

describe(`clone(fromPath, toPath)`, () => {
	it(`throws a 'BadRequest' error if the 'fromPath' is not found`, () => {
		const context = {};
		const fromPath = 'from.obj';
		const toPath = 'to.obj';
		const hook = __.clone(fromPath, toPath);
		const fn = () => hook(context); // eslint-disable-line arrow-body-style

		return assert.throws(fn, ReferenceError);
	});

	it(`creates the 'toPath' if it does not exist`, () => {
		const from = { obj: { prop: 'value' } };
		const context = { from };
		const fromPath = 'from.obj';
		const toPath = 'to.obj';
		const hook = __.clone(fromPath, toPath);
		const result = hook(context);

		return assert.exists(result.to.obj);
	});

	it(`replaces the value at 'toPath' if it already exists`, () => {
		const from = { obj: { prop: 'value' } };
		const to = { obj: { other: 'value2' } };
		const context = { from, to };
		const fromPath = 'from.obj';
		const toPath = 'to.obj';
		const hook = __.clone(fromPath, toPath);
		const result = hook(context);

		return assert.deepEqual(result.from.obj, result.to.obj);
	});

	it(`creates an object with the same own properties as the source object at 'toPath'`, () => {
		const from = { obj: { prop: 'value' } };
		const context = { from };
		const fromPath = 'from.obj';
		const toPath = 'to.obj';
		const hook = __.clone(fromPath, toPath);
		const result = hook(context);

		return assert.deepEqual(result.from.obj, result.to.obj);
	});

	it(`maintains the same reference between the source children and cloned children`, () => {
		const from = { obj: { prop: 'value' } };
		const context = { from };
		const fromPath = 'from';
		const toPath = 'to';
		const hook = __.clone(fromPath, toPath);
		const result = hook(context);

		return assert.strictEqual(result.to.obj, from.obj);
	});

	it(`doesn't change the new object when the source object top level is updated`, () => {
		const from = { obj: { prop: 'value' } };
		const context = { from };
		const fromPath = 'from';
		const toPath = 'to';
		const hook = __.clone(fromPath, toPath);
		const result = hook(context);

		from.obj = 'string';

		return assert.notEqual(result.to, from);
	});

	it(`changes the new object when the source object child level is updated`, () => {
		const from = { obj: { prop: 'value' } };
		const context = { from };
		const fromPath = 'from';
		const toPath = 'to';
		const hook = __.clone(fromPath, toPath);
		const result = hook(context);

		from.obj.prop = 'new-value';

		return assert.strictEqual(result.to.obj, from.obj);
	});
});
