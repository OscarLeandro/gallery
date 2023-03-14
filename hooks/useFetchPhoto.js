export async function getPhoto(url = "") {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
  return response.json();
}
export async function postPhoto(url = "", body = {}) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  //console.log(response)
  return response.json();
}
