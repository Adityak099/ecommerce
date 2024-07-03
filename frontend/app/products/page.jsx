import Navbar from "@/components/Common/Navbar/Navbar";
import Content from "@/components/content/Content";
import Sidebar from "@/components/sidebar/Sidebar";

export default function page() {
  return (
    <main>
      <Navbar />
      <div className="grid lg:grid-cols-12 grid-cols-1 md:grid-cols-2">
        <Sidebar className={" lg:grid-cols-2 xl:col-span-2 2xl:col-span-2"} />
        <Content className={"lg:col-span-10 xl:col-span-10 2xl:col-span-10"} />
      </div>
    </main>
  );
}
