import "dotenv/config";
import { describe, it, before } from "mocha";
import { expect } from "chai";
import router from "./router.js";

describe("API endpoints", () => {

  it("should have a get method", () => {
    expect(router.get).to.be.a("function");
  });

    it("should have a post method", () => {
        expect(router.post).to.be.a("function");
    });

    it("should have a delete method", () => {
        expect(router.delete).to.be.a("function");
    });

    it("should have a patch method", () => {
        expect(router.patch).to.be.a("function");
    });

});



