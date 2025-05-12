import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, getUserByEmail } from "@/src/helpers/mongodb/userService";
import { createPersonProfile } from "@/src/helpers/mongodb/personService";
import { createCompany } from "@/src/helpers/mongodb/companyService";

const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const {
    name,
    email,
    password,
    role,
    jobTypes,
    degree,
    experienceLevel,
    skills,
    location,
    interests,
    companyTitle,
    companyDescription,
    companyLocation,
  } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  if (role === "user" && (!jobTypes || !degree || !experienceLevel || !skills || !location || !interests)) {
    return res.status(400).json({ message: "Missing user profile fields" });
  }

  if (role === "company" && (!companyTitle || !companyDescription || !companyLocation)) {
    return res.status(400).json({ message: "Missing company profile fields" });
  }

  try {
    // Check if email already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        console.log(existingUser)
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await createUser({
      name,
      email,
      password: hashedPassword,
      role,
      createdAt: new Date(),
    });

    const userId = newUser._id;

    if (role === "user") {
      await createPersonProfile({
        userId,
        jobTypes,
        degree,
        experienceLevel,
        skills: skills,
        location,
        interests,
      });
    } else if (role === "company") {
      await createCompany({
        userId,
        companyTitle,
        companyDescription,
        companyLocation,
      });
    }

    // Generate auth token
    const authToken = jwt.sign(
      {
        userId: userId.toString(),
        name,
        email,
        role,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      message: "Signup successful",
      user: {
        userId: userId.toString(),
        name,
        email,
        role,
        authToken,
      },
    });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
