# Understand variants

In Now Prototype It, a variant is a pre-configured setup package that runs when you create a prototype. 

Teams and organisation can have custom variants that set up starting pages and plug-ins, so that individual users don't have to do it every time. This is particularly useful for groups that want to maintain consistency in their prototyping process.

## Using a variant

To use an existing variant, include the package name in the command you write when you create a new prototype. 

After the `create` command, enter `--variant`, followed by the variant package name.

For example, this command creates a new prototype called `new-prototype` that uses the `my-awesome-npi-variant` variant.

```bash
npx now-prototype-it create --variant my-awesome-npi-variant new-prototype
```

## Creating a variant

If you want to develop a variant, you need to know how it's structured and how it's published.

>**Note**: Variants do not need to be approved by Now Prototype It. This means you can create and use variants without needing to go through a review process.

Once a user has created a prototype using your variant, they can continue to use it as usual. They can add new files, modify existing files, and run the prototype just like any other Now Prototype It project.

A variant and a plugin can come from the same dependency, but for the clarity of the documentation we tend to keep them separate.  To find out what's possible from a plugin, check out the [Plugins documentation](/create-a-plugin).

After you've read this section, see [Create a variant](/variants/create-a-variant) for a step-by-step guide. 

### Variant structure

A Now Prototype It variant is an NPM-compatible package that contains a `now-prototype-it.variant.json` file.

In its simplest form, a variant comprises:

* **A directory** with `git` and `npm` initialised.
    * **A config file**: A `now-prototype-it.variant.json` file that configures the variant's behavior when a prorotype is created.
    * **Starter files**: Nunjucks (`.njk`) files that get copied into a new prototype when the prototype is created.
    * **Installation files** (optional): A JavaScript (`.js`) file that defines the variant's installation or initialization behaviour.

### Variant defaults

You can insert an an `__INHERIT__` item in all arrays in the variant config file (`now-prototype-it.variant.json`). This item always refers to the default Now Prototype It files or settings.

Now Prototype It processes arrays in the order they are listed. If the same files or settings exist in multiple array items, the files closest to the bottom of the list take precedence.

For example, if `__INHERIT__` is at the top of the array, it is always lowest priority. We recommend this, so that it can act as a fallback. If `__INHERIT__` is at the bottom of the array, it will override all other items in the array. <!--This is somewhat assumed from the info on FileDirectories; is it correct?-->

### Variant publishing

Variants are published as NPM packages. For details, see [Publish a variant](/variants/publish-a-variant).

### Example published variant

We have published this variant to NPM, so you can try it out. To access it, run the following commands:

```bash
mkdir -p ~/npi-playground/prototype-kits/example-variant-prototype
cd ~/npi-playground/prototype-kits/example-variant-prototype
npx now-prototype-it --variant my-awesome-npi-variant create
```