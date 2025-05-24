# Create a variant

Variants in Now Prototype It allow you to create pre-configured setups that can be reused across multiple prototypes. This is particularly useful for teams or organisations that want to maintain consistency in their prototyping process.

## How users use a Variant

A Now Prototype It variant is any npm-compatible package that contains a `now-prototype-it.variant.json` file.

If you release this to NPM your users can use it by including the package name when creating a new prototype. For example, if your variant is called `my-awesome-npi-variant`, users can create a new prototype with:

```bash
npx now-prototype-it create --variant my-awesome-npi-variant
```

The most important detail here is that **variants do not need to be approved by Now Prototype It**. This means you can create and use variants without needing to go through a review process.

## Creating the variant structure

If you want to follow along with this documentation, you can create a new directory for your variant. To start this process we'll create an empty directory, then setup git and npm: 

```bash
mkdir -p ~/npi-playground/my-awesome-npi-variant
cd ~/npi-playground/my-awesome-npi-variant
git init
npm init -y
```

Now that we've got the basic structure in place, we can add the necessary files to define our variant.  We need to create a `now-prototype-it.variant.json` file, which will contain the configuration for our variant.  The simplest variant configuration looks like this:

```json
{
  "version-2024-03": {
    "inheritFrom": [
      "nowprototypeit"
    ]
  }
}
```

With this configuration, your new variant will inherit all the features from the default Now Prototype It variant. At this stage your variant already serves two purposes:

 - it gets your users used to creating prototypes using your variant
 - your variant remains installed for these users

Let's make the variant more useful by including some starter files.

Note: `version-2024-03` is the current version of the variant specification. The interface we've chosen here is designed to be future-proof, so you can expect it to remain stable for the foreseeable future. If we do need to make changes, we'll ensure that the new version is compatible with existing variants for a (quite long) changeover period.  In general, we make non-breaking changes which don't require a new version definition.

## Adding starter files to your variant

Starer files are provided in one or more directories in your variant. These files will be copied into the prototype when it is created. This allows you to provide a consistent starting point for your users.

In this case we'll call our starter file directory `my-really-helpful-starter-files`. You can create this directory in your variant's root directory:

```bash
npx now-prototype-it --variant my-awesome-npi-variant create
```

You can load this up with some useful files.  One common file to add is a homepage template, which can be named `index.njk`. This file will be copied into the prototype's `views` directory when a new prototype is created.

Here's an example of what you might include in `my-really-helpful-starter-files/app/views/index.njk`:

```nunjucks
<!DOCTYPE html>
<h1>Welcome to My Awesome Variant</h1>
<p>This prototype was created using the <strong>My Awesome Variant</strong>.</p>
<p>Feel free to explore and modify the files in this prototype.</p>
<p>To manage your prototype, you can visit <a href="/manage-prototype">the management pages</a></p>
```

Now you can specify this directory in your `now-prototype-it.variant.json` file. Update the file to look like this:

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

Note that we're using `__INHERIT__` to inherit the default starter files from the Now Prototype It variant. This means that your variant will include both the default starter files and your custom files.  If the same files exist in both directories, the files in your variant will take precedence.  You can specify multiple directories in the `starterFileDirectories` array, and they will be processed in the order they are listed.  You can also move `"__INHERIT__"` to the end of the array if you want our files to take precedence over your files.

## Testing a variant before publishing

Of course, you'll want to test your variant before publishing it to NPM. To do this, you can specify two parameters when creating a prototype the `--variant` parameter needs to contain the name of your variant (as defined in the `package.json` file) and the `--variant-dependency` parameter can contain any valid NPM reference to your project.

For this documentation we'll create a variant called `my-awesome-npi-variant` and assume that the package is located in the local directory `~/npi-playground/my-awesome-npi-variant`.

### Testing a variant from a local directory

If you've followed the steps above, you can test your variant by running the following command in your terminal:

```bash
npx nowprototypeit --variant=my-awesome-npi-variant --variant-dependency=~/npi-playground/my-awesome-npi-variant create ~/npi-playground/prototype-kits/created-from-variant-v1-local
```

Let's break that down:
- `npx nowprototypeit` runs the Now Prototype It CLI.
- `--variant=my-awesome-npi-variant` specifies the name of your variant.
- `--variant-dependency=~/npi-playground/my-awesome-npi-variant` specifies the path to your variant package.
- `create ~/npi-playground/prototype-kits/created-from-variant-v1-local` creates a new prototype in the specified directory.  There's no need to create the directory structure beforehand, as the CLI will create it for you.

### Testing a variant from github

Testing from GitHub is a great way to ensure your variant works as expected before publishing it to NPM.  You can publish a branch and get some users to test it out, or you can publish a release and get users to test that.

If you want to test your variant from a GitHub repository, you can specify the repository URL in the `--variant-dependency` parameter. For example, we have published the progress so far to GitHub, so you can test it with the following command:

```bash
npx nowprototypeit --variant=my-awesome-npi-variant --variant-dependency=github:nowprototypeit/variant-example-for-docs#docs-stage-1 create ~/npi-playground/prototype-kits/created-from-variant-v1-github
```

All we've changed here is the `--variant-dependency` parameter, which now points to a GitHub repository. The format is `github:<owner>/<repo>#<branch>`, where `<owner>` is the GitHub username or organization, `<repo>` is the repository name, and `<branch>` is the branch you want to use.  In this case, we're using the `docs-stage-1` branch of the `variant-example-for-docs` repository in the `nowprototypeit` organisation.

## Installing other packages

Another useful feature of variants is that you can install other NPM packages as part of your variant. This allows you to include additional functionality or libraries that your users might find helpful.

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

This will install the `my-awesome-npi-plugin` package when your variant is used to create a new prototype. You can specify multiple packages in the `installedPackages` array, and they will all be installed.

## Changing the install scripts

You can add scripts which will be run when your variant is installed. This is useful for setting up any additional configuration or files that your users might need.

It's quite rare for this to be needed, but if you do need it, you can add a `postCreateJSScripts` section to your `now-prototype-it.variant.json` file. For example:

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

We can create this file:

```bash
mkdir -p bin
touch bin/add-the-current-time.js
```

As an example, we can add a script that writes the creation time to the homepage in the prototype.  The contents of `bin/add-the-current-time.js` could look like this:

```javascript
const dateString = new Date().toISOString()

console.log(' - Writing current time', dateString)

const fs = require('fs')

fs.appendFileSync('./app/views/index.njk', `<p>Created at ${dateString}`, 'utf8')
```

Most variants won't need to specify these scripts, but if you need to add a pre-commit hook or set up some difficult configuration then this is the place to do it.

Another use would be if you want to replace `git` with `svn`, you can provide your own script to set up `svn` and don't `__INHERIT__` the defaults - it's worth noting though, that if you don't inherit the defaults, you will need to watch for any changes to the default variant and update your variant accordingly.

## Publishing your variant

When you're ready to publish you can use `npm publish` as usual.  Make sure to update the `version` field in your `package.json` file before publishing, as this will ensure that users get the latest version of your variant.  [NPM's documentation on publishing packages](https://docs.npmjs.com/cli/v9/commands/npm-publish) is a good place to start if you're not familiar with the process.

## Try our published version

We have published this variant to NPM, so you can try it out by running the following command:

```bash
mkdir -p ~/npi-playground/prototype-kits/example-variant-prototype
cd ~/npi-playground/prototype-kits/example-variant-prototype
npx now-prototype-it --variant my-awesome-npi-variant create
```

## Conclusion

You can use a variant to create a pre-configured setup that can be reused across multiple prototypes. This is particularly useful for teams or organisations that want to maintain consistency in their prototyping process.

Once a user has created a prototype using your variant, they can continue to use it as usual. They can add new files, modify existing files, and run the prototype just like any other Now Prototype It project.

A variant and a plugin can come from the same dependency, but for the clarity of the documentation we tend to keep them separate.  To find out what's possible from a plugin, check out the [Plugins documentation](/create-a-plugin).
