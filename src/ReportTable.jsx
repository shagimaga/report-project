import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';






export default function BasicTable({ data }) {

  return (
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="report table">
        <TableHead>
          <TableRow>
            {Object.keys(data[0]||{'Данные отсутствуют': 400}).map(row => (
              <TableCell key={row} align='center'>{row}</TableCell>  
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row['Номер партии']}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            {Object.keys(row).map(item => (<TableCell align="center">{row[item]}</TableCell>))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
    
  );
}