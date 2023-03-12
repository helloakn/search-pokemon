import React, { FormEvent, useEffect, useState, } from "react";

import styles from '@/styles/components/search.module.css'

export default function Search({...props}) { 
  
  const [searchName,setSearchName] = useState('');

  const onSearch=(e:FormEvent):void=>{
    e.preventDefault();
    props.onAfterSearch("searching");
    (async ()=>{
        let payLoad = {
          query:`
          query {
            pokemon(name: "${searchName}") {
              id
              number
              name
              weight {
                minimum
                maximum
              }
              height {
                minimum
                maximum
              }
              attacks{
                special {
                  name
                  type
                  damage
                }
                fast {
                  name
                  type
                  damage
                }
              }
              evolutions {
                id
                number
                name
              }
            }
          }
          `
      };
        let result = await new Promise((resolve)=>{
          fetch('https://graphql-pokemon2.vercel.app/',{
              body: JSON.stringify(payLoad),
              headers: {
                'Content-Type': 'application/json'//,
              // 'x-access-token':authUser.token
              },
              method: 'POST'
          })
          .then((res) => res.json())
          .then((data) => {
              resolve(data)
          });
      });
      console.log('result on search component',result)
      props.onAfterSearch("done")
      props.setResult(result    );
    })();
    
  }
  return (
      <form onSubmit={onSearch} className={styles.searchContainer}>
        <input 
          type='text' 
          onChange={(e)=>{setSearchName(e.target.value)}} 
          placeholder=" search by pokemon name"
          className={styles.textBox}
        />
        <input 
          type='submit' 
          value="search" 
          className={styles.btn}
        />
      </form>
  )
}