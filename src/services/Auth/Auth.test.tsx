import { loginService, registerService } from "./Auth"

describe("Check loginService", () => {
  it('check invalid user information', async () => {
    const username = "A";
    const password = "B";
    const response = await loginService(username, password);
    expect(response).toEqual(null);
  });
  
  it('check valid user information', async () => {
    const username = "A";
    const password = "a";
    const response = await loginService(username, password);
    expect(response.token_type).toEqual("Bearer");
  });
});

describe("Check registerService", () => {
  it('Check if a new user is registered', async () => {
    const username = "ABCDE" + Math.random();
    const password = "ABCDE";
    const response = await registerService(username, password);
    expect(response).toEqual({message: "success"});
  })
  
  it('Check if an existing user is registered', async () => {
    const username = "A";
    const password = "ABCDE";
    const response = await registerService(username, password);
    expect(response).toEqual(null);
  })
})