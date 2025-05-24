# Using Nunjucks

Now Prototype It uses Nunjucks as its templating engine.

## Basic Syntax

Nunjucks uses `{{ }}` for variable output and `{% %}` for control flow.

Example:

```nunjucks
<h1>Hello, {{ name }}!</h1>

{% if showGreeting %}
    <p>Welcome to our site.</p>
{% endif %}
```

Passing Data to Nunjucks

Any user input or server-side data is available in Nunjucks templates as `data.theFieldName`.

Example:

If a user submits a form with a field named "username," you can access it in Nunjucks with `{{ data.username }}`.Includes and Layouts

(NATALIE EXPLAIN how to include other files or templates within Nunjucks and how layouts work.)
