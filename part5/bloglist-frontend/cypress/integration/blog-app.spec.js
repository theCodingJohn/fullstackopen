describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");

    const user = {
      username: "john",
      password: "john123",
      name: "John Cunanan",
    };

    const user2 = {
      username: "unauthorizedremover",
      password: "test123",
      name: "Legion United",
    };
    cy.request("POST", "http://localhost:3001/api/users", user);
    cy.request("POST", "http://localhost:3001/api/users", user2);

    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("log in to application");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.login({ username: "john", password: "john123" });

      cy.contains("John Cunanan is logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("john");
      cy.get("#password").type("wrongpassword");
      cy.contains("login").click();

      cy.get(".notif")
        .should("contain", "Wrong Credentials")
        .and("have.css", "color", "rgb(255, 0, 0)");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "john", password: "john123" });

      cy.createBlog({
        title: "Blog created with cypress",
        author: "unknown",
        url: "https://blogspot.com/24124",
      });
    });

    it("A blog can be created", function () {
      cy.contains("Blog created with cypress");
    });

    it("A user can like a blog", function () {
      cy.contains("Blog created with cypress").find("button").click();
      cy.get(".likeButton").click();
      cy.get(".like-value").contains(1);
    });

    it("A user can delete his/her created blog", function () {
      cy.contains("Blog created with cypress").find("button").click();
      cy.contains("remove").click();
      cy.get("html").should("not.contain", "Blog created with cypress");
    });

    it("A user can not delete other's blog", function () {
      cy.contains("logout").click();

      cy.login({ username: "unauthorizedremover", password: "test123" });

      cy.contains("Blog created with cypress").find("button").click();
      cy.get(".blogBody").should("not.contain", "remove");
    });
  });
});
