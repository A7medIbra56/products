"use client";
import Axios from "axios";
import { useEffect, useState } from "react";
import { ProductsTs } from "../ProductsTs";
import { ImageTs } from "../ProductsTs";
import styles from "../page.module.css";
import Image from 'next/image';
export default function ProductsDetails(props: any) {
  const [productsDetails, setProductsDetails] = useState<
    ProductsTs | undefined
  >();
  const [image, setImage] = useState<ImageTs[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const { params } = props;

  useEffect(() => {
    async function fetchData(id: number) {
      setIsLoading(true);
      try {
        const { data } = await Axios.get(
          `https://dummyjson.com/products/${id}`
        );
        setProductsDetails(data);
        setImage(data.images);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    }

    fetchData(params.id);
  }, [params]);

  return (
    <>
      {isLoading ? (
        <div className="vh-100 d-flex align-items-center justify-content-center">
          <i className="fas fa-spinner fa-spin h1"></i>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.productInfo}>
            <h2>{productsDetails?.title}</h2>
            <p>Brand: {productsDetails?.brand}</p>
            <p>Category: {productsDetails?.category}</p>
            <p>Description: {productsDetails?.description}</p>
            <p className="discount">
              Discount: {productsDetails?.discountPercentage}
            </p>
            <p className="price">Price: ${productsDetails?.price}</p>
            <p className="rating">Rating: {productsDetails?.rating}</p>
          </div>
          <div className={styles.productImage}>
            {image.map((item, i) => (
              <Image
                key={i}
                src={`${item}`} // Use the dynamic image URL directly
                alt={`Image ${i + 1}`}
                width={200} height={200} objectFit="cover"              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
