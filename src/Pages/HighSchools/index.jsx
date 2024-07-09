import axios from "axios";
import { Table, Tag, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
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
        return highSchools.map(item => ({
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
        // It should be in another folder but did not had much time for that.
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
        axios.get("https://668be99a0b61b8d23b0baf7e.mockapi.io/api/education/high_schools", {
            params: dataParams.current
        }).then((res) => {
            setHighSchools(res?.data);
        }).catch((error) => {
            console.error(error);
        });
    };

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
            title: <ColumnHeader header='Location' onFilter={() => handleFilter('location')} />,
            dataIndex: 'location',
            key: 'location',
        },
        {
            title: <ColumnHeader header='Students Enrolled' onFilter={() => handleFilter('students_enrolled')} />,
            dataIndex: 'students_enrolled',
            key: 'students_enrolled',
        },
        // Because of the mock API that I am using it is kinda hard to implement some functionalities
        {
            title: <ColumnHeader header='Type of School' />,
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
            <Button onClick={() => clearFilter()}>
                Clear Filters
            </Button>
            
            <Table dataSource={highSchools} columns={columns} rowKey="id" />

            <ConfirmModal open={confirmOpen} close={closeDelete} deleteFunction={confirmDelete} id={deletingID} />

            <FilterDrawer
                field={field}
                open={filterOpen}
                setField={setField}
                close={closeFilter}
                form={"high_schools"}
                dataParams={dataParams}
                filterData={filterData}
                getTableData={getTableData}
            />
        </>
    );
}

export default App;
