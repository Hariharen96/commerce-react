import React from 'react';
import { Typography,Button,Card,CardActions,CardContent,CardMedia } from '@material-ui/core';
import useStyles from './styles';


const CartItems = ({item,handleUpdateCartQty,handleRemoveFromCart}) => {
    const classes = useStyles();
    console.log(item);
    return(
        <Card>
            <CardMedia image={item.media.source} alt={item.name} className={classes.media} />
            <CardContent className={classes.cardContent}>
                <Typography varient="h4">{item.name}</Typography>
                <Typography varient="h5">{item.line_total.formatted_with_symbol}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <div className={classes.buttons}>
                    <Button type="button" size="small" onClick={()=>handleUpdateCartQty(item.id,item.quantity-1)}>-</Button>
                    <Typography>{item.quantity}</Typography>
                    <Button type="button" size="small" onClick={()=>handleUpdateCartQty(item.id,item.quantity+1)}>+</Button>
                </div>
                <Button varient="contained" type="button" color="secondary" onClick={()=>handleRemoveFromCart(item.id)}>Remove</Button>
            </CardActions>
        </Card>
    )
}




export default CartItems