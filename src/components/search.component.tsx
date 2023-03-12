import React, { FormEvent, useEffect, useState, } from "react";

import styles from '@/styles/components/search.module.css'

export default function Search({...props}) { 


  useEffect(()=>{
    console.log(props.pokemonName)
    console.log(props.pokemonName.state)
    console.log('props.pokemonName.text',props.pokemonName.text)
    if(props.pokemonName.state=='onSearch'){
      props.onProcess("searching");
      (async ()=>{
          let payLoad = {
            query:`
            query {
              pokemon(name: "${props.pokemonName.text}") {
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
        props.onProcess("done")
        props.setResult(result);
      })();
    }
    
  },[props.pokemonName]);


  const onSearch=(e:FormEvent):void=>{
    e.preventDefault();
    props.onProcess("searching");
    props.setPokemonName({text:props.pokemonName.text,state:"onSearch"})
    
  }//

  return (
      <form onSubmit={onSearch} className={styles.searchContainer}>
        <input 
          type='text' 
          onChange={(e)=>{props.setPokemonName({text:e.target.value,state:"onTextChange"})}} 
          value={props.pokemonName.text}
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