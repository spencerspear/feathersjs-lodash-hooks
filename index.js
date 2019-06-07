const common = require('feathers-hooks-common');
const feathersError = require('@feathersjs/errors');
const _ = require('lodash');

class LodashHooks {
	arrayHasValue(path, value) {
		return (context) => {
			const arr = _.get(context, path);

			if (!_.isArray(arr)) {
				return false;
			}

			return Boolean(_.find(arr, (elem) => {
				return _.isEqual(elem, value);
			}));
		};
	}

	has(path) {
		return (context) => {
				return _.has(context, path);
		};
	}

	isEqual(path, value) {
		return (context) => {
			return _.isEqual(value, _.get(context, path));
		};
	}

	isNull(path) {
		return (context) => {
			return _.isNull(_.get(context, path));
		};
	}

	isNil(path) {
		return (context) => {
			return _.isNil(_.get(context, path));
		};
	}

	assign(toPath, fromPath) {
		return (context) => {
			const fromVal = _.get(context, fromPath);
			const toVal = _.get(context, toPath);

			if (_.isUndefined(fromVal)) {
				throw new ReferenceError(`path '${fromPath}' does not exist in the context object`);
			}

			const copy = _.assign(toVal, fromVal);

			return _.set(context, toPath, copy);
		};
	}

	copy(fromPath, toPath) {
		return (context) => {
			const from = _.get(context, fromPath);

			return _.set(context, toPath, from);
		};
	}

	set(value, toPath) {
		return (context) => {
			return _.set(context, toPath, value);
		};
	}

	clone(fromPath, toPath) {
		return (context) => {
			const fromVal = _.get(context, fromPath);

			if (_.isUndefined(fromVal)) {
				throw new ReferenceError(`path '${fromPath}' does not exist in the context object`);
			}

			const clone = _.clone(fromVal);

			return _.set(context, toPath, clone);
		};
	}

	cloneDeep(fromPath, toPath) {
		return (context) => {
			const fromVal = _.get(context, fromPath);

			if (_.isUndefined(fromVal)) {
				throw new ReferenceError(`path '${fromPath}' does not exist in the context object`);
			}

			const clone = _.cloneDeep(fromVal);

			return _.set(context, toPath, clone);
		};
	}

	merge(toPath, fromPath) {
		return (context) => {
			const fromVal = _.get(context, fromPath);
			const toVal = _.get(context, toPath);

			if (_.isUndefined(fromVal)) {
				throw new ReferenceError(`path '${fromPath}' does not exist in the context object`);
			}

			const copy = _.merge(toVal, fromVal);

			return _.set(context, toPath, copy);
		};
	}

	log(path) {
		return (context) => {
			console.log(_.get(context, path)); // eslint-disable-line

			return context;
		};
	}

	throw(errorType, errorMsg = null) {
		return (context) => {
			if (errorMsg) {
				const message = _.isFunction(errorMsg)
					? errorMsg(context)
					: errorMsg;

				throw new feathersError[errorType](message);
			}

			throw new feathersError[errorType]();
		};
	}

	scope(...contextFunctionsList) {
    return async (context) => {
      const newContext = await common.combine(
        (context) => {
          context.params.scope = null;

          return context;
        },
        ...contextFunctionsList,
        (context) => {
          delete context.params.scope;

          return context;
        }
      ).call(this, context);

      return newContext;
    };
  }

	get(path, callback) {
		return (context) => {
			const value = _.get(context, path);

			return callback(value, context);
		};
	}

	getSet(getPath, setPath, transformFn) {
		return async (context) => {
			const getValue = _.get(context, getPath);
			const setValue = await transformFn(getValue, context);

			return _.set(context, setPath, setValue);
		};
	}
}

const predicates = new LodashHooks();

module.exports = predicates;
