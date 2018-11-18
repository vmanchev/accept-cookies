# Accept cookies

## Description
Displays an alert at the bottom of your website, which informs the user about website cookies. Provides a link to cookies policy page and a button to accept the policy.

## Installation

Add the both files to your HTML code, for example:

```
<html>
  <head>
    ...
    <link rel="stylesheet" href="/accept-cookies.css" />
    <script type="text/javascript" src="/accept-cookies.js"></script>
  </head>
  <body>
    ...
  </body>
</html>
```

## Options
There are few options you can customise by editing the `accept-cookies.js` file:

- **buttonText** - text to be displayed on the accept cookies button.
- **message** - message, informing the user about the cookies.
- **policyUrl** - URL to your cookies policy page.
- **triggerText** - which word(s) from your **message** should be transformed as link to the **policyUrl**