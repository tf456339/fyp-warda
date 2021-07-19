import initDB from '../../helpers/initDB'
import Product from '../../models/Product'

initDB()

export default async (req,res)=>{
  switch (req.method)
    {
       case "GET":
         await getallProducts(req,res)
         break
       case "POST":
         await saveProduct(req,res)   
         break
    }  
}


const getallProducts = async (req,res)=>{
  try{
    const products =  await Product.find()
    //we are filtering the products delivered from DB
    let filteredProducts=[];
    let keywords=[]
    if(req.query.search){
      keywords=req.query.search.split(",");
    }
    
    for(let i=0;i<products.length;i++){
      if(products[i].categories){
        //loop for matching with all keywords of array starts
        for(let j=0; j<keywords.length;j++){
          //comparison of product category and keyword, one by one on each iteration
          if(products[i].categories==keywords[j]){
            //if keyword matches with the category o
            //if the product, it is being pushed to the filtered array
            filteredProducts.push(products[i]);
            //breaking this loop to avoid duplicate entries of a product having multiple matching keywords
            break;
          }
        }
      }
    }
    //products will return all products
   // res.status(200).json(products)
    //filteredProducts will return only the products with an attribute of categories
    if(keywords.length==0){
      res.status(200).json(products)
    }else{
      res.status(200).json(filteredProducts)
    }
    
  }catch(err){
    console.log(err)
  }
  
}


const saveProduct = async (req,res)=>{

  
  const {name,price,description,mediaUrl,categories} =  req.body
  
  try{
      if(!name || !price || !description || !mediaUrl){
    return res.status(422).json({error:"Please add all the fields"})
  }
   const product = await new Product({
     name,
     price,
     description,
     mediaUrl,
     categories
   }).save()
   res.status(201).json(product)
  }catch(err){
    res.status(500).json({error:"internal server error"})
    console.log(err)
  }


}