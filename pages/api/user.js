export default async function handler(req, res) {
  if (req.method == "GET") {
    console.log("haciendo peticion get");
    async function getUsers(url = "") {
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      return response.json();
    }
    try {
      const data = await getUsers("http://localhost:8000/api/user");
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(401).end();
    }
  } else if (req.method == "POST") {
    console.log("haciendo peticion post");
    async function postUser(url = "", body = {}) {
      console.log("body", body);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      return response.json();
    }
    try {
      const data = await postUser("http://localhost:8000/api/user", req.body);
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(401).end();
    }
  } else if (req.method == "PUT") {
    console.log("haciendo peticion PUT");
    async function putUser(url = "", body = {}) {
      console.log("body", body);
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      return response.json();
    }
    try {
      const data = await putUser(
        `http://localhost:8000/api/user/${req.body.id}`,
        req.body
      );
      //console.log('post data',data);
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(401).end();
    }
  }else if(req.method == 'PATCH'){
    async function addPhotoToUser(url = "", body = {}) {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      return response.json();
    }
    try {
      const data = await addPhotoToUser(
        `http://localhost:8000/api/user/photo/${req.body.userId}`, req.body);

      console.log('patch data',data);
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(401).end();
    }
  }
}
