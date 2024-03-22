import { Button, Checkbox, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from '../../hooks/redux';
import { unwrapResult } from "@reduxjs/toolkit";
import { useNotification } from '../../hooks/notification';
import { register } from "../../store/accounts/accounts.actions";
import { IRegister } from "../../interfaces/account";
export default function Register() {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [messageApi, contextHolder] = message.useMessage();
    const { handleError } = useNotification(messageApi);
    const onFinish = async (values: IRegister) => {
        console.log("values", values)
        try {
            const response = await dispatch(register(values));
            unwrapResult(response);
            navigate('/');
        } catch (error) {
            handleError(error);
        }
    };

    return (<>
        <h1 style={{ marginLeft: 600 }}>Реєстрація</h1>
        {contextHolder}
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 1000 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            //onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item<IRegister>
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input your name!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item<IRegister>
                label="Surname"
                name="surname"
                rules={[{ required: true, message: 'Please input your surname!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item<IRegister>
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item<IRegister>
                label="Phone"
                name="phone"
                rules={[{ required: true, message: 'Please input your phone number!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item<IRegister>
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item<IRegister>
                label="Password Repeat"
                name="password_repeat"
                rules={[{ required: true, message: 'Please input your repeat password!' }]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item<IRegister>
                name="admin"
                valuePropName="checked"
                wrapperCol={{ offset: 8, span: 16 }}
            >
                <Checkbox>Is Admin</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    </>);
}

function useAppDispatch() {
    throw new Error("Function not implemented.");
}
