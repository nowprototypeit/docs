## Test your variant

Of course, you'll want to test your variant before publishing it to NPM. To do this, you can specify two parameters when creating a prototype the `--variant` parameter needs to contain the name of your variant (as defined in the `package.json` file) and the `--variant-dependency` parameter can contain any valid NPM reference to your project.

For this documentation we'll create a variant called `my-awesome-npi-variant` and assume that the package is located in the local directory `~/npi-playground/my-awesome-npi-variant`.

## Before you start

Before you test your variant, make sure you:

* <!--Anything here?-->

## Testing a variant from a local directory

To test your variant locally, run the following command in your terminal (replacing any file or directory names if necessary):

```bash
npx nowprototypeit --variant=my-awesome-npi-variant --variant-dependency=~/npi-playground/my-awesome-npi-variant create ~/npi-playground/prototype-kits/created-from-variant-v1-local
```

Let's break that down:
- `npx nowprototypeit` runs the Now Prototype It CLI.
- `--variant=my-awesome-npi-variant` specifies the name of your variant.
- `--variant-dependency=~/npi-playground/my-awesome-npi-variant` specifies the path to your variant package.
- `create ~/npi-playground/prototype-kits/created-from-variant-v1-local` creates a new prototype in the specified directory.  There's no need to create the directory structure beforehand, as the CLI will create it for you.

## Testing a variant from GitHub

Testing from GitHub is a great way to carry out user testing before publishing it to NPM. You can publish a branch or a release and get some users to test it out.

To test your variant from a GitHub repository, you can specify the repository URL in the `--variant-dependency` parameter, like so:

```bash
npx nowprototypeit --variant=my-awesome-npi-variant --variant-dependency=github:nowprototypeit/variant-example-for-docs#docs-stage-1 create ~/npi-playground/prototype-kits/created-from-variant-v1-github
```

The format is `github:<owner>/<repo>#<branch>`, where `<owner>` is the GitHub username or organization, `<repo>` is the repository name, and `<branch>` is the branch you want to use. In this example, the `owner` is `nowprototypeit`, the `repo` is `variant-example-for-docs`, and the `branch` is `docs-stage-1`.