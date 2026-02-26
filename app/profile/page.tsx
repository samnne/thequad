import { getSession, logout } from "@/lib/lib";
import { redirect } from "next/navigation";

const page = async () => {
  const handleLogout = async () => {
    "use server";
    await logout();
    const session = await getSession();
    if (!session) {
      redirect("/sign-in");
    }
  };
  return (
    <>
      <main>
        <form action={handleLogout}>
          <button>Logout</button>
        </form>
      </main>
    </>
  );
};

export default page;
