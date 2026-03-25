import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth/auth";

export default async function CustomerDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Customer Dashboard</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p>Welcome, {session.user?.name}!</p>
      </div>
    </div>
  );
}