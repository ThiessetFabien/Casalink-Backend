import "dotenv/config";
import { describe, it } from "mocha";
import supertest from "supertest";
import { expect } from "chai";

import app from "../../index.js";
const VERSION = process.env.VERSION || 1;
describe("Home router", () => {
  it("should respond with status 200 for GET /api/home", async () => {
    const response = await supertest(app).get(`/api/v${VERSION}/home`);
    expect(response.status).to.equal(200);
  });

  it("should respond with status 200 for GET /api/home/1", async () => {
    const response = await supertest(app).get(`/api/v${VERSION}/home/1`);
    expect(response.status).to.equal(200);
  });

  it("should respond with status 200 for GET /api/home/account/1", async () => {
    const response = await supertest(app).get(`/api/v${VERSION}/home/account/1`);
    expect(response.status).to.equal(200);
  });
  it("should respond with status 200 for POST /api/home", async () => {
    const response = await supertest(app).post(`/api/v${VERSION}/home`);
    expect(response.status).to.equal(200);
  });
  it("should respond with status 200 for PATCH /api/home/1", async () => {
    const response = await supertest(app).patch(`/api/v${VERSION}/home/1`);
    expect(response.status).to.equal(200);
  });
  it("should respond with status 200 for DELETE /api/home/1", async () => {
    const response = await supertest(app).delete(`/api/v${VERSION}/home/1`);
    expect(response.status).to.equal(200);
  });
});

describe("Task router", () => {
  it("should respond with status 200 for GET /api/task/account/:id", async () => {
    const response = await supertest(app).get(`/api/v${VERSION}/task/account/1`);
    expect(response.status).to.equal(200);
  });

  it("should respond with status 200 for GET /api/task/1", async () => {
    const response = await supertest(app).get(`/api/v${VERSION}/task/1`);
    expect(response.status).to.equal(200);
  });

  it("should respond with status 200 for GET /task/:id/subtask", async () => {
    const response = await supertest(app).get(`/api/v${VERSION}/task/1/subtask`);
    expect(response.status).to.equal(200);
  });
  it("should respond with status 200 for GET /api/task", async () => {
    const response = await supertest(app).get(`/api/v${VERSION}/task`);
    expect(response.status).to.equal(200);
  });
  it("should respond with status 200 for POST /api/task/", async () => {
    const response = await supertest(app).delete(`/api/v${VERSION}/task`);
    expect(response.status).to.equal(200);
  });
  it("should respond with status 200 for PATCH /api/task/1", async () => {
    const response = await supertest(app).patch(`/api/v${VERSION}/task/1`);
    expect(response.status).to.equal(200);
  });
  it("should respond with status 200 for DELETE /api/task/1", async () => {
    const response = await supertest(app).delete(`/api/v${VERSION}/task/1`);
    expect(response.status).to.equal(200);
  });
});
describe("Profile router", () => {
  it("should respond with status 200 for GET /account/:id/profile", async () => {
    const response = await supertest(app).get(`/api/v${VERSION}/account/1/profile`);
    expect(response.status).to.equal(200);
  });

  it("should respond with status 200 for GET /home/:id/profile", async () => {
    const response = await supertest(app).get(`/api/v${VERSION}/home/1/profile`);
    expect(response.status).to.equal(200);
  });

  it("should respond with status 200 for GET /api/profile/:id", async () => {
    const response = await supertest(app).get(`/api/v${VERSION}/profile/1`);
    console.log(response.text); // Enregistrez le corps de la réponse
    const responseData = JSON.parse(response.text); // Tentez de parser en JSON
    expect(response.status).to.equal(200);
  });
  it("should respond with status 200 for GET /api/profile", async () => {
    const response = await supertest(app).get(`/api/v${VERSION}/profile`);
    expect(response.status).to.equal(200);
  });
  it("should respond with status 200 for POST /api/profile", async () => {
    const response = await supertest(app).post(`/api/v${VERSION}/profile`);
    expect(response.status).to.equal(200);
  });
  it("should respond with status 200 for PATCH /api/profile/1", async () => {
    const response = await supertest(app).patch(`/api/v${VERSION}/profile/1`);
    expect(response.status).to.equal(200);
  });
  it("should respond with status 200 for DELETE /api/profile/1", async () => {
    const response = await supertest(app).delete(`/api/v${VERSION}/profile/1`);
    expect(response.status).to.equal(200);
  });
}
);
describe("Subtask router", () => {
  it("should respond with status 200 for GET /api/subtask/task/:id", async () => {
    const response = await supertest(app).get(`/api/v${VERSION}/subtask/task/1`);
    expect(response.status).to.equal(200);
  });

  it("should respond with status 200 for GET /api/subtask/1", async () => {
    const response = await supertest(app).get(`/api/v${VERSION}/subtask/1`);
    expect(response.status).to.equal(200);
  });

  it("should respond with status 200 for POST /api/subtask", async () => {
    const response = await supertest(app).post(`/api/v${VERSION}/subtask`);
    expect(response.status).to.equal(200);
  });
  it("should respond with status 200 for PATCH /api/subtask/1", async () => {
    const response = await supertest(app).patch(`/api/v${VERSION}/subtask/1`);
    expect(response.status).to.equal(200);
  });
  it("should respond with status 200 for DELETE /api/subtask/1", async () => {
    const response = await supertest(app).delete(`/api/v${VERSION}/subtask/1`);
    expect(response.status).to.equal(200);
  });
});
describe("Account router", () => {
  it("should respond with status 200 for GET /api/account/home/:id", async () => {
    const response = await supertest(app).get(`/api/v${VERSION}/account/home/1`);
    expect(response.status).to.equal(200);
  });

  it("should respond with status 200 for GET /api/account/1", async () => {
    const response = await supertest(app).get(`/api/v${VERSION}/account/1`);
    expect(response.status).to.equal(200);
  });

  it("should respond with status 200 for GET /api/account", async () => {
    const response = await supertest(app).get(`/api/v${VERSION}/account`);
    expect(response.status).to.equal(200);
  });
  it("should respond with status 200 for PATCH /api/account/1", async () => {
    const response = await supertest(app).patch(`/api/v${VERSION}/account/1`);
    expect(response.status).to.equal(200);
  });
  it("should respond with status 200 for DELETE /api/account/1", async () => {
    const response = await supertest(app).delete(`/api/v${VERSION}/account/1`);
    expect(response.status).to.equal(200);
  });
}
);
describe("Category router", () => {
  it("should respond with status 200 for GET /api/category/task/:id", async () => {
    const response = await supertest(app).get(`/api/v${VERSION}/category/task/1`);
    expect(response.status).to.equal(200);
  });

  it("should respond with status 200 for GET /api/category/1", async () => {
    const response = await supertest(app).get(`/api/v${VERSION}/category/1`);
    expect(response.status).to.equal(200);
  });

  it("should respond with status 200 for POST /api/category", async () => {
    const response = await supertest(app).post(`/api/v${VERSION}/category`);
    expect(response.status).to.equal(200);
  });
  it("should respond with status 200 for PATCH /api/category/1", async () => {
    const response = await supertest(app).patch(`/api/v${VERSION}/category/1`);
    expect(response.status).to.equal(200);
  });
  it("should respond with status 200 for DELETE /api/category/1", async () => {
    const response = await supertest(app).delete(`/api/v${VERSION}/category/1`);
    expect(response.status).to.equal(200);
  });
}
);
describe("Address router", () => {
  it("should respond with status 200 for GET /api/address/home/:id", async () => {
    const response = await supertest(app).get(`/api/v${VERSION}/address/home/1`);
    expect(response.status).to.equal(200);
  });

  it("should respond with status 200 for GET /api/address/1", async () => {
    const response = await supertest(app).get(`/api/v${VERSION}/address/1`);
    expect(response.status).to.equal(200);
  });
  it("should respond with status 200 for GET /api/address", async () => {
    const response = await supertest(app).get(`/api/v${VERSION}/address`);
    expect(response.status).to.equal(200);
  });

  it("should respond with status 200 for POST /api/address", async () => {
    const response = await supertest(app).post(`/api/v${VERSION}/address`);
    expect(response.status).to.equal(200);
  });
  it("should respond with status 200 for PATCH /api/address/1", async () => {
    const response = await supertest(app).patch(`/api/v${VERSION}/address/1`);
    expect(response.status).to.equal(200);
  });
  it("should respond with status 200 for DELETE /api/address/1", async () => {
    const response = await supertest(app).delete(`/api/v${VERSION}/address/1`);
    expect(response.status).to.equal(200);
  });
}
);