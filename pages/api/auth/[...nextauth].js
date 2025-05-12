// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcrypt";

// let mockUserDB = [];

// export default NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials, req) {
//         const { email, password } = credentials;

//         const user = mockUserDB.find((u) => u.email === email);
//         if (!user) return null;

//         const isValid = await bcrypt.compare(password, user.password);
//         if (!isValid) return null;

//         return {
//           userId: user.userId,
//           name: user.name,
//           email: user.email,
//           role: user.role,
//         };
//       },
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
//   session: {
//     strategy: "jwt",
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         const authToken = JSON.stringify({
//           userId: user.userId,
//           name: user.name,
//           email: user.email,
//           role: user.role,
//         });

//         token.authToken = authToken;
//         token.userId = user.userId;
//         token.name = user.name;
//         token.email = user.email;
//         token.role = user.role;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.user = {
//         userId: token.userId,
//         name: token.name,
//         email: token.email,
//         role: token.role,
//         authToken: token.authToken,
//       };
//       return session;
//     },
//   },
// });
