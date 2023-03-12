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

  useEffect(()=>{
    console.log('myreult',result)
  },[result]);

  const onAfterSearch = (message:string) =>{
    setIsLoading(message)
  }

  return (
    <MainLayout
      isLoading={isLoading=='searching'}
    >
      <Search 
        onAfterSearch={onAfterSearch}
        setResult={setResult}
      />
      {isLoading=='first'?<div className={styles.plsSearch} >Please Specific Pokemon name first and make the searching<br/>example => Bulbasaur or Ivysaur , etc ...</div>
      :
      isLoading!='first' && isLoading!='loading' ?
        <Result 
        result={result}
        
        />
      :<></>}
      
      
    </MainLayout>
  )
}
