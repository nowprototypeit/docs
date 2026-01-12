# Now Prototype It Documentation

This is the repository for the documentation of Now Prototype It.

If you think the documentation could be clearer or more complete feel free to raise an issue or submit a pull request.

The pages themselves are in the `views/url-based` directory, adding new `md` files will create new pages which will be available in the navigation menu.  `index.md` files will be used as the landing page for a section, but if there's no `index.md` an index page with navigation will be created automatically.

## Contributing

This repository uses topic-based authoring for documentation structure, and Docusaurus to generate the documentation site. 

### Running locally

To run locally, run:

```bash
npm start
```

### Adding new pages

To add a new page:

1. create a new `.md` file in the `/docs` directory. Pages must be named in kebab-case. For example `my-new-page.md`.
2. Write your content in Markdown.
3. Add the page to the apppropriate space in `sidebars.js`, to make sure it appears in the sidebar.
4. Run the docs locally to validate that your changes work.

The future is uncertain, but we want to avoid predictable limitations.  We know there will be times when we'll need to move content and rename pages. Please keep this in mind when adding new pages.
