import { getHostUrl } from "@/context/host";

export function saveUser(user: User) {
  return fetch(`${getHostUrl()}/api/user`, {
    method: "POST",
    body: JSON.stringify(user),
  }).then((response) => response.json());
}

export function getUser(id: string) {
  return fetch(`${getHostUrl()}/api/user?id=${id}`).then((response) =>
    response.json()
  );
}
