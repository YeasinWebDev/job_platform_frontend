// NavbarWrapper.tsx

import { getMe } from "@/app/services/auth/auth";
import Navbar from "./Navbar";
import { getCookie } from "@/app/services/auth/tokenHandler";

export default async function NavbarWrapper() {
  const token = await getCookie("authToken");
  const user = await getMe()

  return <Navbar isLoggedIn={!!token} user={user} />;
}