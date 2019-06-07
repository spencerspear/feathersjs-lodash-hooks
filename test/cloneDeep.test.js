const { assert } = require('chai');
const __ = require('../index');

describe(`cloneDeep(fromPath, toPath)`, () => {
	it(`throws a 'BadRequest' error if the 'fromPath' is not found`, () => {
		const context = {};
		const fromPath = 'query.expand';
		const toPath = 'route.expand';
		const hook = __.cloneDeep(fromPath, toPath);
		const fn = () => hook(context); // eslint-disable-line arrow-body-style

		return assert.throws(fn, ReferenceError);
	});

	it(`creates the 'toPath' if it does not exist`, () => {
		const query = { expand: { prop: 'value' } };
		const context = { query };
		const fromPath = 'query.expand';
		const toPath = 'route.expand';
		const hook = __.cloneDeep(fromPath, toPath);
		const result = hook(context);

		return assert.exists(result.route.expand);
	});

	it(`replaces the value at 'toPath' if it already exists`, () => {
		const query = { expand: { prop: 'value' } };
		const route = { expand: { other: 'value2' } };
		const context = { query, route };
		const fromPath = 'query.expand';
		const toPath = 'route.expand';
		const hook = __.cloneDeep(fromPath, toPath);
		const result = hook(context);

		return assert.deepEqual(result.query.expand, result.route.expand);
	});

	it(`creates an object with the same own properties as the source object at 'toPath'`, () => {
		const query = { expand: { prop: 'value' } };
		const context = { query };
		const fromPath = 'query.expand';
		const toPath = 'route.expand';
		const hook = __.cloneDeep(fromPath, toPath);
		const result = hook(context);

		return assert.deepEqual(result.query.expand, result.route.expand);
	});

	it(`doesn't have the same reference between the source and cloned object`, () => {
		const query = { expand: { prop: 'value' } };
		const context = { query };
		const fromPath = 'query.expand';
		const toPath = 'route.expand';
		const hook = __.cloneDeep(fromPath, toPath);
		const result = hook(context);

		return assert.notStrictEqual(result.route.expand, query.expand);
	});

	it(`doesn't change the new object when the source object is changed`, () => {
		const query = { expand: { prop: 'value' } };
		const context = { query };
		const fromPath = 'query.expand';
		const toPath = 'route.expand';
		const hook = __.cloneDeep(fromPath, toPath);
		const result = hook(context);

		query.expand.prop = 'new-value';

		return assert.notEqual(result.route.expand, query.expand);
	});

	it(`doesn't change the source object when the new object is changed`, () => {
		const query = { expand: { prop: 'value' } };
		const context = { query };
		const fromPath = 'query.expand';
		const toPath = 'route.expand';
		const hook = __.cloneDeep(fromPath, toPath);
		const result = hook(context);

		result.route.expand.prop = 'new-value';

		return assert.notEqual(query.expand, result.route.expand);
	});
});
