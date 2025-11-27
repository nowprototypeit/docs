# Understand variants

In Now Prototype It, a variant is a pre-configured setup package that runs when you create a prototype. 

## Using a variant

To understand how users apply a variant, see [Use a variant](/variants/use-a-variant).

Once a user has created a prototype using your variant, they can continue to use it as usual. They can add new files, modify existing files, and run the prototype just like any other Now Prototype It project.

> **Note:** A variant and a plugin can come from the same dependency, but for the clarity of the documentation we keep them separate. To find out what's possible from a plugin, see the [Plugins documentation](/plugins).

## How variants work

This section describes the structure and default behaviours of variants.

### Variant structure

A Now Prototype It variant is an NPM-compatible package that contains a `now-prototype-it.variant.json` file.

In its simplest form, a variant comprises:

* **A directory** with `git` and `npm` initialised.
    * **A config file**: A `now-prototype-it.variant.json` file that configures the variant's behavior when a prorotype is created.
    * **Starter files**: Nunjucks (`.njk`) files that get copied into a new prototype when the prototype is created.
    * **Installation files** (optional): A JavaScript (`.js`) file that defines the variant's installation or initialization behaviour.

### Variant defaults

You can insert an an `__INHERIT__` item in all arrays in the variant config file (`now-prototype-it.variant.json`). This item always refers to files or settings up the inheritance chain.

Now Prototype It processes arrays in the order they are listed. If the same files or settings exist in multiple array items, the files closest to the bottom of the list take precedence.

For example, if `__INHERIT__` is at the top of the array, it is always lowest priority. We recommend this, so that it can act as a fallback. If `__INHERIT__` is at the bottom of the array, it will override all other items in the array. 

### Variant publishing

Variants are published as NPM packages. For details, see [Publish a variant](/variants/creating-variants/publish-a-variant).

>**Note:** Variants do not need to be approved by Now Prototype It before you publish them. This means you can create and use variants without needing to go through a review process.

### Example published variant

We have published this variant to NPM, so you can try it out. To access it, run the following commands:

```bash
mkdir -p ~/npi-playground/prototype-kits/example-variant-prototype
cd ~/npi-playground/prototype-kits/example-variant-prototype
npx now-prototype-it --variant my-awesome-npi-variant create
```
