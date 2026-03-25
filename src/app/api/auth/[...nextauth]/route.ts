import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/db/mongodb";
import User from "@/lib/db/models/User";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        await connectDB();
        console.log("✅ Database connected");

        const user = await User.findOne({ email: credentials.email }).select('+password');
        
        
        if (!user) {
          throw new Error("Invalid credentials");
        }

       

        if (user.role === 'staff' && !user.isApproved) {
          throw new Error("Your account is pending approval");
        }

        if (!user.password) {
          throw new Error("Invalid credentials");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );
        

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }

        
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
          isApproved: user.isApproved,
          counter: user.counter || 1,
          department: user.department || "Customer Service",
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.isApproved = user.isApproved;
        token.counter = user.counter;
        token.department = user.department;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.isApproved = token.isApproved;
        session.user.counter = token.counter;
        session.user.department = token.department;
      }
      return session;
    }
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };