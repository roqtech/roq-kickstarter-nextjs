import type { NextApiRequest, NextApiResponse } from "next";
import * as bcrypt from "bcrypt";
import { roqClient } from "server/roq";
import { prisma } from "server/db";
import { v4 as uuid } from "uuid";

export interface UserRegisterDto {
  name: string;
  email: string;
  password: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Method not allowed" });
    res.end();
  }

  const { email, password, name } = req.body as UserRegisterDto;

  // Fail if the user exists already
  const existingUser = await prisma.user.findFirst({
    where: { email },
  });
  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }

  // STEP 1 - Sync the user to ROQ
  const userId = uuid();
  const roqUser = await roqClient.asSuperAdmin().createUser({
    user: {
      reference: userId,
      email,
      firstName: name,
      isOptedIn: true,
      active: true,
    },
  });
  const roqUserId = roqUser?.createUser?.id;
  if (!roqUserId) {
    throw new Error("Could not register on ROQ");
  }

  // STEP 2 - Create the user on the database
  try {
    let user = await prisma.user.create({
      data: {
        name,
        email,
        password: bcrypt.hashSync(password, 10),
        roqUserId,
      },
    });

    // Optional - Notify the user with a "welcome" in-app notification
    roqClient.asSuperAdmin().notify({
      notification: {
        key: "welcome",
        recipients: { userIds: [roqUserId] },
      },
    });

    // Remove the password before returning the user info
    delete user.password;

    return res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
}
