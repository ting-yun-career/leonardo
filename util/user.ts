import { MongoClient } from "mongodb";

export async function getUsers() {
  try {
    const client = await MongoClient.connect(
      "mongodb+srv://tingyuncareer:45rzv1SnJlrpyllb@cluster0.ccshp9b.mongodb.net/leonardo?retryWrites=true&w=majority"
    );
    const db = client.db("leonardo");
    const collection = db.collection("users");
    const users = await collection.find().toArray();
    client.close();

    return { status: "success", data: users as unknown as User[] };
  } catch (error) {
    return { status: "fail", error };
  }
}

export async function getUser(id: string) {
  const result = await getUsers();

  if (result.status === "success") {
    const user = result.data?.find((u: any) => u.id == id) ?? null;
    return user;
  }
}

export async function saveUsers(users: User[]) {
  try {
    const client = await MongoClient.connect(
      "mongodb+srv://tingyuncareer:45rzv1SnJlrpyllb@cluster0.ccshp9b.mongodb.net/leonardo?retryWrites=true&w=majority"
    );
    const db = client.db("leonardo");
    const collection = db.collection("users");

    const deleteResult = await collection.deleteMany({});
    const insertResult = await collection.insertMany(users);

    return { status: "success", data: users };
  } catch (error) {
    return { status: "fail", error };
  }
}
