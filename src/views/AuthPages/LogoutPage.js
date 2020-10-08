import { useAppContext } from "libs/contextLib";

function LogoutPage() {
  const { handleLogout } = useAppContext();

  handleLogout();
  return null;
}

export default LogoutPage;
