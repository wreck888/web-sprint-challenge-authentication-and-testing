const request = require("supertest");
const server = require("./server");
const db = require("../data/dbConfig");

beforeAll( async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})

afterAll( async () => {
  await db.destroy()
})

describe("sanity tests", () => {
  test("tests are working", () => {
    expect(true).toBe(true)
  })
})

const user = {
  username: "batman",
  password: "catwoman"
}

describe("[POST] /api/auth/register", () => {
  let result
  beforeAll( async() => {
      result = await request(server).post("/api/auth/register").send(user)
  })

  test("[1] successful register with 201 status", async () => {
    expect(result.status).toBe(201)
  })

  test("[2] successful register returns user with hashed password", async () => {
    expect(result.body.username).toBe(user.username)
    expect(result.body.password).not.toBe(user.password)
  })
})

describe("[GET] /api/jokes/", () => {
  test("[3] access without token is invalid", async () => {
    let result = await request(server).get("/api/jokes")
    expect(result.body.message).toBe("token required")
  })

  test("[4] list of jokes returned when token provided", async () => {
    let result = await request(server).post('/api/auth/login').send(user)
    result = await request(server).get('/api/jokes').set({'Authorization': result.body.token})
    expect(result.body).toHaveLength(3)
  })
})

describe("[POST] /api/auth/login", () => {
  let result
  beforeAll( async() => {
      result = await request(server).post("/api/auth/login").send(user)
  })

  it("[5] successful login with 200 status", async () => {
    expect(result.status).toBe(200)
  })

  it("[6] successful login returns response", async () => {
    expect(result.body.message).toContain(`welcome, ${user.username}`)
  })
})

