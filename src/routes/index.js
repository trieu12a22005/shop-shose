import LayoutDefault from "../Layout/LayoutDefault";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import About from "../pages/About";
import SignUp from "../pages/SignUp";
import Contact from "../pages/Contact";
import ProductDetail from "../pages/Detail";
import CartOrder from "../pages/Order";
export const routes = [
{
    path: "/",
    element:<LayoutDefault/>,
    children: [
        {
            path:"/",
            element: <Home/>
        },
        {
            path:"cart",
            element: <Cart/>
        },
        {
            path:"about",
            element: <About />
        },
        {
            path: "SignUp",
            element: <SignUp />
        },
        {
            path: "Contact",
            element: <Contact />
        },
        {
            path:"detail/:postId",
            element: <ProductDetail />
        },
        {
            path:"order",
            element:<CartOrder />
        }
    ]
}
]