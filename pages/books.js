import Link from 'next/link'
import baseUrl from '../helpers/baseUrl'
import { useRouter } from 'next/router'
import {useEffect, useState} from 'react'

const Home = ({products})=>{

  const [state,setState]=useState(products)
  
  const router = useRouter()


  if(router.query.search){
    const categories=router.query.search
    filterBooks(categories);
  }
 
  
async function filterBooks (categories){
  const res =  await fetch(`${baseUrl}/api/products?search=${categories}`)
  const abc = await res.json()
  setState(abc);
}


 const productList = state.map(product=>{
   return(
  
    <div className="card pcard" key={product._id}>
    <div className="card-image">
      <img src={product.mediaUrl} />
      <span className="card-title">{product.name}</span>
    </div>
    <div className="card-content">
      <p> PKR:  {product.price}</p>
    </div>
    <div className="card-category">
      <p> Category:  {product.categories}</p>
    </div>
    <div className="card-action">
      <Link href={'/product/[id]'} as={`/product/${product._id}`}><a>View Product</a></Link>
    </div>
  </div>

   )
 })

  // console.log(products)
  return(
    <div className="rootcard">
      {productList}
    </div>
  )
}


 export async function getStaticProps(){

 const res =  await fetch(`${baseUrl}/api/products`)
 const data = await res.json()
 return {
   props:{
     products:data
   }
 }
} 

// export async function getServerSideProps(){

//  const res =  await fetch(`${baseUrl}/api/products`)
//  const data = await res.json()
//  return {
//    props:{
//      products:data
//    }
//  }
// }






export default Home