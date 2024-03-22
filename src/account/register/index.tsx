import {Button, Checkbox, Flex, Form, Input, Spin, message} from "antd";
import { useNavigate } from "react-router-dom";
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {useNotification} from '../../hooks/notification';
import { unwrapResult } from "@reduxjs/toolkit";
import { register } from "../../store/accounts/accounts.actions";
import {IRegister} from "../../interfaces/account";
import {Status} from "../../utils/enums";

const Register : React.FC=()=> {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [messageApi, contextHolder] = message.useMessage();
    const { handleError } = useNotification(messageApi);
    const status = useAppSelector(state => state.account.status)
    const onFinish = async (values: IRegister) => {
        try {
            const response = await dispatch(register(values));
            unwrapResult(response);
            navigate('/');
        } catch (error) {
            handleError(error);
        }
    };

    return (<>
        <Spin  tip="Loading" size="large" spinning={status === Status.LOADING}>
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
                name="repeatPassword"
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
            <Flex style={{columnGap:100,marginLeft:500}}>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Зареєструватися
                    </Button>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" onClick={()=>{navigate(-1)}}>
                        Вийти
                    </Button>
                </Form.Item>
            </Flex>

        </Form>
        </Spin>
    </>);
}

export default  Register;
