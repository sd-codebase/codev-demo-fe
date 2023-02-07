import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Protected = ({Component}: IProtectedProps) => {
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

interface IProtectedProps {
  Component: React.FC
}