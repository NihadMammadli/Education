import axios from "axios";
import { Table, Tag } from "antd";
import { useEffect, useState } from "react"
import { ColumnHeader } from "../../Components";
import { DeleteOutlined } from "@ant-design/icons";

function App() {
    const [schools, setSchools] = useState([])

    const handleFilter = () => {
        console.log("a")
    }

    const handleDelete = (id) => {
        axios.delete(`https://668be99a0b61b8d23b0baf7e.mockapi.io/api/education/schools/${id}`).then((res) => {
            getTableData()
        }).catch((error) => {
            console.error(error)
        })
    }

    const columns = [
        {
            title: <ColumnHeader header='Name' onFilter={handleFilter} />,
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: <ColumnHeader header='School Level' onFilter={handleFilter} />,
            dataIndex: 'level',
            key: 'level',
        },
        {
            title: <ColumnHeader header='Pricipal' onFilter={handleFilter} />,
            dataIndex: 'principal',
            key: 'principal',
        },
        {
            title: <ColumnHeader header='District' onFilter={handleFilter} />,
            dataIndex: 'district',
            key: 'district',
        },
        {
            title: "Delete",
            render: (obj) => (
                <>
                    <DeleteOutlined onClick={() => handleDelete(obj?.id)} />
                </>
            )
        }
    ];

    const getTableData = () => {
        axios.get("https://668be99a0b61b8d23b0baf7e.mockapi.io/api/education/schools").then((res) => {
            setSchools(res?.data)
        }).catch((error) => {
            console.error(error)
        })
    }

    useEffect(() => {
        getTableData()
    }, [])

    return (
        <>
            <Table dataSource={schools} columns={columns} />
        </>
    );
}

export default App;
