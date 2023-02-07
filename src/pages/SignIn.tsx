import React, { useEffect } from 'react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from '../redux/actions';
import { ActionTypes } from '../redux/actionTypes';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    useDocumentTitle('Sign In');
    const {auth} = useSelector((state: any) => state.auth);
    const dispach = useDispatch();
    const navigate = useNavigate();
    const [form] = Form.useForm();

    useEffect(() => {
        if (auth && auth?.payload?.isAuthenticated) {
            navigate('/profile');
        }
    }, [auth]);

    const onFinish = (values: any) => {
        console.log(values);
        dispach(setAuth({type: ActionTypes.SetAuth, payload: {...values, isAuthenticated: true}}))
    };
    
    return (
        <>
            <Form form={form} layout='vertical' onFinish={onFinish}>
                <Form.Item 
                    label="Email Address"
                    help="We'll never share your email anyone else"
                    name="email" >
                    <Input placeholder="Enter email" />
                </Form.Item>
                <Form.Item label="Password" name="password">
                    <Input type="password" placeholder="Password" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default SignIn