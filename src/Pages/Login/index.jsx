import { Row, Col, Input, Typography, message, Button, Form } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"
import axios from "axios";

const { Title } = Typography;

function App() {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const [users, setUsers] = useState([])

    const handleLogin = async (values) => {
        const { email, password } = values;

        try {
            // Sorry for this absurdity, as I didn't had much time and the mock Api that I used didn't provide with proper auth I did this. It is just a simulation ofc not real.
            if (users.filter(user => user?.email == email && user?.password == password)?.length > 0) {
                navigate('/education');
            }
        } catch (error) {   
            console.error('Login error:', error);
            message.error('Daxil Olmaq Alınmadı, email yadaki parol səhvdir!');
        }
    };

    useEffect(() => {
        axios.get("https://668be99a0b61b8d23b0baf7e.mockapi.io/api/education/Users").then((res) => {
            setUsers(res?.data)
        }).catch((error) => {
            console.error(error)
        })
    }, [])

    return (
        <div
            style={{
                height: "100vh",
                backgroundColor: "rgb(250, 250, 250)"
            }}
        >
            <Row
                justify="center"
                align="middle"
                style={{ height: "100%" }}
            >
                <Col
                    span={10}
                    style={{ height: "100%", backgroundColor: "#FFFFFF" }}
                >
                    <div
                        style={{ padding: "30% 25%", textAlign: "center" }}
                    >
                        <Title level={4}>
                            Hesaba daxil olun
                        </Title>
                        <Form
                            form={form}
                            onFinish={handleLogin}
                            layout="vertical"
                        >
                            <Form.Item
                                label="E-mail"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Emaili Daxil Edin!',
                                    },
                                ]}
                            >
                                <Input placeholder="Email" />
                            </Form.Item>
                            <Form.Item
                                label="Şifrə"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Parolu Daxil Edin!',
                                    },
                                ]}
                            >
                                <Input.Password placeholder="Password" />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={{ backgroundColor: "limegreen", width: "100%", fontSize: "16px", height: "40px", marginTop: "50px" }}>
                                    Daxil ol
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default App;
