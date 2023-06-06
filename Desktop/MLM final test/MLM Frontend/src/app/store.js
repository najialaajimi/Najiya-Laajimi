import { configureStore , getDefaultMiddleware } from '@reduxjs/toolkit';
/* Boutique */
import blogwebReducer from '../boutique/features/blogs/blogSlice';
import contactwebReducer from '../boutique/features/contact/contactSlice';
import productwebReducer from '../boutique/features/Product/productSlice';
import  authwebReducer  from '../boutique/features/user/userSlice';
/* Admin */
import authadminReducer from "../admin/features/auth/authSlice";
import bcategoryadminReducer from "../admin/features/bcategory/bcategorySlice";
import blogadminReducer from "../admin/features/blogs/blogSlice";
import brandadminReducer from "../admin/features/brand/brandSlice";
import coloradminReducer from "../admin/features/color/colorSlice";
import couponadminReducer from "../admin/features/coupon/couponSlice";
import customeradminReducer from "../admin/features/customers/customerSlice";
import enquiryadminReducer from "../admin/features/enquiry/enquirySlice";
import pCategoryadminReducer  from "../admin/features/pcategory/pcategorySlice";
import productadminReducer from "../admin/features/product/productSlice";
import uploadadminReducer  from "../admin/features/upload/uploadSlice";
import tikcetadminReducer from '../admin/features/ticketadmin/ticketSlice';
import meetadminReducer  from '../admin/features/Event/eventSlice';
/* User */
import contactReducer from '../user/feature/contact/contactSlice';
import productReducer from '../user/feature/produit/productSlice';
import  authReducer  from '../user/feature/user/userSlice';
import ticketReducer from '../user/feature/ticket/ticketSlice';
import meetReducer from '../user/feature/Event/eventSlice';



export const store = configureStore({
  reducer: {
    /* boutique */
    authweb: authwebReducer,
    productweb: productwebReducer,
    blogweb: blogwebReducer,
    contactweb:contactwebReducer,
    /* admin */
    authadmin: authadminReducer,
    customeradmin: customeradminReducer,
    productadmin: productadminReducer,
    brandadmin: brandadminReducer,
    pCategoryadmin: pCategoryadminReducer,
    blogadmin: blogadminReducer,
    bCategoryadmin: bcategoryadminReducer,
    coloradmin: coloradminReducer,
    enquiryadmin: enquiryadminReducer,
    uploadadmin: uploadadminReducer,
    couponadmin: couponadminReducer,
    ticketadmin: tikcetadminReducer,
    meetadmin : meetadminReducer,
    /* user */
    auth: authReducer,
    product: productReducer,
    contact:contactReducer,
    tickets:ticketReducer,
    meets : meetReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // désactiver la vérification de sérialisation
    }),
});
