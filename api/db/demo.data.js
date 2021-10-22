import bcrypt from "bcrypt";

async function getHashed(pw) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(pw, salt);
}

export const testUsers = [
  {
    name: "Test User",
    userName: "testUser123",
    email: "test@test.com",
    password: await getHashed("Test1234!"),
  },
];

export const testNotes = [
  {
    title: "Welcome to mement.to!",
    bodyContent: "This is some test content!",
    user_id: 1,
  },
];
