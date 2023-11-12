"use client";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import styles from "./page.module.css";
import { CartsTs } from "./carts";
import Image from 'next/image';

export default function Carts() {
  const [dataCarts, setDataCarts] = useState<CartsTs[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  async function fetchData() {
    setIsLoading(true);
    try {
      const { data } = await Axios.get(`https://dummyjson.com/carts`);
      setDataCarts(data.carts.map((cart: CartsTs) => cart.products).flat());
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  }

  const sortByPrice = (range: number) => {
    const sortedData = [...dataCarts];
    switch (range) {
      case 20:
        sortedData.sort((a, b) => a.price - b.price);
        break;
      case 50:
        sortedData.sort((a, b) => b.price - a.price);
        break;
      default:
        // Default sorting logic (e.g., ascending order)
        sortedData.sort((a, b) => a.price - b.price);
        break;
    }
    setDataCarts(sortedData);
  };

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="vh-100 d-flex align-items-center justify-content-center">
          <i className="fas fa-spinner fa-spin h1"></i>
        </div>
      ) : (
        <div>
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={(e) => sortByPrice(parseInt(e.target.value))}
            value=""
          >
            <option value="" disabled>
              {" "}
              Sort by Price
            </option>
            <option value="20">Sort by Min Price </option>
            <option value="50">Sort by Max Price </option>
          </select>

          <div className={`container-fluid ${styles.productContainer}`}>
            <div className="row">
              {dataCarts.map((item, i) => (
                <div key={i} className={`col-lg-2 ${styles.product}`}>
                  <p className={styles.productInfo}>{item.title}</p>
                  <Image
                    className={`w-100 ${styles.productImage}`}
                    width={200} height={200} objectFit="cover"
                    src={`${item.thumbnail}`}
                    alt="Product"
                  />
                  <p className={styles.discount}>
                    Discount: {item.discountPercentage}
                  </p>
                  <p className={styles.price}>Price: {item.price}</p>
                  <p className={styles.total}>Total: {item.total}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
