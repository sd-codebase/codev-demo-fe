import React, { useEffect, useState } from 'react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { Avatar, Layout } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import UpdateProfile from '../components/UpdateProfile';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API } from '../constants/api.constants';
import { setAuth } from '../redux/actions';
import { IUserDetails, IUserState } from '../models/user.model';

const { Title } = Typography;
const { Footer, Sider, Content } = Layout;

const Profile = () => {
    useDocumentTitle('Profile');
    const auth = useSelector((state: IUserState) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState({} as IUserDetails);
    const [resultFromModal, setResultFromModal] = useState('');

    useEffect(() => {
        if (!auth || !auth?.isAuthenticated) {
            navigate('/sign-in');
        } else {
            fetchUserProfile(auth.token);
        }
    }, []);

    async function fetchUserProfile(token: string) {
        const userData = await getUserProfile(token);
        dispatch(setAuth({...auth, ...userData}));
        setUser(userData);
    }

    async function getUserProfile(token: string) {
        const result = await fetch(`${API.HOST}/profile?token=${token}`);
        const {data} = await result.json();
        return data;
    }

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
                        <UpdateProfile handleModalClosed={(result: string) => setResultFromModal(result)}/>
                    </Content>
                </Layout>
                <Footer style={commonStyle}>
                    {resultFromModal}
                </Footer>
            </Layout>
        </>
    )
}

export default Profile