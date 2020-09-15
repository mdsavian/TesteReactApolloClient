import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Loading from './Loading';
import { useQuery, gql } from '@apollo/client';

const queryMedicos = gql`
query{
  getMedicos
  {
    id   
    usuario{
      nome
    }
  }
}
`;

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function TabelaMedico() {
  const classes = useStyles();

  const { loading, error, dados } = useQuery(queryMedicos);
console.log(loading, error, dados);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;  
  
  console.log(dados);

  if (!dados?.medicos)
    return (<Loading />);

  console.log("dados = ", dados.medicos);
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="tabela de pacientes">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="right">Nome</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Registro</TableCell>
            <TableCell align="right">Conselho</TableCell>
            <TableCell align="right">Ativo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dados.medicos.map((dado) => (
            <TableRow key={dado.id_medico}>
              <TableCell component="th" scope="row">{dado.id_medico}</TableCell>
              <TableCell align="right">{dado.nome}</TableCell>
              <TableCell align="right">{dado.email}</TableCell>
              <TableCell align="right">{dado.registro}</TableCell>
              <TableCell align="right">{dado.conselho}</TableCell>
              <TableCell align="right">{dado.ativo.toString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}