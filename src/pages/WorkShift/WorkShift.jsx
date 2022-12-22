import React from 'react';
import { Button, Table, Tag } from 'antd';
// import type { ColumnsType } from 'antd/es/table';
import { RentalForm } from '../../components/Form/RentalForm';
import { useSelector } from 'react-redux';

// interface DataType {
//   key: React.Key;
//   name: string;
//   numberDoc: string;
//   numberPhone: string;
//   description: string;
//   equipment: string[];
//   timeStart: string;
// }

const columns = [
  { title: 'Имя, Фамилия', dataIndex: 'userName', key: 'userName' },
  { title: 'Номер документа', dataIndex: 'docNumber', key: 'docNumber' },
  { title: 'Мобильный номер', dataIndex: 'phoneNumber', key: 'phoneNumber' },
  {
    title: 'Оборудование',
    key: 'selectEquipment',
    dataIndex: 'selectEquipment',
    render: (_, { selectEquipment }) => (
      <>
        {selectEquipment.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Время старта',
    dataIndex: 'dateTime',
    key: 'dateTime',
    render: (text) => {
      return <>{text}</>;
    },
  },
  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
    render: () => <a>Завершить</a>,
  },
];
const columns1 = [columns[0], ...columns.slice(3, 6)];

const App = () => {
  const [visibleForm, setVisibleForm] = React.useState(false);
  const [visibleInfom, setvisibleInfom] = React.useState(false);
  const { currentData } = useSelector((state) => state.rentalSlice);
  return (
    <>
      <Button
        type="primary"
        onClick={() => setVisibleForm(!visibleForm)}
        style={{ marginBottom: 15, marginRight: 15 }}
      >
        Добавить аренду
      </Button>
      <Button onClick={() => setvisibleInfom(!visibleInfom)}> Доп информация</Button>

      {visibleForm && <RentalForm setVisibleForm={setVisibleForm} />}
      <Table
        style={{ overflow: 'auto' }}
        columns={visibleInfom ? columns1 : columns}
        expandable={{
          expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.description}</p>,
          rowExpandable: (record) => record.name !== 'Not Expandable',
        }}
        dataSource={currentData}
      />
    </>
  );
};

export default App;
