# Introduction to prototypes

If you're new to prototype kits, or you want to know more about how NPI's protoype kit works, this page explains what you need to know.

If you're already familiar with the GOV.UK Prototype Kit, you might have come across some of these concepts already. However, there are some key differences, so read this page to make sure you have an understanding of what to expect from NPI.

## What is an NPI prototype?

Now Prototype It is designed to help you build high-fidelity interactive HTML prototypes of your organisation’s services and websites. 

These prototypes run in a browser, and work with your organisation’s existing design system, so you can make realistic prototypes for user research and testing.

Under the hood, a prototype is a node package. Anyone confident working in code can create **variants** and **plugins** to add to the package. 

## What are variants and plugins?

A **variant** is a setup package that runs just once, when you first create a prototype. It creates a template prototype with a collection of starting pages, plugins, and setting configurations. Most commonly, you might use a variant to give designers and researchers a quick starting point with no additional configuration.

A **plugin** is a configuration package that you can add to your prototype at any time. Most commonly, you might use a plugin to add design system compatibility, page templates, and styles to your prototype.

In short, a **variant** is the foundation of your prototype, while **plugins** are add-ons. For example:

* When you first create a prototype, you might do so with your organisation’s standard **variant**, which gives you a starting point that has your organisation’s design system built in. 
* You might also have assets or templates that are specific to your team’s services, which you can install via a **plugin** on top of the variant.

Under the hood, variants and plugins are configured via JSON files, and published as NPM packages.

## How do you configure a prototype? 

NPI prototypes have an easy-to-use Prototype Manager, which contains everything you need to create pages, install plugins, and configure settings. You can access it right in your browser, no extra tools required.

By default, the Prototype Manager is at `http://localhost:3000/manage-prototype`.

To learn how to create and edit pages for your prototype, see [Create prototype pages](/prototypes/create-prototype-pages) and [Edit prototype pages](/prototypes/edit-prototype-pages).
