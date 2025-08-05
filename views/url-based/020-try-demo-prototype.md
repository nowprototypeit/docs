# Try a demo prototype

To start exploring and experimenting straight away, you can run an example GOV.UK style prototype via the command line.

Make sure you have followed the [setup instructions](/setup) before you start. 

## Run the example protoype

In your terminal, run the following command. You can replace `the-name-of-your-prototype` with an example protoype name if you want to.

```bash
npx nowprototypeit create --variant @nowprototypeit/govuk-frontend-adaptor the-name-of-your-prototype
```

1. When prompted, enter `y` to continue.
1. Run `cd the-name-of-your-prototype` (or the name you gave your protoype).
1. Run `npm run dev`.

By default, the protoype opens at `http://localhost:3000`. The Protoype Manager opens at `http://localhost:3000/manage-prototype`.

## Troubleshooting

* If `npm run dev` produces a list of errors: Check that you have successfully run `cd the-name-of-your-prototype` (or the name you gave your protoype). You can run `pwd` to see the directory your terminal is currently in.