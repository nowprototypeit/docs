# Creating templates with Nunjucks

Now Prototype It uses Nunjucks as its templating engine.  For full documentation on Nunjucks, visit the [Nunjucks documentation](https://mozilla.github.io/nunjucks/templating.html).

## Basic Syntax

Nunjucks uses `{{ }}` for variable output, and `{% %}` for control flow.

Example:

```nunjucks
{% if name %}
    <p>Welcome to our site, {{ name }}.</p>
{% endif %}
```

## Passing user input to Nunjucks

We try to make it easy for you to handle user input in your prototypes. When a user submits a form, the data is automatically passed to Nunjucks templates as `userInput`.

For example, this page will display the name the user entered in the form while also allowing them to resubmit the form with a new name:

```nunjucks
<!DOCTYPE html>
{% if userInput.name %}
    <p>Welcome to our site, {{ userInput.name }}.</p>
{% else %}
    <p>Welcome to our site.</p>
{% endif %}

<form method="post"> <!-- no action, so it submits to the same URL -->
    <label for="name">Enter your name:</label>
    <input type="text" id="name" name="name" value="{{ userInput.name }}">
    <button type="submit">Submit</button>
</form>
```

It's as simple as that! There's no need to write any additional code to handle the form submission; Now Prototype It takes care of that for you.  To give credit to the project we forked, this feature originated from the [GOV.UK Prototype Kit](https://github.com/alphagov/govuk-prototype-kit).  We have made the name more descriptive.
