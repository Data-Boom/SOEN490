import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { ICompleteDatasetEntity, exampleDatasets } from '../Models/Datasets/ICompleteDatasetEntity'


let selectedDatasets: ICompleteDatasetEntity[] = []
let foundDatasets = exampleDatasets;



const useStyles = makeStyles({
    table: {
        minWidth: 650,
        maxWidth: 700,
    },
});

let test = exampleDatasets[0].name;

function createData(title: string, name: string) {
    return { title, name: name };
};

const rows = [];

for (let i = 0; i < exampleDatasets.length; i++) {
    rows.push(createData('Dataset', exampleDatasets[i].name))
};

export default function ProfileView() {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>Favourites
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell align="right">Name</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.title}>
                            <TableCell component="th" scope="row">
                                {row.title}
                            </TableCell>
                            <TableCell align="right">{row.name}</TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}