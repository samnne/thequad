'use client'
import Image from "next/image";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="w-screen h-screen overflow-x-hidden grid md:grid-cols-2">
      <section className="bg-primary max-md:hidden"></section>
      <section className="flex flex-col justify-center gap-5 p-10 md:p-22">
        <div className="flex grow-2 justify-center flex-col gap-10">
          <div className="text-6xl text-primary font-black"><Image src={"/nav-logo.svg"} alt="Logo" width={250} height={250} /></div>
          <header className="flex flex-col gap-2 justify-center ">
            <h1 className="text-4xl text-text ">Welcome to <span className="font-bold text-primary">MarketQuad</span></h1>
            <span className="font-light text-md">
              UVic's student only Marketplace. Built by a Student for Students.
            </span>
          </header>
        </div>
        <div className="grow-3 flex  justify-center ">{children}</div>
      </section>
    </main>
  );
};

export default layout;
