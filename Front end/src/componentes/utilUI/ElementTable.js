import React from 'react'
import Table from '@material-ui/core/Table';

import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import {TablePaginationActions,actionsStyles} from './TablePaginationActions'
import {CustomTableCell, styles} from './UtilTable'
import { withStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';


const ElementTable = (props) =>
{
  const { classes } = props;
  const { rows, rowsPerPage, page } = props.state;
  const handleChangePage = (event,page) => {
    props.handleChangePage( page)
  };

  const handleChangeRowsPerPage = event => {
    props.handleChangeRowsPerPage(event)
  };

  return (
    <Paper className={classes.root}>
    <div className={classes.tableWrapper} >
      <Table className={classes.table}>
      <TableHead color='primary'>
      <TableRow>
      {props.headerTittleTable.map(col =>
        (
          <CustomTableCell align="left" key={col}><strong>{col}</strong></CustomTableCell>
        ))
      }
      </TableRow>
    </TableHead>
        {props.rows}
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[10, 15, 25]} colSpan={5} count={rows.length} rowsPerPage={rowsPerPage} page={page}
              SelectProps={{
                native: true,
              }}
              onChangePage={handleChangePage} onChangeRowsPerPage={handleChangeRowsPerPage} ActionsComponent={TablePaginationActionsWrapped}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </div>
    </Paper>
  )
}
ElementTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);

export default (withStyles(styles)(ElementTable))
