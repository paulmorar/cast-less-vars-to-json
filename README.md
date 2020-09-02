## Description

This tool allows you to cast less variables into JSON key-value pairs.
This is based on [less-variables-to-json](https://github.com/khell/less-variables-to-json), for which maintenance stopped.

## Install

`npm install cast-less-vars-to-json`
or
`yarn add cast-less-vars-to-json`

## Usage

Returns a `Promise`.

```js
const castLessVarsToJson = require('cast-less-vars-to-json');


// Standard usage
castLessVarsToJson("@primary-color: red;").then((result) => {
    const json = result;  // json = { "@primary-color": "red" }
});

// With a projection function to change the name
const nameProjectionFunc = (name) => name.substr(1);
castLessVarsToJson("@primary-color: red;", { nameProjectionFunc }).then((result) => {
    const json = result;  // json = { "primary-color": "red" }
};
```

## License

MIT
