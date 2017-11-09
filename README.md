# eCentral CLI

Start building modern front end projects in seconds.

## Quick Overview

eC CLI is a command-line tool that you can use to set up projects with only one command.

## Installation

**Requirements:** You need at least Node 8.x and NPM 5.x installed.  

```
npm install -g ec-cli
```

## Usage

```
ec-cli init [...presets]
```

### Examples

Set up a new project in the current directory:

```
ec-cli init
```

Set up a new project in the current directory with React and some custom preset from GitHub:

```
ec-cli init react git://github.com/user/some-preset.git
```

**NOTE:** When using a git URL, make sure the repository name matches the name in your `package.json`.

## Presets

A preset source must contain a valid `package.json` in order to be installable by NPM.

It can contain an extended configuration for eC Scripts by providing a root
`ecconf.js` file.

You can also use a preset for project boilerplating.  
If your preset contains a root folder `/boilerplate`, then all the content will be copied
to your project root upon initialization. Sub directory structures included.

Boilerplate presets can be helpful if you want to start out with some basic features like
router setup or default page layouts or you name it.

### Example

Here's a basic structure of how a preset can look:

```
/
  boilerplate/
    src/
      index.js
  ecconf.js
  package.json
```
