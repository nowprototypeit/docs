# Add a plugin to a prototype

This guide explains how to add an existing plugin to a prototype.

## Before you start

Before you add a plugin to your prototype, make sure you:

* Have a protoype running locally
* Have access to the Protoype Manager (by default, this is at `http://localhost:3000/manage-prototype/`)

## Add a plugin to a prototype

To add a plugin to your prototype:

1. In the Prototype Manager, go to **Plugins**.
1. Select **Discover Plugins** to browse available plugins, or **Lookup a specific plugin** to search for a specific plugin.
1. Select the plugin you want to install.
1. Select **Install**.

You can add multiple plugins to the same prototype.

## What happens when plugins conflict?

If you have multiple plugins that do the same thing, Now Prototype It chooses which plugin to use based on how they are organised: 

* If a plugin depends on another plugin, it overrides the behaviour of the plugin it depends upon.
* Where there are no dependencies, Now Prototype It manages plugin priority alphabetically. The earlier plugins alphabetically can be overridden by the later plugins alphabetically.