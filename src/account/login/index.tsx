import {Button, Flex, Form, Input, message, Typography,Spin} from "antd";
import {ILogin} from "../../interfaces/account";
import {useNotification} from "../../hooks/notification";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {Link, useNavigate} from "react-router-dom";
import {unwrapResult} from "@reduxjs/toolkit";
import {login} from "../../store/accounts/accounts.actions.ts";
import {Status} from "../../utils/enums";

const Login : React.FC=()=> {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [messageApi, contextHolder] = message.useMessage();
    const {handleError} = useNotification(messageApi);
    const status = useAppSelector(state => state.account.status);

    const onFinish = async (values: ILogin) => {
        try {
            const response = await dispatch(login(values));
            unwrapResult(response);
            console.log(response);
            navigate('/');
        } catch (error) {
            handleError(error);
        }
    };
    return (<>
        <Spin  tip="Loading" size="large" spinning={status === Status.LOADING}>
        <h1 style={{ marginLeft: 600 }}>Авторизація</h1>
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
        <Form.Item<ILogin>
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item<ILogin>
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
        >
            <Input.Password />
        </Form.Item>

        <Flex style={{columnGap:100,marginLeft:500}}>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Увійти
                </Button>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" onClick={()=>{navigate(-1)}}>
                    Вийти
                </Button>
            </Form.Item>
        </Flex>
        <Form.Item wrapperCol={{span: 24}}>
            <Typography style={{textAlign: 'center',marginLeft:300}}>
                Немає аккаунта? <Link to="/account/register">Створити зараз!</Link>
            </Typography>
        </Form.Item>
    </Form>
        </Spin>
</>);
}
export default Login;