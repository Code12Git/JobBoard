import AdminAnimation from "@/animations/homepage/AdminAnimation";

export default function Home() {
  return (
    <div className=" flex justify-center items-center h-screen">
      <AdminAnimation text="Welcome to the Admin Panel of Modern AI Job Board" gradient='from-orange-400 via-red-300 to-purple-400' />
    </div>
  );
}
