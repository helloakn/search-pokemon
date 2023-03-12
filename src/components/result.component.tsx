"use client"
import React, { FormEvent, useEffect, useState, } from "react";

import styles from '@/styles/components/result.module.css'

//*** Custom Types */
import {TResult} from '@/types'

function PokemonComponent(){
  return (
    <>hello this is pokemon</>
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
      setErrorMessage('result component  there is error')
    }
    else if(props.result.data.pokemon == null){
      setErrorMessage('result component  no data')
    }
    else{
      console.log('result component ',props.result.data.pokemon)
    }
    //setErrorMessage(result?.errors==undefined?`Input Pokemon Name First`:(result?.data.pokemon == null?`There is no data`:"ok"))
  },[props.result]);

  return (
    <div className={styles.container}>
      {(errorMessage!='ok'?<ErrorComponent errMessage={errorMessage}/>:<PokemonComponent/>)}
    </div>
  )
}