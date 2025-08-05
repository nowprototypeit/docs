# Create a variant

Variants in Now Prototype It allow you to create pre-configured setups that can be reused across multiple prototypes. This is particularly useful for teams or organisations that want to maintain consistency in their prototyping process.

This guide describes the following steps:

1. **Create the variant structure**: Set up the directory and necessary files for a new variant.
1. **Add starter files to your variant**: Add the files you want the variant to apply when users use it to create a new prototype.
1. **Test your new variant**: Make sure your variant's structure and starter files are working and ready for publishing.
1. **Configure your variant to install other NPM packages (optional)**: Add other NPM packages you want your variant to install when users use it to create a new prototype.
1. **Change your variant's install scripts (optional)**: Add or modify the install scripts that run when your variant runs.

Once you've created your variant, you can [test it](/variants/test-a-variant) and [publish it](/variants/publish-a-variant).

## Before you start

Before you create a new variant, make sure you:

* Install the required tools listed in the [Setup](/installation) documentation.
* See [Understand variants](/variants/understand-variants) for details on the structure of a variant, and how users interact with them.

## Create the variant structure

To start, you need to create the directory and the config file for your variant.

### 1. Create a new directory for your variant

In the command line, create a new directory. You can choose any location for this new directory. 

Next, initialise `git` and `npm` in that directory.

The following commands create an empty directory called `my-awesome-npi-variant`, then initialise `git` and `npm`: 

```bash
mkdir -p ~/npi-playground/my-awesome-npi-variant
cd ~/npi-playground/my-awesome-npi-variant
git init
npm init -y
```
### 2. Create a variant config file

In that directory, create a `now-prototype-it.variant.json` file. This file defines the configuration for your new variant.  

### 3. Write in your variant config file

The simplest variant configuration looks like this:

```json
{
  "version-2024-03": {
    "inheritFrom": [
      "nowprototypeit"
    ]
  }
}
```

This example file configures your new variant to inherit all the features from the default Now Prototype It variant. 

At this stage, your variant should function (subject to testing), and users should be able to install it.

>**Note**: `version-2024-03` is the current version of the variant specification. The interface we've chosen here is designed to be future-proof, so you can expect it to remain stable for the foreseeable future. If we do need to make changes, we'll ensure that the new version is compatible with existing variants for a (quite long) changeover period.  In general, we make non-breaking changes which don't require a new version definition.

Next, let's make the variant more useful by including some starter files.

## Add starter files to your new variant

Starter files define what happens when users create protoypes using your variant.

You can provide starter files in one or more directories in your variant. Your variant copies these files into all new prototypes made with it. This allows you to provide a consistent starting point for your users.

### 1. Create a starter file directory 

You can create a starter file directory anywhere, including in the the variant's root directory.

The following command creates a starter file directory called `my-really-helpful-starter-files`.

```bash
npx now-prototype-it --variant my-awesome-npi-variant create
```

### 2. Add starter files to this directory

When you create a new prototype, your variant copies any starter file into the prototype's `views` directory.

Here's an example of what you might include in `my-really-helpful-starter-files/app/views/index.njk`:

```nunjucks
<!DOCTYPE html>
<h1>Welcome to My Awesome Variant</h1>
<p>This prototype was created using the <strong>My Awesome Variant</strong> variant.</p>
<p>Feel free to explore and modify the files in this prototype.</p>
<p>To manage your prototype, you can visit <a href="/manage-prototype">the management pages</a></p>
```

### 3. Specify the directory in the variant config file
Now you can specify this directory in your `now-prototype-it.variant.json` file. 

Update the file to look like this:

```json
{
  "version-2024-03": {
    "inheritFrom": [
      "nowprototypeit"
    ],
    "starterFileDirectories": [
      "__INHERIT__",
      "my-really-helpful-starter-files"
    ]
  }
}
```

### 4. Organise your starter file directory array

You can specify multiple directories in the `starterFileDirectories` array. Now Prototype It processes starter file directories in the order they are listed. If the same files exist in multiple directories, the files closest to the bottom of the list take precedence.

For example, in the configuration above, the files in `my-really-helpful-starter-files` take precedence. If you want the files in the `__INHERIT__` directory to take precedent, you can move `"__INHERIT__"` to the end of the array. 

## Test your new variant

At this point, you should [test your variant](/variants/test-a-variant) to make sure everything is functioning.

If the test is successful, and if the variant is ready, you can then [publish your variant](/variants/publish-a-variant) as an NPM package.

## Configure your variant to install other NPM packages (optional)

You can configure variants to install other NPM packages. This allows you to include additional functionality or libraries that your users might find helpful.

The following example adds the `installedPackages` array to the variant config file, and adds the `my-awesome-npi-plugin` NPM package. This instructs your variant to install the `my-awesome-npi-plugin` package each time the variant is used to create a new prototype. 

```json
{
  "version-2024-03": {
    "inheritFrom": [
      "nowprototypeit"
    ],
    "starterFileDirectories": [
      "__INHERIT__",
      "my-really-helpful-starter-files"
    ],
    "installedPackages": [
      "__INHERIT__",
      "my-awesome-npi-plugin"
    ]
  }
}
```

You can specify multiple packages in the `installedPackages` array. 

## Change your variant's install scripts (optional)

You can add scripts that set up additional configuration or files when your variant runs a prototype. 

>**Important**: In most cases, you shouldn't need to change your variant's install scripts. Only use this functionality if you have a specific need and you are confident with the technology.

For example, if you want to replace `git` with `svn`, you could provide your own script to set up `svn`, and remove `__INHERIT__` from the variant config file. However, if you don't inherit the defaults, you will need to watch for any changes to the default variant and update your variant accordingly.

### 1. Create an install script

Create and write a JavaScript file.

As an example, we can add a script that writes the creation time to the homepage in the prototype. 

We can create this file:

```bash
mkdir -p bin
touch bin/add-the-current-time.js
```

The contents of `bin/add-the-current-time.js` could look like this:

```javascript
const dateString = new Date().toISOString()

console.log(' - Writing current time', dateString)

const fs = require('fs')

fs.appendFileSync('./app/views/index.njk', `<p>Created at ${dateString}`, 'utf8')
```

### 2. Add the install script to the variant config file

To add a new install script to your variant, add a `postCreateJSScripts` section to your `now-prototype-it.variant.json` file. 

The following example adds the `postCreateJSScripts` array to the variant config file, and adds the `bin/add-the-current-time.js` install script:

```json
{
  "version-2024-03": {
    "inheritFrom": [
      "nowprototypeit"
    ],
    "starterFileDirectories": [
      "__INHERIT__",
      "my-really-helpful-starter-files"
    ],
    "installedPackages": [
      "__INHERIT__",
      "my-awesome-npi-plugin"
    ],
    "postCreateJSScripts": [
      "__INHERIT__",
      "bin/add-the-current-time.js"
    ]
  }
}
```

>**Important**: Always [test your variant](/variants/test-a-variant) before publishing, to make sure the changes you're making work as expected.