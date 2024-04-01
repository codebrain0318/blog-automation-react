/**********************************************************************************************************************
 ***********  This component is common responsive datatable that handles sorting, filtering, pagination
 *********************************************************************************************************************/


import {
    Box,
    InputAdornment,
    TableContainer,
    TextField,
    Table,
    TableCell,
    TableBody,
    TableRow,
    TableHead,
    TableFooter,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    OutlinedInput,
    IconButton,
    Stack,
    SelectChangeEvent,
    Button,
    Modal
} from "@mui/material"
import React, { useEffect, useState } from "react";
import { ArrowBack, ArrowForward, FirstPage, LastPage, Search } from "@mui/icons-material";
import { getDataService, updateDateService } from "../../services/Excel/Excel";
import Spinner from "../Spinner/Spinner";
import { GlobalContext } from "../GlobalContext";
import { AutomationStatusType, BlogGeneralType, BlogType, getInitialBlog } from '../../config/Types';
import { getBlogStatusService, sendBlogService, sendBlogStatus, translateBlogService } from "../../services/Blog";

// Create new type - Order
// type Order = 'asc' | 'desc';

type MyRow = {
    [key: string]: string
}

type MyPageData = {
    pageCount: number,
    data: BlogType[]
}

// Determine the type of attributes of props
const Datatable = () => {
    const globalProps = React.useContext(GlobalContext);
    // const { allColumns, pageData, loadData, handleUpdateTable } = props;
    const [allColumns, setAllcolumns] = React.useState<string[]>([]);
    const [pageData, setPageData] = React.useState<MyPageData>({
        pageCount: 0,
        data: []
    });
    // Set type of array
    const [columns, setColumns] = useState<string[]>([]);
    const [column, setColumn] = useState("title");
    const [search, setSearch] = useState("");
    const [showPage, setShowPage] = useState(5);
    const [page, setPage] = useState(1);
    // const [order, setOrder] = useState<Order>("asc");
    // const [orderColumn, setOrderColumn] = useState("No");
    const [editItem, setEditItem] = React.useState({
        rowNo: "",
        column: ""
    })
    const [editValue, setEditValue] = React.useState("");
    const editInputRef = React.useRef<HTMLInputElement | null>(null);
    const [isLoading, setLoading] = React.useState(false);

    const [open, setOpen] = React.useState(false);
    const [statusId, setStatusId] = React.useState(-1);

    const [blogStatus, setBlogStatus] = React.useState<AutomationStatusType[][]>([]);

    useEffect(() => {
        if (globalProps?.blogs) {
            const columns = Object.keys(globalProps.blogs.blogs[0]);
            // setAllcolumns(columns.filter(column=>(column!=="content")))
            setAllcolumns(columns)
            setPageData({
                data: [],
                pageCount: globalProps.blogs.count
            })
        }
    }, [globalProps?.user])

    useEffect(() => {
        if (globalProps?.blogs) {
            setPageData({
                data: [],
                pageCount: globalProps.blogs.count
            })
        }
    }, [globalProps?.blogs?.count])

    React.useEffect(() => {
        if (globalProps?.blogs?.blogs) {
            const loadBlogStatus = async () => {
                const arr: string[] = [];
                for (let i = 0; i < globalProps!.blogs!.blogs.length; i++) {
                    const blog: BlogGeneralType = globalProps!.blogs!.blogs[i];
                    arr.push(blog["id"].toString());
                }
                console.log(arr);
                const response = await getBlogStatusService(arr);
                if (response) {
                    setBlogStatus(response);
                }
            }
            loadBlogStatus();

        }
    }, [globalProps?.blogs])

    useEffect(() => {
        if (allColumns.length) {
            setColumns(allColumns.filter(column => (column !== "content")));
            // setColumns(["title", "content"])
            // setColumn(allColumns[0])
        }
    }, [allColumns])

    // useEffect(() => {
    //     if (columns.length) {
    //         // setColumn(columns[1]);
    //         setSearch("");
    //         setPage(1);
    //     }
    // }, [columns]);
    // when column, search change

    useEffect(() => {
        // console.log(pageData)
        filterRows();
    }, [search])

    React.useEffect(() => {
        if (globalProps?.user) {
            const loadBlogs = async () => {
                setLoading(true);
                globalProps.setSpinnerMessage("Loading...");
                console.log("is loading...")
                await globalProps.load(page, showPage, search, "post_" + column);
                console.log("is loading done...")
                setLoading(false);
            }
            loadBlogs();
        }
        console.log(search, column)
    }, [page, showPage, search])

    const loadData = async (
        column: string = "",
        search: string = "",
        page: number = 1,
        show_page: number = 5,
        sort_column: string = "No",
        sort_direction: number = 1) => {
        if (column != "xyz") return;
        setLoading(true);
        globalProps?.setSpinnerMessage("Loading...");
        const res = await getDataService(column, search, page, show_page, sort_column, sort_direction);
        setLoading(false);
        if (res && res.count && res.data.length) {
            const _pageData: MyPageData = {
                pageCount: res.count,
                data: res.data.map((row: MyRow) => row.data)
            };
            const _allcols = Object.keys(res.data[0].data);
            _allcols.splice(_allcols.indexOf("No"), 1);
            _allcols.unshift("No")
            if (allColumns.length === 0)
                setAllcolumns(_allcols);
            setPageData(_pageData);
            // console.log(res.data[0])
        }
        //  else {
        //     setPageData({
        //         pageCount: 0,
        //         data: []
        //     })
        // }
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleStatus = (id: number) => {
        setStatusId(id);
        setOpen(true)
    }

    const handleUpdateTable = async (rowNo: string, column: string, value: string) => {
        if (isLoading) return;
        setLoading(true);
        const response = await updateDateService(rowNo, column, value);
        setLoading(false);
        if (response) {
            let vData = pageData.data;
            vData = vData.map(data => {
                if (data.id === rowNo) {
                    return {
                        ...data,
                        [column]: value
                    }
                }
                else return data;
            })
            setPageData({
                ...pageData,
                data: vData
            });
        }
    }
    // handle click event of header of table
    // const handleSort = (_column: string) => {
    //     if (orderColumn === _column) {
    //         if (order === "desc")
    //             setOrder("asc");
    //         else {
    //             setOrder("desc");
    //         }
    //     } else {
    //         setOrderColumn(_column);
    //         setOrder("asc");
    //     }
    // };

    // handle double click to edit table
    const handleDoubleClick = async (rowNo: string, column: string, value: string) => {
        setEditItem({
            rowNo: rowNo,
            column: column
        })
        setEditValue(value);

        const tInterval = setInterval(() => {
            if (editInputRef.current) {
                const refElement = editInputRef.current.querySelector('input');
                if (refElement)
                    refElement.focus();
                clearInterval(tInterval)
            }
        }, 100);
    }

    const updateTableCell = () => {
        setEditItem({
            rowNo: "",
            column: ""
        })
        handleUpdateTable(editItem.rowNo, editItem.column, editValue);
    }

    const handleEditValueBlur = () => {
        updateTableCell();
        // Handle focus out event
    };

    const handleEditValueKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            updateTableCell();
        }
    };
    // change page
    const changePage = (_page: number) => {
        const pageCount = Math.ceil(pageData.pageCount / showPage);
        if (_page === 0) _page = 1;
        else if (_page > pageCount) _page = pageCount;
        setPage(_page);
    }
    // handle select event for selecting columns will be displayed
    const handleChangeColumns = (e: SelectChangeEvent<string[]>) => {
        const {
            target: { value },
        } = e;
        setColumns(
            typeof value === 'string' ? value.split(',') : value,
        );
    }
    // handle select event for selecting a column for searching
    const handleChangeColumn = (e: SelectChangeEvent<string>) => {
        setColumn(e.target.value);
    }
    // handle change event for get pattern of searching
    const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }
    // handle select event for get the count of pages that will be displayed in one page
    const handleChangeShowPage = (e: SelectChangeEvent<string>) => {
        setShowPage(parseInt(e.target.value));
        setPage(1);
    }
    // filter rows by columns, search, showPage
    const filterRows = () => {
        loadData(column, search, page, showPage, "xxx", -1);
    }

    const getBlogUrl = (language: string, targetId: string) => {
        console.log(language, targetId);
        const url = globalProps?.languages.find(value => (value.name === language))?.url;
        if (url) {
            return url.replace("wp-json/wp/v2/posts", `?p=${targetId}`);
        }
        return "";
    }

    const handleSend = async (languageName: string) => {
        setOpen(false)
        try {
            const blogGeneral: BlogGeneralType = globalProps!.blogs!.blogs[statusId];
            setLoading(true);
            globalProps?.setSpinnerMessage("Translating...");
            let response = await translateBlogService(blogGeneral, languageName);
            setLoading(false);
            if (response) {
                console.log(response);
                const blog: BlogType = getInitialBlog();
                blog.content = response.content;
                blog.date = blogGeneral.date.toString();
                blog.date_gmt = blogGeneral.date_gmt.toString();
                blog.status = blogGeneral.status.toString();
                blog.title = response.title;
                const language = globalProps!.languages.find(value => (value.name === languageName));
                if (!language) return;
                setLoading(true)
                globalProps?.setSpinnerMessage("Sending...");
                response = await sendBlogService(blog, language);
                setLoading(false)
                if (response) {
                    const targetId = response.id.toString();
                    setLoading(true)
                    globalProps?.setSpinnerMessage("Updating Status...");
                    response = await sendBlogStatus(blogGeneral.id.toString(), languageName, targetId);
                    setLoading(false)
                    if (response) {
                        setBlogStatus(blogStatus.map((blogArr, rowIndex) => (blogArr.map(blogOneStatus => {
                            if (blogOneStatus.language === languageName && rowIndex === statusId) {
                                blogOneStatus.sent = true;
                                blogOneStatus.targetId = targetId;
                            }
                            return blogOneStatus;
                        }))))
                    }
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Box
            key="box">
            {
                isLoading && <Spinner />
            }
            {
                (!isLoading && globalProps?.user) &&
                <>
                    <Box>
                        <Stack justifyContent={"space-between"} direction={{ sm: "row" }}>
                            <FormControl sx={{ m: { sm: 1 }, my: { xs: 1 }, width: { xs: "100%", sm: "200px", md: "300px" } }}>
                                <InputLabel id="datatable-label-select-columns">Columns</InputLabel>
                                <Select
                                    labelId="datatable-label-select-columns"
                                    id="datatable-select-columns"
                                    multiple
                                    value={columns}
                                    onChange={handleChangeColumns}
                                    input={<OutlinedInput label="Columns" />}
                                    renderValue={(selected: string[]) => selected.join(',')}
                                >
                                    {
                                        allColumns.map((column, index) =>
                                            <MenuItem
                                                disabled={index === 0}
                                                sx={{
                                                    fontWeight: columns.indexOf(column) > -1 ? "bold" : "normal"
                                                }}
                                                key={index}
                                                value={column}>
                                                {column}
                                            </MenuItem>
                                        )
                                    }
                                </Select>
                            </FormControl>
                            <Stack direction={{ sm: "row" }}>
                                <FormControl sx={{ m: { sm: 1 }, my: { xs: 1 }, width: { xs: "100%", sm: "200px", md: "300px" } }}>
                                    <InputLabel id="datatable-label-select-search-column">Column</InputLabel>
                                    <Select
                                        labelId="datatable-label-select-search-column"
                                        id="datatable-select-column-search"
                                        value={column}
                                        onChange={handleChangeColumn}
                                        input={<OutlinedInput label="Column" />}
                                    >
                                        {
                                            ["title", "content"].map((column, index) => (
                                                <MenuItem key={index} value={column}>{column}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                                <FormControl sx={{ m: { sm: 1 }, my: { xs: 1 }, width: { xs: "100%", sm: "200px", md: "300px" } }}>
                                    <TextField
                                        id="datatable-search-pattern"
                                        label="Search"
                                        value={search}
                                        onChange={handleChangeSearch}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Search />
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </FormControl>
                            </Stack>
                        </Stack>
                    </Box>
                    <Box
                        sx={{
                            border: "1px solid lightgray",
                            borderRadius: "10px",
                            padding: "10px 5px",
                            m: { sm: 1 },
                            my: { xs: 1 }
                        }}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ cursor: "pointer", userSelect: "none" }}>
                                        {
                                            columns.map((column) => (<TableCell
                                                // onClick={() => handleSort(column)}
                                                key={"head" + column}>
                                                {/* <TableSortLabel
                                            active={orderColumn === column}
                                            direction={order}
                                        > */}
                                                {column}
                                                {/* </TableSortLabel> */}
                                            </TableCell>))
                                        }
                                        <TableCell>
                                            Action
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        !isLoading &&
                                        globalProps?.blogs?.blogs
                                            .map((row, rowIndex) => {
                                                return (
                                                    <TableRow key={"row" + rowIndex}>
                                                        {
                                                            columns.map((column, colIndex) => {
                                                                const cell = row[column];
                                                                return cell && <TableCell
                                                                    onDoubleClick={() => handleDoubleClick("xyzi", column, cell.toString())}
                                                                    key={"td" + colIndex + " " + rowIndex + cell}
                                                                // sx={{ userSelect: "none", cursor: "text" }}
                                                                >
                                                                    {
                                                                        (editItem.rowNo === row["No"] && editItem.column === column && columns[colIndex] !== "No") ?
                                                                            <TextField
                                                                                ref={editInputRef}
                                                                                size="small"
                                                                                value={editValue}
                                                                                onBlur={handleEditValueBlur}
                                                                                onKeyDown={handleEditValueKeyDown}
                                                                                onChange={(e) => setEditValue(e.target.value)}
                                                                                key={"edit" + colIndex + " " + rowIndex} /> :
                                                                            cell
                                                                    }
                                                                </TableCell>
                                                            })
                                                        }
                                                        <TableCell>
                                                            <Button
                                                                onClick={() => handleStatus(rowIndex)}
                                                            >
                                                                Status<br />
                                                                ({blogStatus[rowIndex]?.filter(value => (value.sent === true)).length} /
                                                                {blogStatus[rowIndex]?.length})
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })
                                    }
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        {
                                            columns.map(column => (<TableCell key={"foot" + column}>{column}</TableCell>))
                                        }
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </TableContainer>
                    </Box>
                    <Box sx={{ m: { sm: 1 }, my: { xs: 1 } }}>
                        <Stack direction={{ sm: "column", md: "row" }} justifyContent={"space-between"} alignItems={"center"}>
                            <Box>
                                <Stack direction={"row"} spacing={1}>
                                    <IconButton
                                        onClick={() => changePage(1)}
                                        color="primary"
                                        disabled={page === 1}
                                        aria-label="add an alarm">
                                        <FirstPage />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => changePage(page - 1)}
                                        color="primary"
                                        disabled={page === 1}
                                        aria-label="add an alarm">
                                        <ArrowBack />
                                    </IconButton>
                                    <Box sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        color: "rgb(25,118,220)",
                                        fontSize: "1.3rem"
                                    }}>
                                        {page} / {Math.ceil(pageData.pageCount / showPage)}
                                    </Box>
                                    <IconButton
                                        onClick={() => changePage(page + 1)}
                                        disabled={page >= pageData.pageCount}
                                        color="primary"
                                        aria-label="add an alarm">
                                        <ArrowForward />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => changePage(1000000)}
                                        disabled={page >= pageData.pageCount}
                                        color="primary"
                                        aria-label="add an alarm">
                                        <LastPage />
                                    </IconButton>
                                </Stack>
                            </Box>
                            {/* <Box sx={{
                        backgroundColor: "coral",
                        borderRadius: "5px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "5px",
                        m: { sm: 1 },
                        my: { xs: 1 }
                    }}>
                        <Info />
                        Hint: Double click any cell to edit it.
                    </Box> */}
                            <Box>
                                <FormControl size="small">
                                    <Select
                                        labelId="datatable-select-show-rows-label"
                                        id="datatable-select-show-rows"
                                        value={"" + showPage}
                                        onChange={handleChangeShowPage}
                                    >
                                        <MenuItem key="5" value="5">Show 5</MenuItem>
                                        <MenuItem key="10" value="10">Show 10</MenuItem>
                                        <MenuItem key="25" value="25">Show 25</MenuItem>
                                        <MenuItem key="50" value="50">Show 50</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Stack>
                    </Box>
                    <Modal
                        open={open}
                        onClose={handleClose}
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                width: 400,
                                backgroundColor: "#fff",
                                border: '2px solid #000',
                                padding: "2rem",
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)'
                            }}>
                            <h2 id="simple-modal-title">View automation status</h2>
                            {
                                (statusId >= 0) &&
                                blogStatus[statusId].map((data, index) => {
                                    return (
                                        <Box key={"status" + index} >
                                            <Stack direction={"row"} spacing={2} alignItems={"center"}>
                                                <p>{data.language}</p>
                                                {
                                                    data.sent &&
                                                    <a
                                                        href={getBlogUrl(data.language, data.targetId)}
                                                        target="blank"
                                                    >view</a>
                                                }
                                                {
                                                    !data.sent &&
                                                    <Button
                                                        onClick={() => handleSend(data.language)}
                                                    >Send</Button>
                                                }
                                            </Stack>
                                        </Box>
                                    )
                                })
                            }
                        </Box>
                    </Modal>
                </>
            }
        </Box>

    )
}
export default Datatable;