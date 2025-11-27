# Create prototype pages

To create a page for your prototype, you can either use a pre-existing template from a plug-in, or create a new file in your local directory.

## Before you start

Before you create a new prototype page, make sure you:

* Have the prototype running, so that you can test as you go. To run your prototype, open the command line in your prototype's root directory and run `npm run dev`.
* Install any [plugins](/plugins) you need, if you want to use existing templates.

## Create a page from a template

To create a page from an existing template: 

1. Open the Prototype Manager
2. Go to **Templates**
3. Find the template you want to use. Select **View** to preview the template, and **Create** to create a new file from that template.

## Create a page from a new file

To create a brand new page without using a template: 

1. Create a new file. Prototype pages can be in `.html`, `.htm`, or `.njk`.
2. Save that file to your prototype's `/apps/views` directory. 

The file should automatically appear in your browser. To test it, go to `http://localhost:3000/your-file-name`.
