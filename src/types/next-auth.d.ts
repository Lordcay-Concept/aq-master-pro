import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    role: string;
    isApproved: boolean;
     counter?: number; 
    department?: string;
  }
  
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      role: string;
      isApproved: boolean;
       counter?: number; 
    department?: string;
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    isApproved: boolean;
    counter?: number; 
    department?: string;
  }
}