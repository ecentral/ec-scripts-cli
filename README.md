# eCentral Scripts CLI

Start building modern front end projects in seconds.

## Quick Overview

eC Scripts CLI is a command-line tool that you can use to set up eC Scripts projects with only one command.

[Learn more about eC Scripts.](https://github.com/ecentral/ec-scripts)

## Installation

**Requirements:** You need at least Node.js 8.x and NPM 5.x installed.

```
npm install -g ec-scripts-cli
```

## Usage

```
ec-cli init [...presets]
```

Note that the package name is `ec-scripts-cli` whereas the *CLI command* is `ec-cli`.

### Examples

Set up a new project in the current directory:

```
ec-cli init
```

Set up a new project in the current directory with official eC Scripts React preset and some custom preset from GitHub:

```
ec-cli init react git://github.com/user/some-preset.git
```

### Notes

**Using npm presets:** Preset names get resolved internally by prefixing `ec-scripts-preset-`.<br>
Therefore a preset name like `react` is resolved and `npm install`ed as `ec-scripts-preset-react`.<br>
If you want to publish an eC Scripts preset, make sure to prefix it correctly.

**Using git presets:** When using a preset from git directly, the repository name needs to match the name in the preset's `package.json`.<br>
According to above that is `some-preset`.

## Presets

A preset source must contain a valid `package.json` in order to be installable by NPM.

It can contain an extended configuration for eC Scripts by providing a root
`ecconf.js` file.

You can also use a preset for project boilerplating.<br>
If your preset contains a root folder `/boilerplate`, then all the content inside will be copied
to your project root upon initialization. Sub directory structures included.

Boilerplate presets can be helpful if you want to start out with some basic features like
router setup or default page layouts or *you name it*.

### Example

Here's a basic file structure of how a preset can look:

```
/
  boilerplate/
    src/
      index.js
  ecconf.js
  package.json
```

## Acknowledgements

We are grateful to the authors of existing related projects for their ideas and inspiration:

[Preact CLI](https://github.com/developit/preact-cli)<br>

## License

MIT
