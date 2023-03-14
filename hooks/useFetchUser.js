export async function getUsers(url = "") {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
  return response.json();
}

export async function postUser(url = "", body = {}) {
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

export async function updateUser(url = "", body = {}) {
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return response.json();
}

export async function patchUser(url = "", body = {}) {
    
  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  
  return response.json();
}
