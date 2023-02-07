import React from 'react'
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { Typography } from 'antd';

const { Title } = Typography;

const Home = () => {
    useDocumentTitle('Home');
  return (
    <Title level={4}>Little story about the company</Title>
  )
}

export default Home