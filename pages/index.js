import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

import products from "../products.json";
import { useCart } from "../hooks/useCart.js";

export default function Home() {
  const { subtotal, totalItems, addToCart, checkout } = useCart();
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Space Jelly Shop</h1>

        <p className={styles.description}>
          The best space jellyfish swag on the web apparently!
        </p>

        <ul className={styles.grid}>
          {products.map((product) => {
            const { title, description, image, price, id } = product;
            return (
              <li key={id} className={styles.card}>
                <Link href={`/products/${id}`}>
                  <a>
                    <img src={image} alt={title} />
                    <h2>{title}</h2>
                    <p>${price}</p>
                    <p>{description}</p>
                    <p>
                      <button
                        className={styles.button}
                        onClick={() => addToCart(product)}
                      >
                        Add to Cart
                      </button>
                    </p>
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}
