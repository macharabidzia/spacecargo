const authService = {
  login: async (credentials: { email: string; password: string }) => {
    // Fake API simulation
    return new Promise<{ token: string }>((resolve, reject) => {
      setTimeout(() => {
        if (
          credentials.email === "admin@test.com" &&
          credentials.password === "1234"
        ) {
          resolve({ token: "fake-token-123" });
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 1000);
    });
  },
};

export default authService;
