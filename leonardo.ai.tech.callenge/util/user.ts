const fs = require("fs");
export function getUsers() {
  try {
    const data = fs.readFileSync(`./data/users.json`, "utf-8");

    return { status: "success", data: JSON.parse(data) };
  } catch (error) {
    return { status: "fail", error };
  }
}

export function getUser(id: string) {
  const result = getUsers();
  if (result.status === "success") {
    const user = result.data?.find((u: User) => u.id === id) ?? null;
  }
}
