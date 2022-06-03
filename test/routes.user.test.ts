import axios from "axios";
import api from "./api";

test("should return 200", async () => {
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
