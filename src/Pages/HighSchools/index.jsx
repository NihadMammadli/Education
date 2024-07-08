import axios from "axios";
import { Table, Tag } from "antd";
import { useEffect, useState } from "react"
import { DeleteOutlined } from "@ant-design/icons";
import { ColumnHeader, ConfirmModal, FilterDrawer } from "../../Components";


function App() {
    // Filter
    const [filterOpen, setFilterOpen] = useState(false)

    const handleFilter = () => {
        setFilterOpen(true)
    }

    const closeFilter = () => {
        setFilterOpen(false)
    }

    // Delete
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [deletingID, setDeletingID] = useState()

    const handleDelete = (id) => {
        setDeletingID(id)
        setConfirmOpen(true)
    }

    const closeDelete = () => {
        setDeletingID(0)
        setConfirmOpen(false)
    }

    const confirmDelete = (id) => {
        axios.delete(`https://668be99a0b61b8d23b0baf7e.mockapi.io/api/education/high_schools/${id}`).then((res) => {
            setConfirmOpen(false)
            setDeletingID(0)
            getTableData()
        }).catch((error) => {
            console.error(error)
        })
    }

    // Get Data
    const [highSchools, setHighSchools] = useState([])

    const getTableData = () => {
        axios.get("https://668be99a0b61b8d23b0baf7e.mockapi.io/api/education/high_schools").then((res) => {
            setHighSchools(res?.data)
        }).catch((error) => {
            console.error(error)
        })
    }

    useEffect(() => {
        getTableData()
    }, [])

    // Columns
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
        // Because of the mock API that I am using it is kinda hard to implement some functionalities
        {
            title: <ColumnHeader header='Type of School' onFilter={handleFilter} />,
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
        {
            title: "Delete",
            render: (obj) => (
                <>
                    <DeleteOutlined onClick={() => handleDelete(obj?.id)} />
                </>
            )
        }
    ];

    return (
        <>
            <Table dataSource={highSchools} columns={columns} />

            <ConfirmModal open={confirmOpen} close={closeDelete} deleteFunction={confirmDelete} id={deletingID} />

            <FilterDrawer open={filterOpen} close={closeFilter} />
        </>
    );
}

export default App;
