---
title: Fixing Image Type Errors
tags:
  - Building prodev
---

# Fixing Image Type Errors

Importing an image into a Typescript Next.js app can cause errors by default:

To silence errors, we'll just tell typescript to ignore all files that end with image extensions.

Create an **index.d.ts** file in the project root:

**index.d.ts**

```ts
declare module '*.jpg'
declare module '*.png'
declare module '*.svg'
```

This tells typescript to ignore all imports that end with `jpg`, `png`, or `svg`.
