// @ts-check
const { test, expect, beforeEach, describe } = require("@playwright/test");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3003/api/testing/reset");
    await request.post("http://localhost:3003/api/users", {
      data: {
        name: "Fredric",
        username: "Fred",
        password: "ric",
      },
    });
    page.on("dialog", (dialog) => dialog.accept());
    await page.goto("http://localhost:5173");
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await page.getByText("login").click();
      await page.getByLabel("username").fill("Fred");
      await page.getByLabel("password").fill("ric");
      await page.getByRole("button", { name: "login" }).click();

      await expect(page.getByText("logout")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await page.getByText("login").click();
      await page.getByLabel("username").fill("Fredrik");
      await page.getByLabel("password").fill("rik");
      await page.getByRole("button", { name: "login" }).click();
      await expect(page.getByText("wrong username or password")).toBeVisible();
    });
  });
  describe("When logged in", () => {
    beforeEach(async ({ page, request }) => {
      await request.post("http://localhost:3003/api/testing/reset");
      await request.post("http://localhost:3003/api/users", {
        data: {
          name: "Fredric",
          username: "Fred",
          password: "ric",
        },
      });
      await page.goto("http://localhost:5173");
      await page.getByText("login").click();
      await page.getByLabel("username").fill("Fred");
      await page.getByLabel("password").fill("ric");
      await page.getByRole("button", { name: "login" }).click();
      await expect(page.getByText("logout")).toBeVisible();
      page.reload();
    });

    test("a new blog can be created", async ({ page }) => {
      await page.getByText("new blog").click();
      await page.getByRole("textbox", { name: "title:" }).fill("OldBlog");
      await page.getByRole("textbox", { name: "author:" }).fill("YoungMan");
      await page.getByRole("textbox", { name: "url:" }).fill("AverageUrl");
      await page.getByRole("button", { name: "create" }).click();
      await expect(page.getByText("added")).toBeVisible();
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page, request }) => {
      await request.post("http://localhost:3003/api/testing/reset");
      await request.post("http://localhost:3003/api/users", {
        data: {
          name: "Fredric",
          username: "Fred",
          password: "ric",
        },
      });
      await request.post("http://localhost:3003/api/users", {
        data: {
          name: "Hehe",
          username: "Hihi",
          password: "hoho",
        },
      });
      await page.goto("http://localhost:5173");
      await page.getByText("login").click();
      await page.getByLabel("username").fill("Fred");
      await page.getByLabel("password").fill("ric");
      await page.getByRole("button", { name: "login" }).click();
      await expect(page.getByText("logout")).toBeVisible();
      page.reload();
    });

    test("a new blog can be liked", async ({ page }) => {
      await page.getByText("new blog").click();
      await page.getByRole("textbox", { name: "title:" }).fill("OldBlog");
      await page.getByRole("textbox", { name: "author:" }).fill("YoungMan");
      await page.getByRole("textbox", { name: "url:" }).fill("AverageUrl");
      await page.getByRole("button", { name: "create" }).click();
      await page.getByText("OldBlog by YoungMan").first().waitFor();
      await page.getByText("OldBlog by YoungMan").first().click();
      await page.getByRole("button", { name: "like" }).click();
      await expect(page.getByText("likes 1")).toBeVisible();
    });

    test("a blog can be deleted", async ({ page }) => {
      await page.getByText("new blog").click();
      await page.getByRole("textbox", { name: "title:" }).fill("OldGuyy");
      await page.getByRole("textbox", { name: "author:" }).fill("YoungGuyy");
      await page.getByRole("textbox", { name: "url:" }).fill("AverageGuyy");
      await page.getByRole("button", { name: "create" }).click();
      await page
        .getByRole("link", { name: "OldGuyy by YoungGuyy" })
        .first()
        .click();
      await page.getByRole("button", { name: "remove" }).click();
      await expect(page.getByText("OldGuyy by YoungGuyy")).toBeHidden();
    });
  });
});
