---
title: AppBar Styles
tags:
  - Building prodev
---

# AppBar Styles

Let's style the appbar so it has that transparent background, and correct size

## Specifying Height

Rather than setting a fixed height for app bars, it's usually better to set padding, and let the content specify the height. This will avoid fixed-height bars from clipping content.

We can see that the tallest element's padding is 6px, or 0.375rem. We whould also implement mobile first, and the mobile design has a horizontal padding of 1rem.

**src/app/_components/AppBar.module.css**

```css
.root {
  padding: 0.375rem 1rem;
}
```

## Transparent background color

Add a new css variable for `background-64`:


**src/app/globals.css**

```css
:root {
  ...
  --background-64: rgba(0,0,0,0.64);
}
```

Apply it to the **AppBar** with a background blur filter:

**src/app/_components/AppBar.module.css**

```css
.root {
  ...
  background: var(--background-64);
  backdrop-filter: blur(16px);
}
```