"use client";
import Axios from "axios";
import { useEffect, useState } from "react";
import { PostsTs } from "./postsTs";
import Link from "next/link";
import Styles from "./page.module.css";

export default function Posts() {
  const [dataPosts, setDataPosts] = useState<PostsTs[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  async function fetchData() {
    try {
      setIsLoading(true);
      const { data } = await Axios.get("https://dummyjson.com/posts");
      setDataPosts(data.posts);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="vh-100 d-flex align-items-center justify-content-center">
          <i className="fas fa-spinner fa-spin h1"></i>
        </div>
      ) : (
        <div className={`container `}>
          <div className="row">
            {dataPosts.map((item: PostsTs) => (
              <div
                key={item.id}
                className={`col-lg-4 col-md-4 g-4 ${Styles.cridPosts}`}
              >
                <Link
                  className={`${Styles.postLink} `}
                  href={`/components/posts/${item.id}`}
                >
                  <button
                    type="button"
                    className="btn btn-primary btn-lg btn-block w-100"
                  >
                    Show Details Posts
                  </button>
                  <h4>{item.title}</h4>
                  <p>{item.body}</p>
                </Link>
                <div></div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
