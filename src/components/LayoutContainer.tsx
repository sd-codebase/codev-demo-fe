import { Button, Layout, Space } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { API } from "../constants/api.constants";
import { IUserState } from "../models/user.model";
import { setAuth } from "../redux/actions";
const { Header, Content } = Layout;

const LayoutContainer = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const auth = useSelector((state: IUserState) => state.auth);
  const dispach = useDispatch();

  useEffect(() => {
    setIsLoggedIn(auth?.isAuthenticated)
}, [auth]);

  const commonStyle: React.CSSProperties = {
    background: '#fff',
    padding: '0 3rem',
  };

  const handleLogOut = async () => {
    await logOutUser(auth.token);
    dispach(dispach(setAuth({isAuthenticated: false, token: '', fullname: '', email: ''})));
    navigate('/sign-in');
  }

  async function logOutUser(token: string) {
    const result = await fetch(`${API.HOST}/logout?token=${token}`, {method: 'DELETE'});
    const {data} = await result.json();
    return data;
}
  return (
    <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
        <Layout>
            <Header style={commonStyle}>
              <Space wrap>
                <Button>
                  <Link to="/about-us">
                    About Us
                  </Link>
                </Button>
                {
                  isLoggedIn ? (
                    <>
                      <Button>
                        <Link to="/profile">
                          Profile
                        </Link>
                      </Button>
                      <Button onClick={handleLogOut}>
                        Sign out
                      </Button>
                    </>
                  ) : (
                    <Button>
                      <Link to="/sign-in">
                        Sign In
                      </Link>
                    </Button>
                  )
                }
                
                
              </Space>
            </Header>
            <Content style={commonStyle}>
              <Outlet />
            </Content>
        </Layout>
    </Space>
  )
}

export default LayoutContainer