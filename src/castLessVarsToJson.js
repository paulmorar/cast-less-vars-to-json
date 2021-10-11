import less from 'less';

const defaultOptions = {
    nameProjectionFunc: null,
  };

export const castLessVarsToJson = (str = "", options) => {
    options = Object.assign({}, defaultOptions, options);
    return new Promise((resolve, reject) => {
      less.parse(str, options.config, (err, root, _imports, lessOpts) => {
        if (err) reject(err);
  
        let evalEnv = new less.contexts.Eval(lessOpts);
        let evaldRoot = root.eval(evalEnv);
        let ruleset = evaldRoot.rules;
  
        resolve(
          ruleset
            .filter((node) => node.variable === true)
            .reduce((prev, curr) => {
              let entry = {};
              entry[
                typeof options.nameProjectionFunc === "function"
                  ? options.nameProjectionFunc(curr.name)
                  : curr.name
              ] = curr.value.toCSS(lessOpts);
              return Object.assign({}, prev, entry);
            }, {})
        );
      });
    });
  };