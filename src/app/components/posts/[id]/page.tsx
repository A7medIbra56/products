"use client";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { PostsTs } from "../postsTs";
import styles from "../page.module.css";

export default function PostsDetails(props: any) {
  const [dataPostsDetails, setDataPostsDetails] = useState<PostsTs | null>(
    null
  );
  const [tags, setTags] = useState<string[]>([]);
  const { params } = props;

  async function fetchData(id: number) {
    try {
      const { data } = await Axios.get(`https://dummyjson.com/posts/${id}`);
      setDataPostsDetails(data);
      setTags(data.tags || []); // Assuming tags is an array, set it or an empty array if not present
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData(params.id); // Pass the desired post ID
  }, [params]);

  return (
    <>
      {dataPostsDetails && (
        <div className={styles.postDetailsContainer}>
          <h1 className={styles.title}>{dataPostsDetails.title}</h1>
          <p className={styles.body}>{dataPostsDetails.body}</p>
          <h2 className={styles.tagsHeader}>Tags:</h2>
          <ul className={styles.tagsList}>
            {tags.map((tag, index) => (
              <li key={index} className={styles.tagItem}>
                {tag}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
