import React from 'react';
import { Table } from 'antd';

const columns = [
    {
      title: 'Réf Commande',
      dataIndex: 'ref',
    },
    {
      title: 'Date',
      dataIndex: 'date',
    },
    {
      title: 'Prix Totale',
      dataIndex: 'ptotale',
    },
    {
      title: 'Payement',
      dataIndex: 'payement',
    },
    {
      title: 'Etat',
      dataIndex: 'etat',
    },
    {
      title: 'Facture',
      dataIndex: 'Facture',
    },
  ];
const HCommande = () => {
  return (
    <>
    <Table columns={columns} className='table' />
    </>
  )
}

export default HCommande