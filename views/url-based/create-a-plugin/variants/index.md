# Variants

Variants are a powerful feature of Now Prototype It that allow you to create custom setups for your prototypes. They can include specific configurations, tools, and libraries tailored to your needs.

## Creating a Variant

We have documentation on how to create a variant in the [Create a Plugin section](/create-a-plugin/variants).

## Using a Variant

When you create a new prototype, you can specify which variant to use. This allows you to quickly set up your prototype with the desired features and configurations.

If the variant you're using is published to NPM you only need to specify the name of it, for example:

```bash
npx nowprototypeit create example-awesome-prototype --variant my-awesome-npi-variant
```

### GOV.UK Frontend Adaptor

Anyone can publish a variant to NPM, we have published a variant that provides an adaptor for the GOV.UK Frontend. This allows you to create a GOV.UK style prototype quickly and easily.

```bash
npx nowprototypeit create example-govuk-prototype --variant @nowprototypeit/govuk-frontend-adaptor
```

This variant provides an adaptor for the GOV.UK Frontend, allowing you to use GOV.UK styles and components in your prototypes.
