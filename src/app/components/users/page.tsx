"use client"
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { usersTs } from './usersTs';
import styles from"./page.module.css"
import Image from 'next/image';

export default function Users() {
  const[userData , setUserData] = useState<usersTs[]>([])
async function fetchData() 
{ 
  const {data } = await Axios.get(`https://reqres.in/api/users`)
  console.log(data.data )
  setUserData(data.data)
}
useEffect(() => {
  fetchData( ); // Pass the desired post ID
}, []);

  return (
    <div className={styles.userCardContainer}>
      {userData.map((item) => (
        <div key={item.id} className={styles.userCard}>
          <p className="userName">
            {item?.first_name} {item?.last_name}
          </p>
          <Image
            className="userImage"
            src={`${item.avatar}`}
            alt={`Image`}
            width={200} height={200} objectFit="cover" />
          <p className={styles.userEmail}>{item?.email}</p>
        </div>
      ))}
    </div>
  )
}
