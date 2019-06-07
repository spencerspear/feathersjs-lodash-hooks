const { assert } = require('chai');
const feathersError = require('@feathersjs/errors');
const __ = require('../index');

describe(`throw(errorType, errorMsg = null)`, () => {
	it(`has one required parameter`, () => {
		return assert.equal(__.throw.length, 1);
	});

	it(`throws the corresponding 'feathersError'`, () => {
		assert.throws(() => __.throw('BadRequest')(), feathersError.BadRequest);
		assert.throws(() => __.throw('NotAuthenticated')(), feathersError.NotAuthenticated);
		assert.throws(() => __.throw('PaymentError')(), feathersError.PaymentError);
		assert.throws(() => __.throw('Forbidden')(), feathersError.Forbidden);
		assert.throws(() => __.throw('NotFound')(), feathersError.NotFound);
		assert.throws(() => __.throw('MethodNotAllowed')(), feathersError.MethodNotAllowed);
		assert.throws(() => __.throw('NotAcceptable')(), feathersError.NotAcceptable);
		assert.throws(() => __.throw('Timeout')(), feathersError.Timeout);
		assert.throws(() => __.throw('Conflict')(), feathersError.Conflict);
		assert.throws(() => __.throw('LengthRequired')(), feathersError.LengthRequired);
		assert.throws(() => __.throw('Unprocessable')(), feathersError.Unprocessable);
		assert.throws(() => __.throw('TooManyRequests')(), feathersError.TooManyRequests);
		assert.throws(() => __.throw('GeneralError')(), feathersError.GeneralError);
		assert.throws(() => __.throw('NotImplemented')(), feathersError.NotImplemented);
		assert.throws(() => __.throw('BadGateway')(), feathersError.BadGateway);
		assert.throws(() => __.throw('Unavailable')(), feathersError.Unavailable);
	});

	it(`uses the error message included in 'errorMsg' if 'errorMsg' is a string`, () => {
		const errorMsg = 'The error message';

		return assert.throws(() => __.throw('BadRequest', errorMsg)(), feathersError.BadRequest, errorMsg);
	});

	it(`uses the error message returned in 'errorMsg' callback`, () => {
		const msg = 'The error message';
		const errorMsg = () => msg;
		const fn = () => __.throw('BadRequest', errorMsg)();

		return assert.throws(fn, feathersError.BadRequest, msg);
	});

	it(`uses the context object to fulfill errorMsg variables`, () => {
		const errorMsg = (context) => `${context.params.test}`;
		const test = 'string';
		const params = { test };
		const context = { params };
		const fn = () => __.throw('BadRequest', errorMsg)(context);

		return assert.throws(fn, feathersError.BadRequest, 'string');
	});
});
