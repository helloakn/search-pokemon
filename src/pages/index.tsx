//*** Next Components */
import React, { useEffect,useState } from "react";
import { Inter } from 'next/font/google'


//*** Custom Layout */
import MainLayout from '@/layouts/mainlayout'

//*** Custom Components */
import Search from '@/components/search.component'
import Result from '@/components/result.component'


//*** Custom Types */
import {TResult,TError} from '@/types'
import styles from '@/styles/Home.module.css'


export default function Home() {

  const [result,setResult] = useState<TResult>({data:{pokemon:null},errors:[]});
  const [isLoading,setIsLoading] = useState<string>('first');
  const [pokemonName,setPokemonName] = useState({text:'',state:"onload"});

  const onProcess = (message:string) =>{
    setIsLoading(message)
  }

  return (
    <MainLayout
      isLoading={isLoading=='searching'}
    >
      <Search 
        onProcess={onProcess}
        setResult={setResult}
        setPokemonName={setPokemonName}
        pokemonName={pokemonName}
      />
      {isLoading=='first'?<div className={styles.plsSearch} >Let's start pokemon searching<br/>example => Bulbasaur or Ivysaur , etc ...</div>
      :
      isLoading!='first' && isLoading!='loading' ?
        <Result 
        result={result}
        setPokemonName={setPokemonName}
        />
      :<></>}
      
      
    </MainLayout>
  )
}
