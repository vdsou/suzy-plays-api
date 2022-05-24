import axios from "axios";

type Response = {
    data: Object
}
test("check if the server is up and running", async () => {
  const res = await axios.get<Response>("http://localhost:3000");
  expect(res.data).toBeTruthy();
});
