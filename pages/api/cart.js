import jwt from 'jsonwebtoken'
import Cart from '../../models/Cart'
import Product from '../../models/Product'
import Authenticated from '../../helpers/Authenticated'
import initDb from '../../helpers/initDB'


initDb()


export default async (req,res)=>{
    switch(req.method){
        case "GET":
            await fetchUserCart(req,res)
            break
        case "PUT":
            await addProduct(req,res)  
            break   
        case "DELETE":
            await removeProduct(req,res) 
            break   
    }
}



const fetchUserCart =  Authenticated(async (req,res) =>{
         const cart =  await Cart.findOne({user:req.userId})
                       .populate("products.product")
         res.status(200).json(cart.products)
})


const addProduct = Authenticated(async(req,res)=>{
     const {quantity,productId} = req.body

     const cart =  await Cart.findOne({user: req.userId})
     const pExists =  cart.products.some(pdoc => productId === pdoc.product.toString() )
   
     if(pExists){
        res.status(200).json({message:"The selected product is already available in the cart!"})
     }else{
         const newProduct = {quantity,product:productId}
         await Cart.findOneAndUpdate(
             {_id:cart._id},
             {$push:{products:newProduct}}
             )
             res.status(200).json({message:"Your selected product has been added in the shopping cart!"})
     }
     


})


const removeProduct = Authenticated(async (req,res)=>{
    const {productId} = req.body
    const cart =   await Cart.findOneAndUpdate(
        {user:req.userId},
        {$pull:{products:{product:productId}}},
        {new:true}
    ).populate("products.product")
    res.status(200).json(cart.products)
})