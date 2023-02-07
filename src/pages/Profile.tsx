import React, { useEffect, useState } from 'react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { Avatar, Layout, Button, Modal } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import UpdateProfile from '../components/UpdateProfile';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;
const { Footer, Sider, Content } = Layout;

const Profile = () => {
    useDocumentTitle('Profile');
    const {auth} = useSelector((state: any) => state.auth);
    const navigate = useNavigate();
    const [user, setUser] = useState({fullname: 'Alexey Kornilov', email: 'alexey@klaim.ai'});
    const [resultFromModal, setResultFromModal] = useState({result: ''});

    useEffect(() => {
        if (!auth || !auth?.payload?.isAuthenticated) {
            navigate('/sign-in');
        }
    }, []);

    const commonStyle = {
        background: '#fff',
    }
    return (
        <>
            <Layout>
                <Layout>
                    <Sider style={commonStyle}>
                    <Avatar
                        size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                        icon={<AntDesignOutlined />}
                    />
                    </Sider>
                    <Content style={commonStyle}>
                        <Title level={2}>Welcome {user.fullname}</Title>
                        <UpdateProfile handleModalClosed={(result: any) => setResultFromModal(result)}/>
                    </Content>
                </Layout>
                <Footer style={commonStyle}>
                    {resultFromModal.result}
                </Footer>
            </Layout>
        </>
    )
}

export default Profile