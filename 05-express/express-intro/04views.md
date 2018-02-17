# Views and Templates

### Views

First, we cannot keep using `res.send` to send a response. Ultimately, we'll want to send HTML files back to the client. It would be much more efficient to store them in files. Let's make a folder, `/views`, and create an `index.html` page inside.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Testing a View</title>
  </head>
  <body>
    <h1>Hello world!</h1>
  </body>
</html>
```

Let's modify the `index.js` to send this file via `.sendFile`. In order to use this function, we also need to add where `.sendFile` can find the views.

**index.js**
```js
var express = require('express');
var path = require('path');
var app = express();

// this sets a static directory for the views
app.use(express.static(path.join(__dirname, 'views')));

app.get('/', function(req, res) {
  // use sendFile to render the index page
  res.sendFile('index.html');
});

app.listen(3000);
```

### Templating with ejs

The downside to this method is that we are only sending HTML files, and what if we want to customize what's on the page? On the front-end, we could manipulate the page using jQuery. But on the back-end, we can inject values into the HTML using template engines. So we're going to set up a template engine called **ejs** (embedded JavaScript) and use that instead.

We need to do a couple steps to get the template engine working.

First, install `ejs` by running `npm install --save ejs` in the command line.

Then, replace the `app.use` statement with the following statement (ejs assumed we'll be placing all template files into the `/views` folder, so it's optional if adhering to that syntax).

```js
app.set('view engine', 'ejs');
```

Also, rename the .html file to a .ejs file. We'll see that the `.ejs` extension is optional in the route, but necessary in the file's actual name.


### Templating with Variables

Templating with variables means we can pass in an object to the `.render` function and access those variables inside the ejs template.

**index.js**
```js
var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('index', {name: "Sterling Archer"});
});

app.listen(3000);
```

then we need to update our `index.ejs` to use a templating variable.

**index.ejs**
```html
<!DOCTYPE html>
<html>
  <head>
    <title>Testing a View</title>
  </head>
  <body>
    <h1>Hello, <%= name %>!</h1>
  </body>
</html>
```

The JavaScript being embedded is enclosed by the `<% %>` tags. The addition of the `=` sign on the opening tag means that a value will be printed to the screen. We can also use the following signs to tell EJS to parse code in different ways:

* `<- name %>` will print out the expression without escaping HTML
  * If the name was `"<span>Sterling Archer</span>"`, then the `<span>` elements won't be escaped.
* `<% name %>` will not print out the expression, but it will execute it
  * Handy for `if` statements and loops

This doesn't only apply to primitive variables. We can even include variable declarations and iterators using ejs.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Testing a View</title>
  </head>
  <body>
    <h1>Hello, <%= name %>!</h1>

    <% var obsessions = ['spying', 'sarcasm', 'Kenny Loggins']; %>

    <ul>
    <% obsessions.forEach(function(item) { %>
      <li><%= item %></li>
    <% }); %>
    </ul>
  </body>
</html>
```

### Partials

Partials can be used to modularize views and reduce repetition. A common pattern is to move the header and footer of a page into separate views, or partials, then render them on each page.

#### Example

**partials/header.ejs**
```html
<!DOCTYPE html>
<html>
<head>
  <title>My Site</title>
</head>
<body>
```

**partials/footer.ejs**
```html
</body>
</html>
```

**index.ejs**
```html
<% include ../partials/header.ejs %>

<h1>Welcome to my site!</h1>

<% include ../partials/footer.ejs %>
```
