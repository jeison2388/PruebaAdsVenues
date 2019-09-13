import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';

/**permite configurar la tabla con su color tamaño de letra y demas */
const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#2196f3',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

export {CustomTableCell, styles}
