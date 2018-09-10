import React, { Component } from 'react';
import './Header.css';
import Button from '@material-ui/core/Button';
import logo from '../../assets/logo.svg';
import Modal from 'react-modal';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import PropTypes from 'prop-types';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Link } from 'react-router-dom';



const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
}

const TabContainer = function (props) {
    return (
        <Typography component="div" style={{ padding: 0, textAlign: 'center' }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired
}

class Header extends Component {

    constructor() {
        super();
        this.state = {
            modalIsOpen: false,
            value: 0,
            username: "",
            usernameRequired: "dispNone",
            password: "",
            passwordRequired: "dispNone",
            email: "",
            firstname: "",
            lastname: "",
            mobile: "",
            passwordReg: "",
            emailRequired: "dispNone",
            firstnameRequired: "dispNone",
            lastnameRequired: "dispNone",
            mobileRequired: "dispNone",
            passwordRegRequired: "dispNone",
            registrationSuccess: false,
            regMessage: "Registration Successful. Please Login!",
        };
    }

    openModalHandler = () => {
        this.setState({ modalIsOpen: true })
    }

    closeModalHandler = () => {
        this.setState({ modalIsOpen: false })
    }
    tabChangeHandler = (event, value) => {
        this.setState({ value });
    }

    loginClickHandler = () => {
        this.state.username === "" ? this.setState({ usernameRequired: "dispBlock" }) : this.setState({ usernameRequired: "dispNone" });
        this.state.password === "" ? this.setState({ passwordRequired: "dispBlock" }) : this.setState({ passwordRequired: "dispNone" });

    }
    inputUsernameChangeHandler = (e) => {
        this.setState({ username: e.target.value })
    }

    inputPasswordChangeHandler = (e) => {
        this.setState({ password: e.target.value })
    }

    render() {
        return (
            <div>
                <header className="app-header">
                    <img src={logo} className="app-logo" alt="logo" />
                    <div className="login-button">
                        <Button variant="contained" color="default" onClick={this.openModalHandler}>Login</Button>
                    </div>
                    {this.props.showBookShowButton === "true" ?
                    <div className="bookshow-button">
                        <Link to={"/bookshow/" +this.props.id}><Button variant="contained" color="primary">
                        BOOK SHOW</Button></Link>
                    </div>: ""}
                </header>
                <Modal
                    ariaHideApp={false}
                    isOpen={this.state.modalIsOpen}
                    contentLabel="Login"
                    onRequestClose={this.closeModalHandler}
                    style={customStyles}
                >
                    <Tabs className="tabs" value={this.state.value} onChange={this.tabChangeHandler}>
                        <Tab label="Login" />
                        <Tab label="Register" />
                    </Tabs>
                    {this.state.value === 0 &&
                        <TabContainer>
                            <FormControl required>
                                <InputLabel htmlFor="username"> Username </InputLabel>
                                <Input id="username" type="text" username={this.state.username} onChange={this.inputUsernameChangeHandler} />
                                <FormHelperText className={this.state.usernameRequired}><span className="red">required</span></FormHelperText>
                            </FormControl><br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="password"> Password </InputLabel>
                                <Input id="password" type="password" onChange={this.inputPasswordChangeHandler} />
                                <FormHelperText className={this.state.passwordRequired}><span className="red">required</span></FormHelperText>
                            </FormControl><br /><br />
                            <Button variant="contained" color="primary" onClick={this.loginClickHandler}>LOGIN</Button>
                        </TabContainer>}
                        {this.state.value === 1 && <TabContainer>
                        <FormControl required>
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <Input id="email" type="email" onChange={this.inputEmailChangeHandler} />
                            <FormHelperText className={this.state.emailRequired}><span className="red">required</span></FormHelperText>
                        </FormControl><br /><br />
                        <FormControl required>
                            <InputLabel htmlFor="firstname">First Name</InputLabel>
                            <Input id="firstname" onChange={this.inputFirstnameChangeHandler} />
                            <FormHelperText className={this.state.firstnameRequired}><span className="red">required</span></FormHelperText>
                        </FormControl><br /><br />
                        <FormControl required>
                            <InputLabel htmlFor="lastname">Last Name</InputLabel>
                            <Input id="lastname" onChange={this.inputLastnameChangeHandler} />
                            <FormHelperText className={this.state.lastnameRequired}><span className="red">required</span></FormHelperText>
                        </FormControl><br /><br />
                        <FormControl required>
                            <InputLabel htmlFor="mobile">Mobile Number</InputLabel>
                            <Input id="mobile" onChange={this.inputMobileChangeHandler} />
                            <FormHelperText className={this.state.mobileRequired}><span className="red">required</span></FormHelperText>
                        </FormControl><br /><br />
                        <FormControl required aria-describedby="name-helper-text">
                            <InputLabel htmlFor="passwordReg">Password</InputLabel>
                            <Input type="password" id="passwordReg" onChange={this.inputPasswordRegChangeHandler} />
                            <FormHelperText className={this.state.passwordRegRequired}><span className="red">required</span></FormHelperText>
                        </FormControl><br /><br />
                        {this.state.registrationSuccess === true &&
                            <FormControl>
                                <span className="successText"> {this.state.regMessage}</span>
                            </FormControl>}<br /><br />
                        <Button variant="contained" color="primary" onClick={this.registerClickHandler}>
                            REGISTER
                        </Button>
                    </TabContainer>}



                </Modal>
            </div>
        )
    }
}

export default Header;
