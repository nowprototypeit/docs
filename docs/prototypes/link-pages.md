# Link your pages together

To take users from one page to another, you can use either:

- a [hyperlink](https://www.w3schools.com/tags/tag_a.asp) (`<a>` tag) for simple navigation
- a [form](https://www.w3schools.com/tags/tag_form.asp) (`<form>` tag) when the user needs to input data

## Using hyperlinks

Hyperlinks are for straightforward navigation where you don't need to collect information from the user.

To create a hyperlink, use the `<a>` tag with an `href` attribute that points to your next page:

```html
<a href="/next-page">Continue</a>
```

The text between the opening `<a>` and closing `</a>` tags is what users will see and click on.

You can style hyperlinks to look like buttons using CSS classes:

```html
<a href="/next-page" class="button">Continue</a>
```

## Using forms

Forms are for when users need to input data before moving to the next page. 

A form needs three parts:
1. The `<form>` tag with `action` and `method` attributes
2. Input fields for collecting data
3. A submit button

Here's a basic example:

```html
<form action="/next-page" method="post">
  <label for="username">Username:</label>
  <input type="text" id="username" name="username">
  <button type="submit">Continue</button>
</form>
```

### Understanding form attributes

- **`action="/next-page"`** - where to send the form data when submitted
- **`method="post"`** - how to send the data (POST is standard for form submissions)

### Important notes

- The URL goes in the `action` attribute on the `<form>` tag, not on the button
- The button's `type="submit"` tells it to submit the form when clicked
- Each input needs a `name` attribute - this is how your application identifies the data when it's submitted
- Labels and fieldsets help make forms accessible to screen readers
