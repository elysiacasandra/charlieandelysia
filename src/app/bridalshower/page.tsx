import Image from "next/image";

export const metadata = {
  title: "Elysia's Bridal Shower",
  description: "Bridal shower details, dress code, and registry for Elysia.",
};

export default function BridalShower() {
  return (
    <main className="min-h-screen min-w-screen w-full h-screen overflow-hidden relative">
      <Image
        src="/heart.JPG"
        alt="Bridal Shower Hero"
        fill
        style={{ objectFit: "cover", borderRadius: 0 }}
        priority
      />
      <div
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
        style={{ background: "rgba(40,38,32,0.18)" }}
      >
        <h1
          className="text-white text-5xl md:text-6xl font-light tracking-wide mb-2"
          style={{ letterSpacing: "0.04em" }}
        >
          ELYSIA'S
        </h1>
        <h2
          className="text-white text-2xl md:text-3xl font-light tracking-widest mb-4"
          style={{ letterSpacing: "0.12em" }}
        >
          BRIDAL SHOWER
        </h2>
        <div
          className="flex flex-col md:flex-row justify-between w-full max-w-lg mx-auto mt-32 text-white text-base md:text-lg font-light"
          style={{ letterSpacing: "0.02em" }}
        >
          <div className="text-left md:text-left mb-2 md:mb-0">
            January 11, 2pm
            <br />
            13 Jeffrey St, Reservoir
          </div>
          <div className="text-right md:text-right">
            Registry:{" "}
            <a
              href="https://charlieandelysia.com/registry"
              className="underline"
            >
              charlieandelysia.com/registry
            </a>
            <br />
            Dress Code: White & Earthy Colours
          </div>
        </div>
      </div>
    </main>
  );
}
