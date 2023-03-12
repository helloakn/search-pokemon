"use client"
import React, { FormEvent, useEffect, useState, } from "react";

import styles from '@/styles/components/result.module.css'

//*** Custom Types */
import {TResult,TPokemon,TAttacks,TEvolutions} from '@/types'

function PokemonComponent({...props}){
  const [pokemon,setPokemon] = useState(props.data);
  useEffect(()=>{
    setPokemon(props.data);
  },[props.data]);

  return (
    <div className={styles.pokemonContainer}>
      
      <table className={styles.tblNormal}>
        <tr><th>ID</th><td>{pokemon.id}</td></tr>
        <tr><th>Number</th><td>{pokemon.number}</td></tr>
        <tr><th>Name</th><td>{pokemon.name}</td></tr>
      </table>

      <table className={styles.tbl}>
        <tr><th>Size</th><th>Min</th><th>Max</th></tr>
        <tr>
            <th>Weight</th>
            <td>{pokemon.weight.minimum  }</td>
            <td>{pokemon.weight.maximum}</td>
        </tr>
        <tr>
            <th>Height</th>
            <td>{pokemon.height.minimum  }</td>
            <td>{pokemon.height.maximum}</td>
        </tr>
      </table>
     
        <table className={styles.tbl}>
          <tr><th>Special Attacking</th><th>Type</th><th>Damage</th></tr>
          {pokemon.attacks.special.map((attacks:TAttacks) => (
            <tr key={"attname"+attacks.name}>
              <td>{attacks.name}</td>
              <td>{attacks.type}</td>
              <td>{attacks.damage}</td>
            </tr>
          ))}
        </table>

        <table className={styles.tbl}>
          <tr><th>Fast Attacking</th><th>Type</th><th>Damage</th></tr>
          {pokemon.attacks.fast.map((attacks:TAttacks) => (
            <tr key={"attname"+attacks.name}>
              <td>{attacks.name}</td>
              <td>{attacks.type}</td>
              <td>{attacks.damage}</td>
            </tr>
          ))}
        </table>
        <div className={styles.evolutionContainer}>
          <div>Evolutions</div>
          <table className={styles.tbl}>
            <tr><th>id</th><th>number</th><th>name</th></tr>
            {(pokemon.evolutions==null?[]:pokemon.evolutions).map((evolution:TEvolutions) => (
              <tr key={"evolutionid"+evolution.id}>
                <td>{evolution.id}</td>
                <td>{evolution.number}</td>
                <td>{evolution.name}</td>
              </tr>
            ))}
          </table>
      </div>

    </div>
  )
}
function ErrorComponent({...props}){
  return (
    <>{props.errMessage}</>
  )
}

export default function Result({...props}) {  

  const [result,setResult] = useState<TResult>(props.result);
  const [errorMessage,setErrorMessage] = useState<String>('');
// {(errorMessage!='ok'?ErrorComponent:PokemonComponent)}
  useEffect(()=>{
    //setResult(props.result)
    console.log('result component result',result)
     if(props.result.errors && props.result.errors.length>0){
      setErrorMessage('Sorry. Please Specific Pokemon name first. example => Bulbasaur or Ivysaur , etc ...')
    }
    else if(props.result.data.pokemon == null){
      setErrorMessage('Sorry, we do not found your searched result on our records. you can search these => Bulbasaur or Ivysaur , etc ...')
    }
    else{
      setErrorMessage('ok')
      console.log('result component useEffect',props.result.data.pokemon)
    }
    //setErrorMessage(result?.errors==undefined?`Input Pokemon Name First`:(result?.data.pokemon == null?`There is no data`:"ok"))
  },[props.result]);

  return (
    <div className={styles.resultContainer}>
      {(errorMessage!='ok'?<ErrorComponent errMessage={errorMessage}/>:<PokemonComponent data={props.result.data.pokemon}/>)}
    </div>
  )
}