import axios from "axios";

const URL = axios.create({ baseURL: "https://tourex-app.herokuapp.com" });

URL.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) req.headers.Autherization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
  return req;
});

export const fetchPosts = async () => {
  try {
    const posts = (await URL.get("/posts")).data;
    return posts;
  } catch (error) {
    console.log("error: ", error);
  }
};

export const createPost = async (post) => {
  try {
    const newPost = await URL.post("/posts", post);
    return newPost.data;
  } catch (e) {
    if (!e.response.data) console.log("request failed :(");
    else console.log(e.response.data.message);
    console.log(e);
  }
};

export const likePost = async (id) => {
  try {
    const res = await URL.post("/posts/like", {
      id: id,
    });
    return res.data;
  } catch (e) {
    if (!e.response.data) return { failed: "request failed" };
    else return { failed: e.response.data.message };
    console.log(e);
  }
};

export const deletePost = async (id) => {
  try {
    await URL.post(`/posts/delete`, { id: id });
  } catch (e) {
    if (!e.response.data) console.log("request failed :(");
    else console.log(e.response.data.message);
    console.log(e);
  }
};

export const signIn = async (postData) => {
  try {
    const result = await URL.post("/users/signin", postData);
    return result.data;
  } catch (e) {
    if (!e.response.data) return { failed: "request failed" };
    else return { failed: e.response.data.message };
  }
};
export const signUp = async (postData) => {
  try {
    const result = await URL.post("/users/signup", postData);
    return result.data;
  } catch (e) {
    if (!e.response.data) return { failed: "request failed" };
    else return { failed: e.response.data.message };
  }
};
