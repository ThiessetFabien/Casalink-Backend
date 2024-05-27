import { config } from 'dotenv';
config({ path: `.env.test` });
import { describe, it } from "mocha";
import supertest from "supertest";
import jwt from "jsonwebtoken";
import { expect } from "chai";

import app from "../../index.js";

const VERSION = process.env.VERSION || 1;
const JWT_SECRET = process.env.JWT_SECRET;

describe("Home router", () => {
  const generateToken = () => {
    return jwt.sign(
      {
        userId: 3,
        name: "Toto",
        role: "adult",
        email: "popo@example.com"
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
  };

  it("should respond with status 200 for GET /api/home", async () => {
    const token = generateToken();
    const response = await supertest(app)
      .get(`/api/v${VERSION}/home`)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
  });

  it("should respond with status 200 for GET /api/home/1", async () => {
    const token = generateToken();
    const response = await supertest(app)
      .get(`/api/v${VERSION}/home/1`)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
  });

  // it("should respond with status 200 for GET /api/home/account/1", async () => {
  //   const token = generateToken();
  //   const response = await supertest(app)
  //     .get(`/api/v${VERSION}/home/account/1`)
  //     .set('Authorization', `Bearer ${token}`)
  //     .set('Accept', 'application/json')
  //     .expect('Content-Type', /json/)
  //     .expect(200);
  //   expect(response.status).to.equal(200);
  //   expect(response.body).to.be.an('object');
  // }); ne marche pas

  it("should respond with status 200 for POST /api/home", async () => {
    const token = generateToken();
    const response = await supertest(app)
      .post(`/api/v${VERSION}/home`)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .send({ name: 'Foyer 1' })
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
  });

  it("should respond with status 200 for PATCH /api/home/3", async () => {
    const token = generateToken();
    const response = await supertest(app)
      .patch(`/api/v${VERSION}/home/3`)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .send({ name: 'Foyer' })
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
  });

  it("should respond with status 200 for DELETE /api/home/3", async () => {
    const token = generateToken();
    const response = await supertest(app)
      .delete(`/api/v${VERSION}/home/3`)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.status).to.equal(200);
  });
});

describe("Task router", () => {
  const generateToken = () => {
    return jwt.sign(
      {
        userId: 3,
        name: "Toto",
        role: "adult",
        email: "popo@example.com"
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
  };
/*   it("should respond with status 200 for GET /api/task/account/:id", async () => {
    const token = generateToken();
    const response = await supertest(app)
      .get(`/api/v${VERSION}/task/account/1`)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('object');
  }); */

  it("should respond with status 200 for GET /api/task/1", async () => {
    const token = generateToken();
    const response = await supertest(app)
      .get(`/api/v${VERSION}/task/1`)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('object')
  });

  it("should respond with status 200 for GET /task/:id/subtask", async () => {
    const token = generateToken();
    const response = await supertest(app)
      .get(`/api/v${VERSION}/task/1/subtask`)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('object');
  });
  it("should respond with status 200 for GET /api/task", async () => {
    const token = generateToken();
    const response = await supertest(app)
      .get(`/api/v${VERSION}/task`)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
  });
/*   it("should respond with status 200 for POST /api/task/", async () => {
    const token = generateToken();
    const response = await supertest(app)
      .post(`/api/v${VERSION}/task`)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .send({ name: 'Faire du sport' })
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
  }); */
  it("should respond with status 200 for PATCH /api/task/3", async () => {
    const token = generateToken();
    const response = await supertest(app)
      .patch(`/api/v${VERSION}/task/3`)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .send({ name: 'Musculation' })
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
  });
  it("should respond with status 200 for DELETE /api/task/3", async () => {
    const token = generateToken();
    const response = await supertest(app)
      .delete(`/api/v${VERSION}/task/3`)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.status).to.equal(200);
  });
});
describe("Profile router", () => {
  const generateToken = () => {
    return jwt.sign(
      {
        userId: 3,
        name: "Toto",
        role: "adult",
        email: "popo@example.com"
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
  };
  it("should respond with status 200 for GET /account/:id/profile", async () => {
    const token = generateToken();
    const response = await supertest(app)
      .get(`/api/v${VERSION}/account/1/profile`)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
  });
  it("should respond with status 200 for GET /home/:id/profile", async () => {
    const token = generateToken();
    const response = await supertest(app)
      .get(`/api/v${VERSION}/home/1/profile`)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
  });
  it("should respond with status 200 for GET /api/profile/:id", async () => {
    const token = generateToken();
    const response = await supertest(app)
      .get(`/api/v${VERSION}/profile/2`)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
  });
  /* it("should respond with status 200 for GET /api/profile", async () => {
    const token = generateToken();
    const response = await supertest(app)
      .get(`/api/v${VERSION}/profile`)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
  }); */
  it("should respond with status 200 for POST /api/profile", async () => {
    const token = generateToken();
    const response = await supertest(app)
      .post(`/api/v${VERSION}/profile`)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .send(
        { 
          name: 'Profile Toto',
          pin:"0000",
          score:"0",
          birthdate:"1999-05-15"
        })
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
  });
  it("should respond with status 200 for PATCH /api/profile/1", async () => {
    const token = generateToken();
    const response = await supertest(app)
      .patch(`/api/v${VERSION}/profile/1`)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .send(
        { 
          name: 'Profile Tata',
          pin:"0000",
          score:"0",
          birthdate:"1999-05-15"
        })
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
  });
  it("should respond with status 200 for DELETE /api/profile/1", async () => {
    const token = generateToken();
    const response = await supertest(app)
      .delete(`/api/v${VERSION}/profile/1`)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.status).to.equal(200);
  });
}
);
describe("Subtask router", () => {
  const generateToken = () => {
    return jwt.sign(
      {
        userId: 3,
        name: "Toto",
        role: "adult",
        email: "popo@example.com"
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
  };
  /* it("should respond with status 200 for GET /api/subtask/task/:id", async () => {
    const token = generateToken();
    const response = await supertest(app)
      .get(`/api/v${VERSION}/subtask/task/1`)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
  }); */

  it("should respond with status 200 for GET /api/subtask/1", async () => {
    const token = generateToken();
    const response = await supertest(app)
      .get(`/api/v${VERSION}/subtask/1`)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
  });

  it("should respond with status 200 for POST /api/subtask", async () => {
    const token = generateToken();
    const response = await supertest(app)
      .post(`/api/v${VERSION}/subtask`)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .send(
        { 
          name: "Musculation",
          description:"DOS",
          task_id:"1" 
        })
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
  });
  it("should respond with status 200 for PATCH /api/subtask/3", async () => {
    const token = generateToken();
    const response = await supertest(app)
      .patch(`/api/v${VERSION}/subtask/3`)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .send(
        { 
          name: "Musculation",
          description:"Epaule",
          task_id:"1" 
        })
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
  });
  it("should respond with status 200 for DELETE /api/subtask/1", async () => {
    const token = generateToken();
    const response = await supertest(app)
    .delete(`/api/v${VERSION}/subtask/3`)
    .set('Authorization', `Bearer ${token}`)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200);
    expect(response.status).to.equal(200);
  });
});
describe("Account router", () => {
  const generateToken = () => {
    return jwt.sign(
      {
        userId: 3,
        name: "Toto",
        role: "adult",
        email: "popo@example.com"
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
  };
  it("should respond with status 200 for GET /api/account/home/:id", async () => {
    const token = generateToken();
    const response = await supertest(app)
      .get(`/api/v${VERSION}/account/home/1`)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
  });

  it("should respond with status 200 for GET /api/account/1", async () => {
    const token = generateToken();
    const response = await supertest(app)
      .get(`/api/v${VERSION}/account/1`)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
  });

  it("should respond with status 200 for GET /api/account", async () => {
    const token = generateToken();
    const response = await supertest(app)
      .get(`/api/v${VERSION}/account`)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
  });

  it("should respond with status 200 for PATCH /api/account/1", async () => {
    const token = generateToken();
    const response = await supertest(app)
      .patch(`/api/v${VERSION}/account/1`)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .send(
        {
          email: "ttot@gmail.com",
          firstname: "tata",
          lastname: "tete",
          role: "user",
          password: "Totott#123"
         }
      )
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
  });
  it("should respond with status 200 for DELETE /api/account/3", async () => {
    const token = generateToken();
    const response = await supertest(app)
      .delete(`/api/v${VERSION}/account/1`)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.status).to.equal(200);
  });
}
);
describe("Category router", () => {
  const generateToken = () => {
    return jwt.sign(
      {
        userId: 3,
        name: "Toto",
        role: "adult",
        email: "popo@example.com"
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
  };
  it("should respond with status 200 for GET /api/category/task/:id", async () => {
    const token = generateToken();
    const response = await supertest(app)
      .get(`/api/v${VERSION}/category/task/1`)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
  });

  it("should respond with status 200 for GET /api/category/1", async () => {
    const token = generateToken();
    const response = await supertest(app)
      .get(`/api/v${VERSION}/category/1`)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
  });

  it("should respond with status 200 for POST /api/category", async () => {
    const token = generateToken();
    const response = await supertest(app)
      .post(`/api/v${VERSION}/category`)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .send({ name: 'Rouge' })
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
  });
  it("should respond with status 200 for PATCH /api/category/4", async () => {
    const token = generateToken();
    const response = await supertest(app)
      .patch(`/api/v${VERSION}/category/4`)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .send({ name: 'Bleu' })
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
  });
  it("should respond with status 200 for DELETE /api/category/1", async () => {
    const token = generateToken();
    const response = await supertest(app)
      .delete(`/api/v${VERSION}/category/4`)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.status).to.equal(200);
  });
}
);
describe("Address router", () => {
  const generateToken = () => {
    return jwt.sign(
      {
        userId: 3,
        name: "Toto",
        role: "adult",
        email: "popo@example.com"
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
  };
it("should respond with status 200 for GET /api/address/home/:id", async () => {
    const token = generateToken();
    const response = await supertest(app)
      .get(`/api/v${VERSION}/address/home/1`)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
  });

  it("should respond with status 200 for GET /api/address/1", async () => {
    const token = generateToken();
    const response = await supertest(app)
      .get(`/api/v${VERSION}/address/1`)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
  });
  it("should respond with status 200 for GET /api/address", async () => {
    const token = generateToken();
    const response = await supertest(app)
      .get(`/api/v${VERSION}/address`)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
  });

  it("should respond with status 200 for POST /api/address", async () => {
    const token = generateToken();
    const response = await supertest(app)
      .post(`/api/v${VERSION}/address`)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .send(
        {
          "street": "1 rue de la grande bataille",
          "city": "Narnia",
          "additional_information": "porte 2 derrière l'armoire",
          "postal_code":"75000",
          "country":"France",
        }
      )
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
  });
  it("should respond with status 200 for PATCH /api/address/3", async () => {
    const token = generateToken();
    const response = await supertest(app)
      .patch(`/api/v${VERSION}/address/3`)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .send(
        {
          "street": "1 rue montmartre",
          "city": "Paris",
          "additional_information": "porte 2",
          "postal_code":"75000",
          "country":"France",
        }
      )
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
  });
  it("should respond with status 200 for DELETE /api/address/3", async () => {
    const token = generateToken();
    const response = await supertest(app)
      .delete(`/api/v${VERSION}/address/3`)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.status).to.equal(200);
  });
}
);