# Try a demo prototype

To start exploring and experimenting straight away, you can run this example GOV.UK style prototype.

Make sure you have followed the [setup instructions](/getting-started/setup) before you start. 

## Run the example protoype

In the command line, run the following command. Replace `prototype-name` with an example protoype name of your choice.

```bash
npx nowprototypeit create --variant @nowprototypeit/govuk-frontend-adaptor prototype-name
```

1. When prompted, enter `y` to continue.
1. Run `cd prototype-name` (or the name you gave your protoype).
1. Run `npm run dev`.

By default, the protoype opens at `http://localhost:3000`. The Protoype Manager opens at `http://localhost:3000/manage-prototype`.

## Troubleshooting

* If `npm run dev` produces a list of errors: Check that you have successfully run `cd prototype-name` (or the name you gave your prototype). Run `pwd` to see the directory your command line is currently in.
