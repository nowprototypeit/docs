# Now Prototype It Documentation

This is the repository for the documentation of Now Prototype It.

If you think the documentation could be clearer or more complete feel free to raise an issue or submit a pull request.

The pages themselves are in the `views/url-based` directory, adding new `md` files will create new pages which will be available in the navigation menu.  `index.md` files will be used as the landing page for a section, but if there's no `index.md` an index page with navigation will be created automatically.

## Contributing

### Running locally

To run locally, first make sure you're on a recent version of Node.js (24 or above) as we use Node's Typescript support which (at the time of writing) is brand new.

```bash
npm install
npm run dev-server
```

Right now this doesn't do any file watching so you'll need to restart the server if you change any files (including adding new pages).  We will work on this shortly.

### Adding new pages

To add a new page, create a new `.md` file in the `views/url-based` directory. There's a precise structure to follow:

 - Pages must be named with a triple-digit number followed by a hyphen followed by the URL name for the page. For example `001-my-new-page.md`.
 - Pages with children must be directories named with the same convention.  For example `002-a-page-with-children`, they must then contain an `index.md` file which will be the content of the page.

Once you've added a page it will be included in the navigation menu automatically. If you want to change the order of the pages, you can rename them with different numbers.

### Leaving space for future pages

In order to avoid having to rename all the pages when adding new ones, we recommend leaving space for future pages.  We currently have:

 - `010-prototyping`
 - `020-plugins`
 - `030-variants`

This leaves space for new pages which can be added between the current pages.

The future is uncertain, but we want to avoid predictable limitations.  We know there will be times when we'll need to rename pages, but by adding this space between pages we can avoid unnecessary renaming.  Please keep this in mind when adding new pages.
