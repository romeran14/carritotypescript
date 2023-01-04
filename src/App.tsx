import { useState } from "react";
import { Button, Drawer } from "@mui/material";
import { LinearProgress } from "@mui/material";
import { Grid } from "@mui/material";
import { AddShoppingCart, AppBlocking } from "@mui/icons-material";
import Badge from "@mui/material/Badge";
import { useQuery } from "react-query";
import { Wrapper, StyledButton } from "./App.styles";
import Item from "./Item/Item";
import "./App.css";
import { Cart } from "./Cart/Cart";
import { Close } from "@mui/icons-material";

export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch("https://fakestoreapi.com/products")).json();

function App() {
  const [cartOpen, setcartOpen] = useState(false);
  const [cartItems, setcartItems] = useState([] as CartItemType[]);

  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProducts
  );
  console.log(data);

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);
  const handleAddToCart = (clickedItem: CartItemType) => {
    setcartItems(prev => {
      const isItemInCart = prev.find(item => item.id === clickedItem.id);

      if(isItemInCart){
        return prev.map(item=>
          item.id === clickedItem.id
          ?{...item, amount: item.amount + 1}
          :item
          )
      }
      return [...prev,{...clickedItem, amount: 1}]
    })
  };

  const handleRemoveFromCart = (id: number) => {
    setcartItems(prev =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };

  if (isLoading) return <LinearProgress></LinearProgress>;
  if (error) return <div>Something went Wrong..</div>;
  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setcartOpen(false)}>
        <Button className="closebtn" onClick={() => setcartOpen(false)}><Close></Close></Button>
        <Cart
        cartItems={cartItems}
        addToCart={handleAddToCart}
        removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <StyledButton onClick={() => setcartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <AddShoppingCart></AddShoppingCart>
        </Badge>
      </StyledButton>
      <Grid>
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default App;
