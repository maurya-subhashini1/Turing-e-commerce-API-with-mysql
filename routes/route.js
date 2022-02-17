const express=require("express")
const {authentication}=require("../Middelwere/auth")


const { Get_attribute_data, Get_attribute_id, Get_attribute_value, Get_product_idData } = require("../controller/attribute")
const { Category_data, Category_id, Get_product_id, Get_department_id } = require("../controller/category")
const { Registion, login, Get_by_customer_id, update_a_customers, update_customer_address, update_credit_card } = require("../controller/customer")
const {getData ,deparment_id } = require("../controller/department")
const { Get_All_data_Prodectes, Get_BY_product_id, Get_BY_department_id, Get_BY_prodect_id_detail, Get_location_of_prodect, Search_products, Get_DataBY_Category_id, Post_review_By_product_id, Get_reviewData_from_product_id} = require("../controller/prodectes")
const {Get_shippingBYId, shipping } = require("../controller/shipping")
const { Get_Tax_data, Get_tax_id } = require("../controller/Tax")
const { create_order, Get_BYID_order_id, Get_dataIncustomer_ByID } = require("../controller/order")
const { Get_gernete_unique, shoppingcart_add,update_BY_item, delete_cart_id, Get_totalAmount_of_product, shoppin_data, Get_shopping_cart_BY_cart_id, delete_product_BY_item_id } = require("../controller/shoppingcart")

const router=express.Router()


// department routes
router.get("/department",getData)
router.get("/department/:department_id",deparment_id)


// category routes

router.get("/categorys",Category_data)
router.get("/category/:category_id",Category_id)
router.get("/category/inProduct/:product_id",Get_product_id)
router.get("/category/indepartment/:department_id",Get_department_id)


//attribute routes

router.get("/attribute",Get_attribute_data)
router.get("/attribute/:attribute_id",Get_attribute_id)
router.get("/attribute/values/:attribute_id",Get_attribute_value)
router.get("/attribute/inproduct/:product_id",Get_product_idData)




//prodects routes

router.get("/prodects",Get_All_data_Prodectes)
router.get("/prodects/:product_id",Get_BY_product_id)
router.get("/prodects/indepartment/:department_id",Get_BY_department_id)
router.get("/prodect/detail/:product_id",Get_BY_prodect_id_detail)
router.get("/product/location/:product_id",Get_location_of_prodect)
router.get("/search_product",Search_products)
router.get("/product/incategory/:category_id",Get_DataBY_Category_id)
router.post("/product/review",authentication,Post_review_By_product_id)
router.get("/product/reviw/:product_id",Get_reviewData_from_product_id)



//customer routes

router.post("/customers/registion",Registion)
router.post("/login",login)
router.get("/customers/:customer_id",authentication,Get_by_customer_id)
router.put("/customers/:customer_id",authentication,update_a_customers)
router.put("/customers/update_address/:customer_id",update_customer_address)
router.put("/customer/update_credit_card/:customer_id",update_credit_card)



// shippin routes
router.get("/shipping",shipping)
router.get("/shipping/:shipping_region_id",Get_shippingBYId)

//Tax routes
router.get("/Tax",Get_Tax_data)
router.get("/Tax/:tax_id",Get_tax_id)


// shiping_cart

router.get("/shopping_card",Get_gernete_unique)
router.post("/shoppingcart_add",shoppingcart_add)
router.get("/shopping",shoppin_data)
router.get("/shopping/:cart_id",Get_shopping_cart_BY_cart_id)
router.put("/shopping/update/:item_id",update_BY_item)
router.delete("/shopping/deleted/:cart_id",delete_cart_id)
router.get("/shopping_cart/totalAmount/:cart_id",Get_totalAmount_of_product)
router.delete("/shopping/deletedproduct/:item_id",delete_product_BY_item_id)




//orders routes
router.post("/orders/api",authentication,create_order)
router.get("/order/:order_id",authentication,Get_BYID_order_id)
router.get("/orders/incustomer",authentication,Get_dataIncustomer_ByID)
router.get("/orders/shortDetails/:order_id",authentication,Get_informition_BY_order_id)
module.exports=router;

