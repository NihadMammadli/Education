import { Table, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"
import axios from "axios";


function App() {

    const [universities, setUniversities] = useState([])

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Creation Date',
            dataIndex: 'creation_date',
            key: 'creation_date',
        },
        {
            title: 'Number of Faculties',
            dataIndex: 'faculty_number',
            key: 'faculty_number',
        },
        {
            title: 'Global Ranking',
            dataIndex: 'global_ranking',
            key: 'global_ranking',
        },
        {
            title: 'Programs Offered',
            dataIndex: 'offered_programs',
            key: 'offered_programs',
            render: (_, { offered_programs }) => (
                <>
                    {offered_programs.map((program) => {
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
