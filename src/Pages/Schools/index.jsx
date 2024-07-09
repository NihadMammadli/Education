import axios from "axios";
import { Table, Tag, Button } from "antd";
import { useEffect, useRef, useState } from "react"
import { DeleteOutlined } from "@ant-design/icons";
import { ColumnHeader, ConfirmModal, FilterDrawer } from "../../Components";

function App() {
    // Initials
    const dataParams = useRef({
    });

    // Filter
    const [field, setField] = useState(false)
    const [filterOpen, setFilterOpen] = useState(false)
    const [filterData, setFilterData] = useState([])

    const fieldValues = (field) => {
        return schools.map(item => ({
            name: item[field],
            key: item[field]
        }));
    };

    const handleFilter = (field) => {
        setFilterData(fieldValues(field))
        setFilterOpen(true)
        setField(field)
    }

    const closeFilter = () => {
        setFilterOpen(false)
    }

    const clearFilter = () => {
        dataParams.current = {}

        getTableData()
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
        axios.get("https://668be99a0b61b8d23b0baf7e.mockapi.io/api/education/schools", {
            params: dataParams.current
        }
        ).then((res) => {
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
            title: <ColumnHeader header='Name' onFilter={() => handleFilter('name')} />,
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: <ColumnHeader header='School Level' onFilter={() => handleFilter('level')} />,
            dataIndex: 'level',
            key: 'level',
        },
        {
            title: <ColumnHeader header='Pricipal' onFilter={() => handleFilter('principal')} />,
            dataIndex: 'principal',
            key: 'principal',
        },
        {
            title: <ColumnHeader header='District' onFilter={() => handleFilter('district')} />,
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
            <Button onClick={() => clearFilter()}>
                Clear Filters
            </Button>

            <Table dataSource={schools} columns={columns} rowKey="id" />

            <ConfirmModal open={confirmOpen} close={closeDelete} deleteFunction={confirmDelete} id={deletingID} />

            <FilterDrawer
                field={field}
                open={filterOpen}
                setField={setField}
                close={closeFilter}
                form={"schools"}
                dataParams={dataParams}
                filterData={filterData}
                getTableData={getTableData}
            />
        </>
    );
}

export default App;
