# Handling user input

Now Prototype It uses the Nunjucks templating engine to handle user input in your prototypes. 

> **Note**: If you're unfamiliar with Nunjucks, see [Templating with Nunjucks](nunjucks).

When a user submits a form, NPI automatically passes the data to the Nunjucks template as `userInput`.

For example, the following HTML code sample creates a form that allows the user to enter their name, and saves the input in the value `name`:

```html
<form method="post">
    <label for="name">Enter your name:</label>
    <input type="text" id="name" name="name">
    <button type="submit">Submit</button>
</form>
```

Then, the following Nunjucks sample calls `userInput.name`: 

```nunjucks
{% if userInput.name %}
    <p>Welcome to our site, {{ userInput.name }}.</p>
{% else %}
    <p>Welcome to our site.</p>
{% endif %}
```

It's as simple as that! There's no need to write any additional code to handle the form submission; Now Prototype It takes care of it all for you.  

To give credit to the project we forked, this feature originated from the [GOV.UK Prototype Kit](https://github.com/alphagov/govuk-prototype-kit).
