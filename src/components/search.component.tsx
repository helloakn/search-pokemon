import React, { FormEvent, useEffect, useState, } from "react";

import styles from '@/styles/components/search.module.css'

export default function Search({...props}) { 
  
  const [searchName,setSearchName] = useState('');

  const onSearch=(e:FormEvent):void=>{
    e.preventDefault();
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
      props.onAfterSearch({searchName:searchName,result:result})
      props.setResult(result);
    })();
    
  }
  return (
      <form onSubmit={onSearch} className={styles.container}>
        <input type='text' onChange={(e)=>{setSearchName(e.target.value)}} />
        <input type='submit' 
          
          value="search" 
        />
      </form>
  )
}