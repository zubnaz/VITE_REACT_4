import {Avatar, Button, Layout, Menu} from 'antd';
import {useLocation, useNavigate} from 'react-router-dom';
import ButtonGroup from "antd/es/button/button-group";
import {PoweroffOutlined} from "@ant-design/icons";

import {logout} from "../../store/accounts/accounts.slice.ts";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {APP_ENV} from "../../env";


const {Header} = Layout;

const AdminHeader = () => {
    const location = useLocation();

    const navigator = useNavigate();

    const dispatch = useAppDispatch();

    const {user} = useAppSelector(state => state.account);

    const handleLogout = () => {
        //console.log("Logout user");
        dispatch(logout());
        navigator("/");
    };

    return (
        <Header style={{display: 'flex', alignItems: 'center'}}>
            <div className="demo-logo"/>
            <Menu
                theme="dark"
                mode="horizontal"
                selectedKeys={[location.pathname.substr(1)]} // Highlight the selected menu item
                style={{flex: 1, minWidth: 0}}
            >
                <Menu.Item key={"products"}>
                    {/*<Link to={`/product`}>Продукти</Link>*/}
                </Menu.Item>
            </Menu>

            <ButtonGroup size="large">
                <Button
                    type="primary"
                    onClick={() =>{navigator('/')}}
                >На головне вікно</Button>
                <Button
                    type="primary"
                    style={{display: 'flex'}}
                    icon={<Avatar  size="small" src={`${APP_ENV.BASE_URL}images/${user?.name}`}/>}
                >
                    {user?.email}
                </Button>
                <Button
                    type="primary"
                    icon={<PoweroffOutlined/>}
                    onClick={() => handleLogout()}
                />
            </ButtonGroup>

        </Header>
    );
};

export default AdminHeader;