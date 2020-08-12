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

const queryPaciente = gql`
      query  {
        pacientes {
          nome
          email
          nascimento
          id_paciente
          ativo
        }
      }
    `;

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function TabelaPaciente() {
  const classes = useStyles();

  const dados = useQuery(queryPaciente).data;

  if (!dados)
    return <Loading />;
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="tabela de pacientes">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="right">Nome</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Nascimento</TableCell>
            <TableCell align="right">Ativo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dados.pacientes.map((dado) => (
            <TableRow key={dado.id_paciente}>
              <TableCell component="th" scope="row">{dado.id_paciente}</TableCell>
              <TableCell align="right">{dado.nome}</TableCell>
              <TableCell align="right">{dado.email}</TableCell>
              <TableCell align="right">{dado.nascimento}</TableCell>
              <TableCell align="right">{dado.ativo.toString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}