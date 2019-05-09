copy the `config/example\_config.js` file to a new file called `config/development.js` and fill in the default values

```
cp config/example_config.js config/development.js
```

Install dependencies

```
npm i
```
Startup application in development

```
nodemon bin/app.js
```

Startup application in production

```
pm2 start bin/app.js
```

