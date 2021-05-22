import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../../hooks/useCart.js";
import styles from "./Nav.module.css";

const Nav = () => {
  const { subtotal, checkout } = useCart();
  return (
    <nav className={styles.nav}>
      <Link href="/">
        <a className={styles.navTitle}>Space Jelly Shop</a>
      </Link>
      <p className={styles.navCart}>
        <Link href="/cart">
          <a>
            <FaShoppingCart /> ${subtotal}
          </a>
        </Link>
      </p>
    </nav>
  );
};

export default Nav;
