# Edit prototype pages

Editing pages is how you add content to your prototypes. This includes text, images, interactive elements, and design system components.

## Before you start

Before you edit a prototype page, make sure you:

* [Run your prototype locally](run-prototype-locally), so that you can test as you go.
* [Create prototype pages](create-prototype-pages) that you want to edit.
* Install any [plugins](../plugins) you need, if you want to use existing page templates or design system components.

## Where to edit your page

You can either edit existing pages directly in the browser, or use your own coding tools to create and edit pages, depending on how you prefer to work.

### Editing in the browser

First, enable browser editing:

1. In the Prototype Manager, go to **Settings** > **Experiments**.
1. Navigate to **Edit your prototype in the browser**, select **On**, then select **Save changes**.
1. Restart your prototype via the command line: run `stop`, then run `npm dev run`. 

Now you can open the page and start editing: 

1. In the browser, open the page you want to edit. By default, this is at `http://localhost:3000/your-file-name` <br/>**Note**: If the page you want to edit does not yet exist, [create a page](create-prototype-pages) first.
1. In the page header, select **Edit this page**. An editor containing the page's code and content should appear at the bottom of the browser.
1. Add and edit content in the editor.
1. To save and preview your edits, select **Save changes**.

**Note**: When you select **Save changes**, NPI also overwrites your local file with the new changes.

### Editing in your own tools

If you'd rather edit files in your favourite coding environment, you can do that instead. 

1. From your prototype project's `/apps/views` directory, open the file you want to edit.
1. In the browser, go to `http://localhost:3000/your-file-name` to test and preview the file as you work.
1. Add and edit content in the file.
1. To save and preview your edits, save the file, then refresh the page in the browser. 

## What to put in your page

This is where we hand the reins over to you. The NPI Prototype Kit is hugely flexible; anything you can do in HTML or Nunjucks, you can do on a prototype page. 

In most cases, we recommend that prototype designers start with a [variant](../variants) and/or [plugins](../plugins) that add page templates and design system compatibility to your prototype project. This way, you can quickly jump into working on the content and UX, and you should only need minimal knowledge of HTML and/or Nunjucks; just enough to find your way around an existing page template. 

If you're starting from scratch, without any page templates or design system components, you'll likely need a strong understanding of working in HTML and Nunjucks. 
