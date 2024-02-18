export function saveUser(user: User) {
  return fetch(`/api/user`, {
    method: "PUT",
    body: JSON.stringify(user),
  }).then((response) => response.json());
}

export function getUser(id: string) {
  return fetch(`/api/user?id=${id}`).then((response) => response.json());
}
