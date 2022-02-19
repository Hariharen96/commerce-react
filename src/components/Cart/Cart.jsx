import React from 'react';
import { Container,Typography,Button,Grid } from '@material-ui/core';
import { mergeClasses } from '@material-ui/styles';
import useStyles from './styles';
import CartItems from './Cartitems/CartItems';
import { Link } from 'react-router-dom';

const Cart = ({cart,handleUpdateCartQty,handleRemoveFromCart,handleEmptyCart}) => {
    const classes = useStyles();
    

    const EmptyCart = () => {
        return(
        <Typography varient="subtitle1">You have no items in your shopping cart,
          <Link to="/" className={classes.link}>start adding some!</Link>
        </Typography>
        )
    };

    const FilledCart = () => {
        return(
        <>
        <Grid container spacing={3}>
            {cart.line_items.map((item)=>(
                <Grid item xs={12} sm={4} key={item.id}>
                  <CartItems  item={item} handleUpdateCartQty={handleUpdateCartQty} handleRemoveFromCart={handleRemoveFromCart} />
                
                </Grid>
            ))} 
        </Grid>
        <div className={classes.cardDetails}>
            <Typography varient="h4">
                Subtotal: {cart.subtotal.formatted_with_symbol}
            </Typography>
            <div>
                <Button className={classes.emptyButton} type="button" varient="contained" size="large" color="secondary" onClick={handleEmptyCart}>Empty Cart</Button>
                <Button component={Link} to="/checkout" className={classes.checkoutButton} type="button" varient="contained" size="large" color="primary">Checkout</Button>
                
            </div>
        </div>
        </>
        )
    }
           
    if(!cart.line_items) return 'Loading...';
    

    return(
        <Container>
            <div className={mergeClasses.toolbar} />
                <Typography className={classes.title} varient="h3" gutterBottom>Your Shopping Cart</Typography> 
                {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}

        </Container>
    )
}


export default Cart
