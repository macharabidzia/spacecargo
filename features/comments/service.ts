const commentsService = {
  async getPosts() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return [
      { id: 1, title: "Posts 1" },
      { id: 2, title: "Posts 2" },
    ];
  },

  async getComments() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return [
      { id: 1, text: "Great post 1" },
      { id: 2, text: "Thanks for sharing" },
    ];
  },
};
export { commentsService };
