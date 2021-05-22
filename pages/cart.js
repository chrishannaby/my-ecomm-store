import Head from "next/head";
import { FaShoppingCart } from "react-icons/fa";
import styles from "../styles/Cart.module.css";

import { useCart } from "../hooks/useCart.js";
import Table from "../components/Table";

const columns = [
  {
    columnId: "title",
    Header: "Product Name",
  },
  {
    columnId: "quantity",
    Header: "Quantity",
  },
  {
    columnId: "pricePerItem",
    Header: "Price Per Item",
  },
  {
    columnId: "total",
    Header: "Item Total",
  },
];

import products from "../products.json";

export default function Home() {
  const { cartItems, checkout, updateItem } = useCart();
  const data = cartItems.map((item) => {
    const product = products.find(({ id }) => id === item.id);

    const Quantity = () => {
      return (
        <input
          name="quantity"
          type="number"
          min={0}
          value={item.quantity}
          onChange={(e) => {
            updateItem({
              id: item.id,
              quantity: parseInt(e.target.value),
            });
          }}
        />
      );
    };

    return {
      ...item,
      quantity: <Quantity />,
      title: product.title,
      total: item.pricePerItem * item.quantity,
    };
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Shopping Cart - Space Jelly</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <FaShoppingCart /> Cart
        </h1>

        <Table className={styles.table} data={data} columns={columns} />

        <p className={styles.checkout}>
          <button className={styles.button} onClick={checkout}>
            Check Out
          </button>
        </p>
      </main>
    </div>
  );
}
