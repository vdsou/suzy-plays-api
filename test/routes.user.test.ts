import axios from "axios";
import api from "./api";

let userId = "";

test("should return 201 when signing up", async () => {
  try {
    const res = await axios({
      method: "post",
      url: `${api.BASE_URL}/user/signup`,
      data: {
        name: "test",
        username: "test",
        password: "test",
        email: "test@email.com",
      },
    });
    userId = res.data.user.id;
    expect(res.status).toBe(201);
  } catch (error) {}

});

test("should return 200 when signin in", async () => {
  const res = await axios({
    method: "post",
    url: `${api.BASE_URL}/user/signin`,
    data: {
      username: "test",
      password: "test",
    },
  });
  expect(res.status).toBe(200);
});

test("should return 401 if password or username is wrong", async () => {
  try {
    await axios({
      method: "post",
      url: `${api.BASE_URL}/user/signin`,
      data: {
        username: "test",
        password: "test123",
      },
    });
  } catch (error) {
    expect(error.response.status).toBe(401);
  }
});

test("should return 409 if user already exists", async () => {
  try {
    const res = await axios({
      method: "post",
      url: `${api.BASE_URL}/user/signup`,
      data: {
        name: "test",
        username: "test",
        password: "test",
        email: "test@email.com",
      },
    });
    expect(res.status).toBe(201);
  } catch (error) {
    expect(error.response.status).toBe(409);
  }
});

test("should return 200 if user's been deleted", async () => {
  const res = await axios({
    method: "delete",
    url: `${api.BASE_URL}/user/delete/${userId}`,
  });
  expect(res.status).toBe(200);
});
