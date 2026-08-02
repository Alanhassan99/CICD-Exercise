import { test, expect } from "@playwright/test"
const login = async (page) => {
  await page.getByText("login").click();

  const inputs = page.locator("input");

  await inputs.nth(0).fill("Fred");
  await inputs.nth(1).fill("ric");

  await page.getByRole("button", { name: "LOGIN" }).click();

  await expect(page.getByText("logout")).toBeVisible();
}
test.describe("Blog app", () => {
  test.beforeEach(async ({ page, request }) => {
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

  test.describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await login(page);
    });

    test("fails with wrong credentials", async ({ page }) => {
      await page.getByText("login").click();

      const inputs = page.locator("input");

      await inputs.nth(0).fill("FredD");
      await inputs.nth(1).fill("ricC");

      await page.getByRole("button", { name: "LOGIN" }).click();

      await expect(page.getByText("wrong username or password")).toBeVisible();
    });
  });
  test.describe("When logged in", () => {
    test.beforeEach(async ({ page, request }) => {
      await request.post("http://localhost:3003/api/testing/reset");
      await request.post("http://localhost:3003/api/users", {
        data: {
          name: "Fredric",
          username: "Fred",
          password: "ric",
        },
      });
      await page.goto("http://localhost:5173");
      await login(page);
      await page.reload();
    });

    test("a new blog can be created", async ({ page }) => {
      await page.getByText("new blog").click();
      const inputs = page.locator("input");
      await inputs.nth(0).fill("OldBlog");
      await inputs.nth(1).fill("YoungMan");
      await inputs.nth(2).fill("AverageUrl");
      await page.getByRole("button", { name: "create" }).click();
      await expect(page.getByText("added")).toBeVisible();
    });
  });

  test.describe("When logged in", () => {
    test.beforeEach(async ({ page, request }) => {
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
      await login(page);
      await page.reload();
    });

    test("a new blog can be liked", async ({ page }) => {
      await page.getByText("new blog").click();

      const inputs = page.locator("input");
      await inputs.nth(0).fill("C");
      await inputs.nth(1).fill("H");
      await inputs.nth(2).fill("newUrl");

      await page.getByRole("button", { name: "create" }).click();

      const blog = page.getByRole("link", { name: "C by H" });

      await expect(blog).toBeVisible();

      await blog.click();

      await page.getByRole("button", { name: "like" }).click();

      await expect(page.getByText('1 likes')).toBeVisible();
    });

    test("a blog can be deleted", async ({ page }) => {
      const blog = page.getByRole("link", { name: "moe by moe" });
      const inputs = page.locator("input");
      await page.getByText("new blog").click();
      await inputs.nth(0).fill("moe");
      await inputs.nth(1).fill("moe");
      await inputs.nth(2).fill("AverageUrl");
      await page.getByRole("button", { name: "create" }).click();


      await expect(blog).toBeVisible();

      await blog.click();
      await page.getByRole("button", { name: "like" }).click();
      await expect(page.getByRole("button", { name: "remove" })).toBeVisible();

      await page.getByRole("button", { name: "remove" }).click();

      await expect(blog).toBeHidden();
    });
  });
});
