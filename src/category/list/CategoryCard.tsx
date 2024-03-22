import {Button, Card, Col, Popconfirm, Row, Typography} from "antd";
import Meta from "antd/es/card/Meta";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {Link, Route} from "react-router-dom";
import { ICategoryShow } from "./ICategoryShow.ts";
import './cardStyle.css';
const { Title } = Typography;

interface ICategoryCardProps {
    item: ICategoryShow,
    handleDelete: (id: number) => void
}

const CategoryCard: React.FC<ICategoryCardProps> = (props) => {
    const { item, handleDelete } = props;
    //const { id, name, description, images } = item;
    const { id, name, description,image } = item;
    /*const divStyle = {
        background: "black",
        padding: "30px"
    }*/
    console.log(image);
    return (
        <>
            <Col style={{ padding: 10 }} xxl={6} lg={8} md={12} sm={12}>
                <Card
                    bodyStyle={{ flex: '1', paddingBlock: '10px' }}
                    style={{ height: 350, display: 'flex', flexDirection: 'column', paddingTop: '40px' }}
                    hoverable
                    cover={

                        <img style={{width:70,height:100,margin:"auto"}} src={`/uploading/300_${image}`}/>
                    }
                    actions={[window.location.pathname=="/admin"?
                        <div style={{display:"flex",flexDirection:"row"}}>
                        <Link to={`category/edit/${id}`}>

                            <Button type="primary" icon={<EditOutlined />}>
                                Змінити
                            </Button>
                        </Link>

                        <Popconfirm
                            title="Are you sure to delete this category?"
                            onConfirm={() => handleDelete(id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Link to={`category/delete/${id}`}>
                                <Button icon={<DeleteOutlined />}>
                                    Delete
                                </Button>
                            </Link>
                        </Popconfirm></div>
                        :""]}
                >

                    <Meta
                        title={name}
                        description={
                            <Title level={5} type="success">{description}</Title>
                        }
                    />
                </Card>
            </Col>
        </>
    )
}

export default CategoryCard;
/*<img
                            style={{ height: '120px', objectFit: 'contain' }}
                            alt={name}
                            src={image ? `/uploading/300_${image}` : NotImage}
                        />*/