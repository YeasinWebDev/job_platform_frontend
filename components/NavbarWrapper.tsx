// NavbarWrapper.tsx

import Navbar from "./Navbar";
import { getCookie } from "@/app/services/auth/tokenHandler";

export default async function NavbarWrapper() {
  const token = await getCookie("authToken");

  return <Navbar isLoggedIn={!!token} />;
}