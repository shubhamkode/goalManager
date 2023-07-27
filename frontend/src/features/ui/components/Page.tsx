import Header from "./Header";

export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="container px-2 py-5 mx-auto mt-5">{children}</div>
    </>
  );
}
