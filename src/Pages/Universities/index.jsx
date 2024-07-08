import axios from "axios";
import View from "./View"
import { Table, Tag } from "antd";
import { useEffect, useState } from "react"
import { ColumnHeader } from "../../Components";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";

function App() {
    const [universities, setUniversities] = useState([])
    const [viewData, setViewData] = useState([])
    const [viewOpen, setViewOpen] = useState(false)

    const handleFilter = () => {
        console.log("a")
    }

    const handleCorpus = (corpus) => {
        setViewOpen(true)
        setViewData(corpus)
    }

    const closeView = () => {
        setViewOpen(false)
    }

    const handleDelete = (id) => {
        axios.delete(`https://668be99a0b61b8d23b0baf7e.mockapi.io/api/education/universities/${id}`).then((res) => {
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

        // Because of the mock API that I am using it is kinda hard to implement some functionalities
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

        // Because of the mock API that I am using it is kinda hard to implement some functionalities
        // Sorry for that
        {
            title: <ColumnHeader header='Corpuses' />,
            dataIndex: 'corpus',
            key: 'corpus',
            render: (_, { corpus }) => (
                <>
                    <EyeOutlined onClick={() => handleCorpus(corpus)} />
                </>
            ),
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
        axios.get("https://668be99a0b61b8d23b0baf7e.mockapi.io/api/education/universities").then((res) => {
            setUniversities(res?.data)
        }).catch((error) => {
            console.error(error)
        })
    }

    useEffect(() => {
        getTableData()
    }, [])

    return (
        <>
            <Table dataSource={universities} columns={columns} />

            <View open={viewOpen} close={closeView} data={viewData} />
        </>
    );
}

export default App;
