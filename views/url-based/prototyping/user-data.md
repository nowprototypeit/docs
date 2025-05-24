# Handling User Data in Nunjucks Templates

When working with Nunjucks templates, you often need to handle user input and pass data from your server-side code (like Express) to your templates. This guide will help you understand how to manage user data effectively.

## Accessing User Input

Any user input from forms is automatically available in Nunjucks templates through `data.theFieldName`.

Example:

A form with `<input type="text" name="message">` will have its value accessible as `{{ data.message }}`.

## Passing Server-Side Data

(NATALIE EXPLAIN how to pass data from Express routes to Nunjucks templates.)
