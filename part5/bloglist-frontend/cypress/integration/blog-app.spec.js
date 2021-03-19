describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");

    const user = {
      username: "john",
      password: "john123",
      name: "John Cunanan",
    };
    cy.request("POST", "http://localhost:3001/api/users", user);

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
});
