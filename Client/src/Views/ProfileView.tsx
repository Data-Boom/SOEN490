import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { ICompleteDatasetEntity, exampleDatasets } from '../Models/Datasets/ICompleteDatasetEntity'
import { graphRoute } from '../Consts/Routes';
import DataboomTestGraph from './DataboomTestGraph.png';

let foundDatasets = exampleDatasets;


const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});


function createData(id: number, title: string, name: string, oxidizer: string, author: string, year: string, graphdatasets, comments: string) {
    return { id, title, name, oxidizer, author, year, graphdatasets, comments };
};

const rows = [];

for (let i = 0; i < exampleDatasets.length; i++) {
    rows.push(createData(exampleDatasets[i].id, 'Dataset', exampleDatasets[i].name, exampleDatasets[i].oxidizer, exampleDatasets[i].author,
        exampleDatasets[i].year, ['Cell width', 'Cell Height of O2 explosion', 'Critical energy after N2 intake'], 'Here is a sample comment'))
};

function createGraphData(id: number, title: string, name: string, graphdatasets, comments: string) {
    return { id, title, name, graphdatasets, comments };
};

rows.push(createGraphData(1, 'Graph', 'graph name', ['Cell width', 'Cell Height of O2 explosion', 'Critical energy after N2 intake'],
    'Here is a sample comment'));

// const handleCellClick = (e) => {
//     console.log(e.target.textContent);
// }
const handleCellClick = (id) => {

    return (event) => {
        console.log('You clicked on a row with id ' + id);
    }
    // fetch("../Consts/Routes")
    //     .then(function (response) {
    //         console.log("it worked.", response)
    //         this.props.history.push({
    //             pathname: graphRoute
    //         });
    //     }).catch(function () {
    //         console.log("error in routing");
    //     });

}

function Row(props: { row: ReturnType<typeof createData> }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row" onClick={handleCellClick(row.id)} >
                    {row.name}
                </TableCell>
                <TableCell align="right">{row.title}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Details
                </Typography>
                            <div>
                                {row.title === "Dataset" ? (
                                    <Table size="small" aria-label="purchases">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Oxidizer</TableCell>
                                                <TableCell>Author</TableCell>
                                                <TableCell>Year</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow >
                                                <TableCell component="th" scope="row">
                                                    {row.oxidizer}
                                                </TableCell>
                                                <TableCell>{row.author}</TableCell>
                                                <TableCell>{row.year}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                ) : (
                                        <Table size="small" aria-label="purchases">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Graph image</TableCell>
                                                    <TableCell>Datasets in graph</TableCell>
                                                    <TableCell>Comments</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow >
                                                    <TableCell component="th" scope="row">
                                                        <img src={DataboomTestGraph} width="300" height="300" />
                                                    </TableCell>
                                                    <TableCell>{row.graphdatasets}</TableCell>
                                                    <TableCell>{row.comments}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    )}
                            </div>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function CollapsibleTable() {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>Favourites
                    <TableRow>
                        <TableCell />
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Title</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <Row key={row.title} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
