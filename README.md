Outclick
========

Trigger callback, when click outside element.

Dependencies
------------

- Jquery >= 1.11.3

Usage
-----

```
$(element).outclick({
 callback: function() { $(this).hide() }
});
```

It is also possible to pass related objects. When you click on related object, action will not be considered as click outside main object bounds.

```
$(element).outclick({
 callback: function() { $(this).hide() },
 related: [$(element1), $(element2)]
});
```

Sometimes you can have multiple elements, with same structure.

```
$(element).each(function() {
  $(this).outclick({
   callback: function() { $(this).hide() },
   related: [
     $(this).siblings('.sibling1'),
     $(this).siblings('.sibling2')
   ]
  });
 });
```

Sometime you need to add a related objects at a certain moment.

```coffee
$(element).outclickAddRelated $(element1)
```

Sometime you to remove a related objects at a certain moment

```coffee
$(element).outclickRemoveRelated $(element1)
```

Install and Build
-----------------

- Install all packages

```bash
$ npm install
```

- Build

```bash
$ gulp build
# OR
$ npm run build
```
