import { getSession, logout } from "@/lib/lib";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getSession();
  if (!session) {
    redirect("/sign-in");
  }
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
        <header>
          <h1></h1>
        </header>
        <section></section>
        <form action={handleLogout}>
          <button>Logout</button>
        </form>
      </main>
    </>
  );
};

export default page;
