import React, { useEffect } from 'react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from '../redux/actions';
import { ActionTypes } from '../redux/actionTypes';
import { useNavigate } from 'react-router-dom';
import { API } from '../constants/api.constants';

const SignIn = () => {
    useDocumentTitle('Sign In');
    const auth = useSelector((state: any) => state.auth);
    const dispach = useDispatch();
    const navigate = useNavigate();
    const [form] = Form.useForm();

    useEffect(() => {
        if (auth && auth?.isAuthenticated) {
            navigate('/profile');
        }
    }, [auth]);

    const onFinish = async (values: any) => {
        const userData = await signInUser(values);
        if (userData && userData.token) {
            dispach(setAuth({isAuthenticated: true, token: userData.token}))
        }
    };

    async function signInUser(credentials: any) {
        const result = await fetch(`${API.HOST}/login`, 
        {method: 'POST', body: JSON.stringify(credentials), 
            headers: {
                Accept: 'application.json',
                'Content-Type': 'application/json'
            }
        });
        const {data} = await result.json() as any;
        return data;
    }
    
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