"use client";
import Axios from "axios";
import { useEffect, useState } from "react";
import { ProductsTs } from "./ProductsTs";
import styles from "./page.module.css";
import Link from "next/link";
import Image from 'next/image';

export default function Products() {
  const [products, setProducts] = useState<ProductsTs[]>([]);
  const [sortBy, setSortBy] = useState<string>("");
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  async function fetchData() {
    setIsLoading(true);
    try {
      const { data } = await Axios.get(`https://dummyjson.com/products`);
      setProducts(data.products);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  const sortProducts = (category: string) => {
    setSortBy(category);
    const sortedProducts = [...products];

    switch (category) {
      case "price":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "brand":
        sortedProducts.sort((a, b) => a.brand.localeCompare(b.brand));
        break;
      case "category":
        sortedProducts.sort((a, b) => a.category.localeCompare(b.category));
        break;
      case "title":
        sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    setProducts(sortedProducts);
  };

  return (
    <>
      {isLoading ? (
        <div className="vh-100 d-flex align-items-center justify-content-center">
          <i className="fas fa-spinner fa-spin h1"></i>
        </div>
      ) : (
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 mb-4">
              <select
                className="form-select"
                onChange={(e) => sortProducts(e.target.value)}
              >
                <option value="" disabled>
                  {" "}
                  Sort Data
                </option>
                <option value="price">Sort by Price</option>
                <option value="brand">Sort by Brand</option>
                <option value="category">Sort by Category</option>
                <option value="title">Sort by Title</option>
              </select>
            </div>
            {products.map((item: ProductsTs) => (
              <div key={item.id} className={`col-12 col-md-6 col-lg-3 mb-4`}>
                <Link href={`/components/products/${item.id}`}>
                  <div
                    className={`card ${styles.product}`}
                    style={{ width: "100%" }}
                  >
                    <Image
                      src={`${item.thumbnail}`}
                      alt={item.title}
                      className="card-img-top"
                      width={200} height={200} objectFit="cover"                    />
                    <div className="card-body">
                      <h5 className={`card-title ${styles.title}`}>
                        {item.title}
                      </h5>
                      <p className={`card-text ${styles.price}`}>
                        Price: ${item.price}
                      </p>
                      <p className={`card-text ${styles.brand}`}>
                        Brand: {item.brand}
                      </p>
                      <p className={`card-text ${styles.category}`}>
                        Category: {item.category}
                      </p>
                      <p className={`card-text ${styles.description}`}>
                        {item.description}
                      </p>
                      <button className="btn btn-primary">Show Details</button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
