import { LogoutLink } from "./LogoutLink";

export function Header() {
  return (
    <header>
      <nav>
        <a href="#">Home</a> | <LogoutLink />
      </nav>
    </header>
  );
}
