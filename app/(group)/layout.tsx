import Navbar from "@/components/Navbar";
import TopNavbar from "../../components/TopNavbar";
import { getSession } from "@/lib/lib";
import { redirect } from "next/navigation";

const layout = ({ children }: { children: React.ReactNode }) => {
 

  return (
    <main className="w-screen h-screen overflow-x-hidden ">
      <TopNavbar />
      <Navbar />
      <section className="">{children}</section>
    </main>
  );
};

export default layout;
