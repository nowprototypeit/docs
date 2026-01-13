# Use a variant

To specify a variant, you need to include it in the command you write when you [create a new prototype](/prototypes/create-prototype). 

## Apply a variant to a new prototype

After the `create` command, enter `--variant`, followed by the variant's package name.

* A new prototype with no variant: <br/>`npx now-prototype-it create prototype-name`
* A new protoype with a variant:<br/>`npx now-prototype-it create --variant variant-name prototype-name`


For example, the following command creates a new prototype called `prototype-name` that uses a variant called `my-awesome-npi-variant`.

```bash
npx now-prototype-it create --variant variant-name prototype-name
```
