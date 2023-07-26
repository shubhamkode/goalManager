import Header from "./Header";

export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-[100dvh]  w-screen">
      <Header />
      <div className="container px-2 pt-5 pb-20 mx-auto h-[80%] mt-5">{children}</div>
    </div>
  );
}
