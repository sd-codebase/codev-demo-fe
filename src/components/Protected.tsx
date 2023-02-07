import { Button } from 'antd'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Protected = (props: any) => {
    const {Component} = props;
    const navigate = useNavigate();
    const isLoggedIn = true;

    useEffect(() => {
        if(!isLoggedIn) {
            navigate('/login');
        }
    }, []);
  return (
    <Component />
  )
}

export default Protected