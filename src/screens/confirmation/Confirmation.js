import React, { Component } from 'react';
import Header from '../../common/header/Header';
import './Confirmation.css';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import green from '@material-ui/core/colors/green';
import { Link } from 'react-router-dom';


const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
  success: {
    color: green[600],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  }
});


class Confirmation extends Component {
  constructor()
  {
    super();
    this.state = {
      open: false
    }
  }

  handleArtistClick = (url) =>
  {
    window.location = url;
  }



  handleConfirmBooking = () =>
  {
    this.setState({ open: true });
  }

  handleClose = () =>
  {
    this.props.history.push("/");
  }


  render() {
    const { classes } = this.props;

    return(
      <div className="Details">
        <Header />
        <div className="confirmation marginTop16">
            <div>
              <Link to={"/bookshow/" +this.props.match.params.id}><Typography className="back" >
                  &#60; Back to Book Show
              </Typography></Link><br/>
              <Card className="cardStyle">
                <CardContent>
                  <Typography  variant="headline" component="h2">
                   SUMMARY
                  </Typography><br/>

                    <div className="coupon-container"><div className="confirmLeft"><Typography>Location:</Typography></div>
                    <div><Typography> {this.props.location.bookingSummary.location}</Typography></div></div>
                  <br/>

                    <div className="coupon-container"><div className="confirmLeft"><Typography>Language:</Typography></div>
                    <div><Typography> {this.props.location.bookingSummary.language}</Typography></div></div>
                  <br/>

                    <div className="coupon-container"><div className="confirmLeft"><Typography>Show Date:</Typography> </div>
                    <div><Typography> {this.props.location.bookingSummary.showDate}</Typography></div></div>
                  <br/>

                    <div className="coupon-container"><div className="confirmLeft"><Typography>Show Time:</Typography></div>
                    <div><Typography>  {this.props.location.bookingSummary.showTime}</Typography></div></div>
                  <br/>

                    <div className="coupon-container"><div className="confirmLeft"><Typography>Tickets:</Typography> </div>
                    <div><Typography> {this.props.location.bookingSummary.tickets}</Typography></div></div>
                  <br/>

                    <div className="coupon-container"><div className="confirmLeft"><Typography>Unit Price:</Typography> </div>
                    <div><Typography> {this.props.location.bookingSummary.unitPrice}</Typography></div></div>
                  <br/>
                  <div className="coupon-container">
                    <div>
                      <FormControl className="formControl">
                        <InputLabel htmlFor="coupon">  <Typography>
                            Coupon Code
                          </Typography></InputLabel>
                        <Input id="coupon" />
                      </FormControl>
                    </div>
                    <div className="marginApply">
                      <Button variant="contained" onClick={this.handleCouponApplyClick}  color="primary">
                        Apply
                      </Button>
                    </div>
                  </div>
                  <br/><br/>

                    <div className="coupon-container"><div className="confirmLeft"> <span className="bold">Total Price:</span></div>
                    <div>  {this.props.location.bookingSummary.unitPrice * this.props.location.bookingSummary.tickets}</div></div>
                   <br/>
                  <Button variant="contained" onClick={this.handleConfirmBooking}  color="primary">
                    Confirm Booking
                  </Button>
                </CardContent>
              </Card>
            </div>
        </div>
        <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            className="snackbar"
            open={this.state.open}
            onClose={this.handleClose}
            message={
              <span id="client-snackbar" className={classes.success}>
                <div className="confirm"><div><CheckCircleIcon /></div><div className="msg"> Booking Confirmed!</div></div>
              </span>
            }
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={this.handleClose}
              >
               <CloseIcon />
              </IconButton>,
            ]}
          />
      </div>

    )}
}

Confirmation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Confirmation);
