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
            title: <ColumnHeader header='Creation Date' onFilter={handleFilter} />,
            dataIndex: 'creation_date',
            key: 'creation_date',
        },
        {
            title: <ColumnHeader header='Number of Faculties' onFilter={handleFilter} />,
            dataIndex: 'faculty_number',
            key: 'faculty_number',
        },
        {
            title: <ColumnHeader header='Global Ranking' onFilter={handleFilter} />,
            dataIndex: 'global_ranking',
            key: 'global_ranking',
        },
        {
            title: <ColumnHeader header='Programs Offered' onFilter={handleFilter} />,
            dataIndex: 'offered_programs',
            key: 'offered_programs',
            render: (_, { offered_programs }) => (
                <>
                    {offered_programs?.map((program) => {
                        let color = program.length > 5 ? 'geekblue' : 'green';
                        if (program === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={program}>
                                {program}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
    ];

    useEffect(() => {
        axios.get("https://668be99a0b61b8d23b0baf7e.mockapi.io/api/education/universities").then((res) => {
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
