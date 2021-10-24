import React, { useState } from 'react';
import axios from 'axios';

// Form control
import { useFormik } from "formik";
import * as Yup from 'yup';

// MUI
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import './senderMUI.scss';

const SenderMUI = () => {
    const [text, setText] = useState({
        button: 'submit',
        alert: ''
    })
    const [buttonStyle, setButtonStyle] = useState({
        width: '65%',
        margin: '15px auto 3vh'
    });
    const [alertStyle, setAlertStyle] = useState({})

    const textFieldStyle = {
        margin: '10px 0',
        backgroundColor: '#fff !important',
        borderRadius: "0"
    };

    const sendMail = () => {  
        let data = {
            'name': formik.values.completeName,
            'email': formik.values.userEmail,
            'message': formik.values.userMessage
        }

        axios.post(`http://localhost:8888/sendmail`, data)
        .then(response => {
            formik.resetForm();
            console.log(response)
        }).catch((error) => {
            console.log(error)
        });
    };

    let SimpleSchema = Yup.object().shape({
        completeName: Yup.string()
        .required("Required*"),
        userEmail: Yup.string()
        .required("Required*")
        .matches(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Invalid Email Address"),
        userMessage: Yup.string()
        .required("Required*")
        .max(500, "Your message exceeds the maximum amount (500)"),
    });
    
    const formik = useFormik({
        initialValues: {
            completeName: '',
            userEmail: '',
            userMessage: '',
        },
        validationSchema: SimpleSchema,
        onSubmit: (values) => {
            sendMail()
        },
    });

    return (
        <div className="mui-wrapper">
            <h1>Simple mail sender</h1>
            <h3 style={alertStyle}>{text.alert}</h3>
            <form 
                className="form-mui-wrapper"
                onSubmit={formik.handleSubmit}
            >
                <TextField 
                    name="completeName"
                    type="text"
                    variant="outlined"

                    value={formik.values.completeName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.completeName && Boolean(formik.errors.completeName)}    
                    label={Boolean(formik.errors.completeName) ? formik.errors.completeName : 'Input your full name'}

                    multiline
                    maxRows={1}

                    style={textFieldStyle}
                    fullWidth={true}
                />
                <TextField 
                    name="userEmail"
                    type="email"
                    variant="outlined"
                    
                    value={formik.values.userEmail}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.userEmail && Boolean(formik.errors.userEmail)}    
                    label={Boolean(formik.errors.userEmail) ? formik.errors.userEmail : 'Input your email'} 

                    multiline
                    maxRows={1}

                    style={textFieldStyle}
                    fullWidth={true}
                />
                <TextField 
                    name="userMessage"
                    type="text"
                    variant="outlined"

                    value={formik.values.userMessage}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.userMessage && Boolean(formik.errors.userMessage)}    
                    label={Boolean(formik.errors.userMessage) ? formik.errors.userMessage : 'Input your message'} 

                    multiline
                    minRows={8}
                    maxRows={16}

                    style={textFieldStyle}
                    fullWidth={true}
                />
                <Button 
                    className="animation-controller"
                    type="submit"
                    variant="contained"
                
                    style={buttonStyle}
                >
                    {text.button}!
                </Button>    
            </form>
        </div>
    );
};

export default SenderMUI;