# CB Framework

Disclaimer
> This code is not officially supported by or affiliated with chaturbate.com.

## Requirements

* Node/NPM installed (Docker alternative available)
* Intermediate level of Javascript
* Knowledge of CB App/Bot development

## Goals

* Reduce boilerplate code
* Quicker development cycle
* Code Reuse
* Versioning
* Modularisation
* Code structure
* Issue tracking
* Collaboration

## Terminology / Structure
CB has Bots or Apps which add functionality to a broadcasters rooms. Broadcasters can add 1 App and upto 3 Bots.

The framework provides components to create Apps and Bots, removing the boiler plate code required.

Within the framework there is a bot onto which functionality can be added through plugins. Plugins are expected to 
to be contributed by other coders and discoverable using the tags 'chaturbate', 'bot' and 'plugin'. Full details 
about creating a bot are below.

## Getting Started

The examples directory provides an example of a plugin which can be copied and pasted.

### Creating a App

1. Todo

### Creating a Bot

1. Clone / download the bot skeleton from XXX
2. Search for plugins on [npmjs.com](https://www.npmjs.com/) using the tags ```chaturbate```, ```plugin``` and ```bot```.
3. Add the plugins as ```dependencies``` in the ```package.json```.
4. Add the ```register``` line in ```index.js``` for each plugin.
5. ```npm install```
6. ```grunt webpack```
7. Copy the contents of `bundle.js` to CB and test your new Bot

### Creating a Plugin

1. Todo


## Included Plugins

### Help Plugin
This is created and added to any App or Bot automatically. 
This plugin:
* looks at each registered plugin for available commands.
* provides a full help listing based on the requesting users permissions.

### Timer Plugin
Allows different timers to be added to a room.

### Cleaner Plugin
Allows a chat to be cleaned up by outputting a cleanup message.

## API

### Bot Class

### App Class

### Plugin Abstract Class

### Message Class

### User Class

### Collection Class

### Library Object
coming soon

## Docker

Warning: mileage may vary, provided as is, for convenience.

``` bash
docker build -t nodejs .
```

To get access to the Node environment (docker run):
``` bash
./docker-run.sh
```

package.json
``` javascript
{
  "name": "MyBotPlugin",
  dependcies:{
    "falconzs/cbframework": "^1.0.0"
  }
}
```


Motivations
Goals
Minimum Requirements
Terminology / Structure
How to create
	Bot
	App
	Plugin
Dependencies
