const fs = require("fs").promises;
export function getUsers() {
  try {
    const data: User[] = fs.readFileSync(`../data/users.json`);
    return { status: "success", data };
  } catch (error) {
    return { status: "fail", error };
  }
}

export function getUser(id: string) {
  const result = getUsers();
  if (result.status === "success") {
    const user = result.data?.find((u) => u.id === id) ?? null;
  }
}
