# DynamoDictionary

Dynamo Dictionary development repo

Live version here: http://dictionary.dynamobim.com

## Installation
- Version 8 of Node is required. Later versions of Node are known to cause installation problems.
- In root directory, type ```npm install``` into the command line.
- If you find that the command hangs, feel free to use `yarn` instead of `npm`.
- In public directory, ```run bower install mocha```, ```bower install requirejs``` and ```bower install blanket```. 
  Make sure Bower package manager is already installed.These dependencies will be downloaded into a new folder 'bower_components'.

## Run in Development Mode
- In root directory, type ```npm run start``` into the command line.

## Deploy to Autodesk (Staging)

- Confirm that `homepage` in `package.json` is set to `http://staging-dictionary.dynamobim.com/`. The developer may change this address depending on the staging environment.

- In root directory: ```npm run build```, in case of new changes, ensure that links pointing to `static` resources in the `index.html` file are correct (i.e are pointing to assets inside the `/2` directory).

- Copy files from `build` folder and place into the root directory of the [Autodesk Dynamo Dictionary repo](https://github.com/DynamoDS/DynamoDictionary), in the appropriate `branch`.

- You may need to invalidate the cache (AWS CloudFront), in order to view the latest changes.

- To  view `2.x` version, you may have to manually enter the correct staging URL in the address bar, as the UI links may still point to production.

## Deploy to Autodesk (Production)

- Confirm that `homepage` in `package.json` is set to `http://dictionary.dynamobim.com/`. The developer may change this address depending on the staging environment.

- In root directory: ```npm run build```

- Copy files from `build` folder and place into the root directory of the [Autodesk Dynamo Dictionary repo](https://github.com/DynamoDS/DynamoDictionary), in the appropriate `branch`.
