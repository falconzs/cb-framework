# CB Framework

Disclaimer
> This code is not officially supported by or affiliated with chaturbate.com.

## Goals

* Reduce boilerplate code
* Quicker development cycle
* Code Reuse
* Versioning
* Modularisation
* Code structure
* Issue tracking
* Collaboration

## Status
This and the associated repos are a work in progress and subject to change.

## Terminology / Structure
CB has Bots or Apps which add functionality to a broadcasters rooms. Broadcasters can add 1 App and upto 3 Bots.

The framework provides components to create Apps and Bots, removing the boiler plate code required.

Within the framework there is a bot onto which functionality can be added through plugins. Plugins are expected to 
to be contributed by other coders and discoverable using the tags 'chaturbate', 'bot' and 'plugin'. Full details 
about creating a bot are below.

## Getting Started

[https://github.com/falconzs/cb-dev-templates](https://github.com/falconzs/cb-dev-templates)

## API

### Bot Class

### App Class

### Plugin Abstract Class

### Message Class
A class representing the message.

Statics
* `create`
* `createFromTip`

Methods
* `isEmpty`
* `contains`
* `isCommand`
* `getCommand`
* `getCommandParameters`
* `isHidden`
* `hide`
* `show`
* `getUser`
* `getResponse`

### User Class
A class representing a user. Brings together the standard attributes in a semantically consistent object. Also includes
useful methods for standard development.

Statics
* `create`
* `createFromMessage`
* `createFromTip`
* `createFromUsername`

Methods
* `silence`
* `unsilence`
* `canTalk`
* `hasPermission`
* `getRole`
* `addRole`
* `removeRole`

### Collection Class
Provides a class for working with collections of objects. Adds the ability to index certain fields.


### Library Object
This combines the `cbjs` functions with other common functions and often used constants.

#### Functions
* `strCapitalize(string string):string` capitalises the first character of each word.
* `strRepeat(string string, int quantity):string` repeats the string for the number of times specified.
* `strEquals(string string, string compare, bool caseSensitive):bool` compares two strings.
* `strIsValidColor(string code):bool` checks whether the given string a valid hex color.
* `arrayContains(array array, object object):bool` checks if the specifed array contains the object.
* `arrayRemove(array array, object object):array` removes all entries of object and returns the new array.

#### Colors
Provides an object map of color name to color hex. A nicer way of specifying colors that's more readable.

#### Special Characters
Provides an object map of special characters. For example a ▶ character. A nicer way of specifying characters that's 
more readable in code.

### Help Plugin
This is created and added to any App or Bot automatically. 
This plugin:
* looks at each registered plugin for available commands.
* provides a full help listing based on the requesting users permissions.
