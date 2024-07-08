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
        axios.delete(`https://668be99a0b61b8d23b0baf7e.mockapi.io/api/education/schools/${id}`).then((res) => {
            setConfirmOpen(false)
            setDeletingID(0)
            getTableData()
        }).catch((error) => {
            console.error(error)
        })
    }

    // Get Data
    const [schools, setSchools] = useState([])

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

    // Columns
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

    return (
        <>
            <Table dataSource={schools} columns={columns} />

            <ConfirmModal open={confirmOpen} close={closeDelete} deleteFunction={confirmDelete} id={deletingID} />

            <FilterDrawer open={filterOpen} close={closeFilter} />
        </>
    );
}

export default App;
