//*** Next Components */
import React, { useEffect,useState } from "react";
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })

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

  useEffect(()=>{
    console.log('myreult',result)
  },[result]);

  //const onAfterSearch = ({_searchName,_result}:{_searchName:string,_result:TResult}) =>{
    const onAfterSearch = ({_searchName,_result}:{_searchName:string,_result:TResult}) =>{
    // setResult(_result)
    // console.log('_result',_result)
    // console.log('_searchName',_searchName)
    // // if(_result.errors!=undefined){
    // //   alert('there is error')
    // // }
    // // else if(_result.data.pokemon == null){
    // //   alert('no data')
    // // }
    // // else{
    // //   console.log(_result.data.pokemon)
    // // }
  }

  return (
    <MainLayout>
      <Search 
        onAfterSearch={onAfterSearch}
        setResult={setResult}
      />
      <Result 
        result={result}
        
      />
    </MainLayout>
  )
}
