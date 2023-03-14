export default async function handler(req, res) {
  if (req.method == "GET") {
    console.log("haciendo peticion photo GET");
    async function getPhoto(url = "") {
      const response = await fetch(url, {
        method: "GET",
        headers: {"Content-type": "application/json",},
      });
      return response.json();
    }
    try {
      const data = await getPhoto("https://gallery-back.vercel.app/api/photo");
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(401).end();
    }
  }else if (req.method == "POST") {
    async function postPhoto(url = "", body = {}) {
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
      const data = await postPhoto("https://gallery-back.vercel.app/api/user/photo/", req.body);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(401).end();
    }
  }

}
