# Use a variant

When you create a new prototype, you can specify which variant to use. This allows you to quickly set up your prototype with the desired features and configurations.

To specify a variant, you need to include it in the command you write when you create a new prototype. 

After the `create` command, enter `--variant`, followed by the variant's package name.

For example, the following command creates a new prototype called `new-prototype` that uses a variant called `my-awesome-npi-variant`.

```bash
npx now-prototype-it create --variant my-awesome-npi-variant new-prototype
```
