import Header from "../header";
import { Outlet } from "react-router-dom";
import SearchBar from "../SearchBar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}
