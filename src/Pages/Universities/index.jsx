import axios from "axios";
import View from "./View"
import { Table, Tag, Button } from "antd";
import { useEffect, useRef, useState } from "react";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
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
        return universities.map(item => ({
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

    // View
    const [viewData, setViewData] = useState([])
    const [viewOpen, setViewOpen] = useState(false)

    const handleCorpus = (corpus) => {
        setViewOpen(true)
        setViewData(corpus)
    }

    const closeView = () => {
        setViewOpen(false)
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
        axios.delete(`https://668be99a0b61b8d23b0baf7e.mockapi.io/api/education/universities/${id}`).then((res) => {
            setConfirmOpen(false)
            setDeletingID(0)
            getTableData()
        }).catch((error) => {
            console.error(error)
        })
    }

    // Get Data
    const [universities, setUniversities] = useState([])

    const getTableData = () => {
        axios.get("https://668be99a0b61b8d23b0baf7e.mockapi.io/api/education/universities", {
            params: dataParams.current
        }).then((res) => {
            setUniversities(res?.data)
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
            title: <ColumnHeader header='Creation Date' onFilter={() => handleFilter('creation_date')} />,
            dataIndex: 'creation_date',
            key: 'creation_date',
        },
        {
            title: <ColumnHeader header='Number of Faculties' onFilter={() => handleFilter('faculty_number')} />,
            dataIndex: 'faculty_number',
            key: 'faculty_number',
        },
        {
            title: <ColumnHeader header='Global Ranking' onFilter={() => handleFilter('global_ranking')} />,
            dataIndex: 'global_ranking',
            key: 'global_ranking',
        },

        // Because of the mock API that I am using it is kinda hard to implement some functionalities
        {
            title: <ColumnHeader header='Programs Offered' />,
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

    return (
        <>
            <Button onClick={() => clearFilter()}>
                Clear Filters
            </Button>

            <Table dataSource={universities} columns={columns} rowKey="id" />

            <View open={viewOpen} close={closeView} data={viewData} />

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
