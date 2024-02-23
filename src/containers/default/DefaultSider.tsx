import { Layout, Menu, MenuProps, theme } from "antd";
import React from "react";
import { LaptopOutlined, NotificationOutlined, UserOutlined } from "@ant-design/icons";
const { Sider } = Layout;

const DefaultSider = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken(); // дістає властивості об'єкта theme

    const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map( //створення елементів меню
        (icon, index) => {
            const key = String(index + 1);

            return {
                key: `sub${key}`,
                icon: React.createElement(icon),
                label: `subnav ${key}`,

                children: new Array(4).fill(null).map((_, j) => { //додаються елементи меню
                    const subKey = index * 4 + j + 1;
                    return {
                        key: subKey,
                        label: `option${subKey}`,

                    };
                }),
            };
        },
    );

    return (
        <Sider style={{ background: colorBgContainer }} width={200}>
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
                items={items2}
            />
        </Sider>
    )
}

export default DefaultSider;