# Templating with Nunjucks

Now Prototype It uses a tool called Nunjucks as its templating engine. With Nunjucks, you can add more complex behaviour to your HTML pages, and create reusable and interactive HTML components. 

Nunjucks is powered by JavaScript, but you don't need to learn Javascript to use it. Instead, you just add a small amount of extra code alongside your HTML. 

## Basic Nunjucks syntax

For full documentation and guidance on templating with Nunjucks, see the Nunjucks [Templating documentation](https://mozilla.github.io/nunjucks/templating.html).

Nunjucks has a fairly simple structure that's designed to be human-readable. 

Nunjucks uses the following syntax: 

* `{% %}` for control flow (logic and behaviour, like [setting variables](https://mozilla.github.io/nunjucks/templating.html#set), [if/else statements](https://mozilla.github.io/nunjucks/templating.html#if) and [for loops](https://mozilla.github.io/nunjucks/templating.html#for))
* `{{ }}` for variable output (displaying the value of [variables](https://mozilla.github.io/nunjucks/templating.html#variables))

For example, the following code looks to see if the variable `name` has a value, and if it does, it prints a personalised welcome message in HTML:

```nunjucks
{% if name %}
    <p>Welcome to our site, {{ name }}.</p>
{% endif %}
```
