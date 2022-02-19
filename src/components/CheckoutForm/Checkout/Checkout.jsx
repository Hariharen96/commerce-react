import React, { useState, useEffect } from 'react'
import { Paper,Stepper,Step,StepLabel,Typography,CircularProgress,Divider,Button } from '@material-ui/core'
import useStyles from './styles'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'
import { commerce } from '../../../lib/commerce'
import { Link,useHistory } from 'react-router-dom'




const Checkout = ({cart,error,onCaptureCheckout,order}) => {
    const steps= ['Shipping Address','Payment Details'];
    const [activeStep,setActiveStep] = useState(0);
    const [checkoutToken,setCheckOutToken] = useState(null);
    const [shippingData,setShippingData] = useState({});
    const [isFinished,setIsFinished] = useState(false);
    const classes = useStyles();
    const history = useHistory();

    
    

    useEffect(()=>{
        const generateToken = async () => {
            try{
                const token = await commerce.checkout.generateToken(cart.id,{ type: 'cart' });
                setCheckOutToken(token);
            }catch(error){
                history.push('/');
            }
        }
        generateToken();
    },[cart])

    const nextStep = () => setActiveStep((prevActiveStep)=> prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep)=> prevActiveStep - 1);
    

    const next = (data) => {
        setShippingData(data);
        nextStep();
    }

    const timeout = () => {
        setTimeout(()=>{
            setIsFinished(true);
        },3000)
    } 

    
    let Confirmation = () => (order.customer ? (
        <>
          <div>
            <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}!</Typography>
            <Divider className={classes.divider} />
            <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
          </div>
          <br />
          <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
        </>
      ) : (
        <div className={classes.spinner}>
          <CircularProgress />
        </div>
      ));
    
      if (error) {
        Confirmation = () => (
          <>
            <Typography variant="h5">Error: {error}</Typography>
            <br />
            <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
          </>
        );
      }

     
const Form = () => activeStep === 0 ? <AddressForm checkoutToken={checkoutToken} next={next} backStep={backStep} /> : <PaymentForm nextStep={nextStep} shippingData={shippingData} checkoutToken={checkoutToken} onCaptureCheckout={onCaptureCheckout} timeout={timeout} />


    return (
        <>
        <div className={classes.toolbar} />
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Typography varient="h4" align="center">Checkout</Typography>
                <Stepper activeStep={activeStep} className={classes.stepper}>
                    {steps.map((step)=>(
                        <Step key={step}>
                            <StepLabel>{step}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
            </Paper>

        </main>
        </>
    )
}


export default Checkout
