# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: example.spec.js >> Blog app >> Login >> succeeds with correct credentials
- Location: tests/example.spec.js:19:5

# Error details

```
Test timeout of 3000ms exceeded.
```

```
Error: locator.fill: Test timeout of 3000ms exceeded.
Call log:
  - waiting for getByLabel('username')

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - text: BlogApp
    - generic [ref=e5]:
      - link "blogs" [ref=e6] [cursor=pointer]:
        - /url: /
      - link "login" [active] [ref=e7] [cursor=pointer]:
        - /url: /login
        - text: login
  - generic [ref=e9]:
    - heading "Log in to application" [level=2] [ref=e10]
    - generic [ref=e11]:
      - generic [ref=e12]: username
      - textbox [ref=e13]
    - generic [ref=e14]:
      - generic [ref=e15]: password
      - textbox [ref=e16]
      - button "LOGIN" [ref=e17] [cursor=pointer]
```

# Test source

```ts
  1   | // @ts-check
  2   | const { test, expect, beforeEach, describe } = require("@playwright/test");
  3   | 
  4   | describe("Blog app", () => {
  5   |   beforeEach(async ({ page, request }) => {
  6   |     await request.post("http://localhost:3003/api/testing/reset");
  7   |     await request.post("http://localhost:3003/api/users", {
  8   |       data: {
  9   |         name: "Fredric",
  10  |         username: "Fred",
  11  |         password: "ric",
  12  |       },
  13  |     });
  14  |     page.on("dialog", (dialog) => dialog.accept());
  15  |     await page.goto("http://localhost:5173");
  16  |   });
  17  | 
  18  |   describe("Login", () => {
  19  |     test("succeeds with correct credentials", async ({ page }) => {
  20  |       await page.getByText("login").click();
> 21  |       await page.getByLabel("username").fill("Fred");
      |                                         ^ Error: locator.fill: Test timeout of 3000ms exceeded.
  22  |       await page.getByLabel("password").fill("ric");
  23  |       await page.getByRole("button", { name: "login" }).click();
  24  | 
  25  |       await expect(page.getByText("logout")).toBeVisible();
  26  |     });
  27  | 
  28  |     test("fails with wrong credentials", async ({ page }) => {
  29  |       await page.getByText("login").click();
  30  |       await page.getByLabel("username").fill("Fredrik");
  31  |       await page.getByLabel("password").fill("rik");
  32  |       await page.getByRole("button", { name: "login" }).click();
  33  |       await expect(page.getByText("wrong username or password")).toBeVisible();
  34  |     });
  35  |   });
  36  |   describe("When logged in", () => {
  37  |     beforeEach(async ({ page, request }) => {
  38  |       await request.post("http://localhost:3003/api/testing/reset");
  39  |       await request.post("http://localhost:3003/api/users", {
  40  |         data: {
  41  |           name: "Fredric",
  42  |           username: "Fred",
  43  |           password: "ric",
  44  |         },
  45  |       });
  46  |       await page.goto("http://localhost:5173");
  47  |       await page.getByText("login").click();
  48  |       await page.getByLabel("username").fill("Fred");
  49  |       await page.getByLabel("password").fill("ric");
  50  |       await page.getByRole("button", { name: "login" }).click();
  51  |       await expect(page.getByText("logout")).toBeVisible();
  52  |       page.reload();
  53  |     });
  54  | 
  55  |     test("a new blog can be created", async ({ page }) => {
  56  |       await page.getByText("new blog").click();
  57  |       await page.getByRole("textbox", { name: "title:" }).fill("OldBlog");
  58  |       await page.getByRole("textbox", { name: "author:" }).fill("YoungMan");
  59  |       await page.getByRole("textbox", { name: "url:" }).fill("AverageUrl");
  60  |       await page.getByRole("button", { name: "create" }).click();
  61  |       await expect(page.getByText("added")).toBeVisible();
  62  |     });
  63  |   });
  64  | 
  65  |   describe("When logged in", () => {
  66  |     beforeEach(async ({ page, request }) => {
  67  |       await request.post("http://localhost:3003/api/testing/reset");
  68  |       await request.post("http://localhost:3003/api/users", {
  69  |         data: {
  70  |           name: "Fredric",
  71  |           username: "Fred",
  72  |           password: "ric",
  73  |         },
  74  |       });
  75  |       await request.post("http://localhost:3003/api/users", {
  76  |         data: {
  77  |           name: "Hehe",
  78  |           username: "Hihi",
  79  |           password: "hoho",
  80  |         },
  81  |       });
  82  |       await page.goto("http://localhost:5173");
  83  |       await page.getByText("login").click();
  84  |       await page.getByLabel("username").fill("Fred");
  85  |       await page.getByLabel("password").fill("ric");
  86  |       await page.getByRole("button", { name: "login" }).click();
  87  |       await expect(page.getByText("logout")).toBeVisible();
  88  |       page.reload();
  89  |     });
  90  | 
  91  |     test("a new blog can be liked", async ({ page }) => {
  92  |       await page.getByText("new blog").click();
  93  |       await page.getByRole("textbox", { name: "title:" }).fill("OldBlog");
  94  |       await page.getByRole("textbox", { name: "author:" }).fill("YoungMan");
  95  |       await page.getByRole("textbox", { name: "url:" }).fill("AverageUrl");
  96  |       await page.getByRole("button", { name: "create" }).click();
  97  |       await page.getByText("OldBlog by YoungMan").first().waitFor();
  98  |       await page.getByText("OldBlog by YoungMan").first().click();
  99  |       await page.getByRole("button", { name: "like" }).click();
  100 |       await expect(page.getByText("likes 1")).toBeVisible();
  101 |     });
  102 | 
  103 |     test("a blog can be deleted", async ({ page }) => {
  104 |       await page.getByText("new blog").click();
  105 |       await page.getByRole("textbox", { name: "title:" }).fill("OldGuyy");
  106 |       await page.getByRole("textbox", { name: "author:" }).fill("YoungGuyy");
  107 |       await page.getByRole("textbox", { name: "url:" }).fill("AverageGuyy");
  108 |       await page.getByRole("button", { name: "create" }).click();
  109 |       await page
  110 |         .getByRole("link", { name: "OldGuyy by YoungGuyy" })
  111 |         .first()
  112 |         .click();
  113 |       await page.getByRole("button", { name: "remove" }).click();
  114 |       await expect(page.getByText("OldGuyy by YoungGuyy")).toBeHidden();
  115 |     });
  116 |   });
  117 | });
  118 | 
```