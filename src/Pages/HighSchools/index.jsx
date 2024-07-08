import { Table, Tag } from "antd";
import { useEffect, useState } from "react"
import axios from "axios";
import { ColumnHeader } from "../../Components";

function App() {
    const [universities, setUniversities] = useState([])

    const handleFilter = () => {
        console.log("a")
    }

    const columns = [
        {
            title: <ColumnHeader header='Name' onFilter={handleFilter} />,
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: <ColumnHeader header='Location' onFilter={handleFilter} />,
            dataIndex: 'location',
            key: 'location',
        },
        {
            title: <ColumnHeader header='Students Enrolled' onFilter={handleFilter} />,
            dataIndex: 'students_enrolled',
            key: 'students_enrolled',
        },
        {
            title: <ColumnHeader header='Programs Offered' onFilter={handleFilter} />,
            dataIndex: 'type',
            key: 'type',
            render: (_, { type }) => (
                <>
                    {type?.map((tip) => {
                        let color = tip.length > 6 ? 'red' : 'blue';
                        return (
                            <Tag color={color} key={tip}>
                                {tip}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
    ];

    useEffect(() => {
        axios.get("https://668be99a0b61b8d23b0baf7e.mockapi.io/api/education/high_schools").then((res) => {
            setUniversities(res?.data)
        }).catch((error) => {
            console.error(error)
        })
    }, [])

    return (
        <>
            <Table dataSource={universities} columns={columns} />
        </>
    );
}

export default App;
