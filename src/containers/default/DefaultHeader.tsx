import { Button, Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import {deleteLocalStorage, getLocalStorage} from "../../utils/storage/localStorageUtils.ts";
import {isAdmin} from "../../utils/storage/isAdmin.ts";
import {isTokenActive} from "../../utils/storage/isTokenActive.ts";

const { Header } = Layout;

const items1 = ['Home', 'Add'].map((key) => ({
    key,
    label: `${key}`,
    link: key.toLowerCase(), // Add a link property based on the item key
}));  // створюється масив з об'єктами посилань для меню 


const ButtonStyle = {
    margin: '0 10px 0 0',
};
const DefaultHeader = () => {
    const location = useLocation(); // хук щоб переміщуватись по сторінках


    return (
        <Header style={{ display: 'flex', alignItems: 'center' }}>
            <div className="demo-logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                selectedKeys={[location.pathname.substr(1)]} // Highlight the selected menu item
                style={{ flex: 1, minWidth: 0 }}
            >
                {items1.map((item) => (
                    <Menu.Item key={item.link}>
                        <Link to={`/${item.link}`}>{item.label}</Link>
                    </Menu.Item>
                ))}
                {!isAdmin(getLocalStorage('authToken')) ? "" : <Menu.Item>
                    <Link to={`/admin`}>Admin Panel</Link>
                </Menu.Item>
                }

            </Menu>

            <>
                {!isTokenActive(getLocalStorage('authToken')) ? "" : <Button style={ButtonStyle} onClick={()=>{
                    deleteLocalStorage('authToken')
                    window.location.reload();
                }}>
                    Exit
                </Button>
                }
                <Link to={"account/login"}>
                    <Button style={ButtonStyle}>
                        Sign-In
                    </Button>
                </Link>
                <Link to={"account/register"}>
                    <Button>Register</Button>
                </Link>
            </>

        </Header>
    );
};

export default DefaultHeader;