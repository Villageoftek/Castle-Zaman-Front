import { Link } from "react-router";
import SwitchButton from "../switchButton";
import useThemeState from "@/state/theme";
import logo from '../../../public/images/logo.png?url';


export default function Header() {
  const toggleTheme = useThemeState((state) => state.toggleTheme);

  return (
    <header>
      <div className="container flex items-center justify-between my-4">
        <Link to="/" className="w-40 h-fit">
          <img src={logo} alt="castle zaman" className="w-full" />
        </Link>
        {/* <h1 className="capitalize text-2xl">Our Menu</h1> */}
        <SwitchButton onClick={toggleTheme} />
      </div>
    </header>
  );
}
