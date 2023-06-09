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
        <tbody>
          <tr><th>ID</th><td>{pokemon.id}</td></tr>
          <tr><th>Number</th><td>{pokemon.number}</td></tr>
          <tr><th>Name</th><td>{pokemon.name}</td></tr>
        </tbody>
      </table>

      <table className={styles.tbl}>
        <tbody>
          <tr><th>Size</th><th>Min</th><th>Max</th></tr>
          <tr>
              <td>Weight</td>
              <td>{pokemon.weight.minimum  }</td>
              <td>{pokemon.weight.maximum}</td>
          </tr>
          <tr>
              <td>Height</td>
              <td>{pokemon.height.minimum  }</td>
              <td>{pokemon.height.maximum}</td>
          </tr>
        </tbody>
      </table>
     
        <table className={styles.tbl}>
          <tbody>
          <tr>
            <th>Special Attacking</th><th>Type</th><th>Damage</th>
          </tr>
          {pokemon.attacks.special.map((attacks:TAttacks) => (
            <tr key={"attname"+attacks.name}>
              <td>{attacks.name}</td>
              <td>{attacks.type}</td>
              <td>{attacks.damage}</td>
            </tr>
          ))}
           </tbody>
        </table>

        <table className={styles.tbl}>
        <tbody>
          <tr><th>Fast Attacking</th><th>Type</th><th>Damage</th></tr>
          {pokemon.attacks.fast.map((attacks:TAttacks) => (
            <tr key={"attname"+attacks.name}>
              <td>{attacks.name}</td>
              <td>{attacks.type}</td>
              <td>{attacks.damage}</td>
            </tr>
          ))}
          </tbody>
        </table>
        <div className={styles.evolutionContainer}>
          <div>Evolutions</div>
          <table className={styles.tbl}>
          <thead>
            <tr>
              <th>id</th><th>number</th><th>name</th>
            </tr>
            </thead>
            <tbody>
            {(pokemon.evolutions==null?[]:pokemon.evolutions).map((evolution:TEvolutions) => (
              <tr key={"evolutionid"+evolution.id} onClick={()=>{props.setPokemonName({text:evolution.name,state:"onSearch"})}}>
                <td>{evolution.id}</td>
                <td>{evolution.number}</td>
                <td >{evolution.name}</td>
              </tr>
            ))}
           </tbody>
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
     if(props.result.errors && props.result.errors.length>0){
      setErrorMessage('Sorry. Please Specific Pokemon name first. example => Bulbasaur or Ivysaur , etc ...')
    }
    else if(props.result.data.pokemon == null   && props.pokemonName.state!="onload"){
      setErrorMessage('Sorry, we do not found your searched result on our records. you can search these => Bulbasaur or Ivysaur , etc ...')
    }
    else{
      setErrorMessage('ok')
    }
  },[props.result]);

  return (
    <div className={styles.resultContainer}>
      {(
        errorMessage!='ok'?
        <ErrorComponent errMessage={errorMessage}/>
        :
        <PokemonComponent
         data={props.result.data.pokemon}
         setPokemonName={props.setPokemonName}
         />
      )}
    </div>
  )
}