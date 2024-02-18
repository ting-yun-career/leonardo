const fs = require("fs");
export function getUsers() {
  try {
    const data = fs.readFileSync(process.cwd() + `/data/users.json`, "utf-8");

    return { status: "success", data: JSON.parse(data) };
  } catch (error) {
    return { status: "fail", error };
  }
}

export function getUser(id: string) {
  const result = getUsers();
  if (result.status === "success") {
    const user = result.data?.find((u: User) => u.id == id) ?? null;
    return user;
  }
}

export function saveUsers(users: User[]) {
  try {
    fs.writeFileSync(
      process.cwd() + `/data/users.json`,
      JSON.stringify(users, null, 2)
    );
    return true;
  } catch (error) {
    return false;
  }
}
