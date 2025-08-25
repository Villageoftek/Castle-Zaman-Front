import Header from "@components/header";
// import Footer from "@components/footer";
import { Outlet } from "react-router";
import { useEffect } from "react";
import useThemeState from "@/state/theme";

export default function AppLayout() {
  const theme = useThemeState((state) => state.theme);

  useEffect(() => {
    document.documentElement.classList.add(theme ? "dark" : "light");
    document.documentElement.classList.remove(theme ? "light" : "dark");
  }, [theme]);

  return (
    <>
      <Header />
      <main className="min-h-screen container ">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </>
  );
}
