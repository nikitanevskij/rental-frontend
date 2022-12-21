import React from 'react';
import { Button, Table, Tag } from 'antd';
// import type { ColumnsType } from 'antd/es/table';
import { RentalForm } from '../../components/Form/RentalForm';

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
  { title: 'Имя, Фамилия', dataIndex: 'name', key: 'name' },
  { title: 'Номер документа', dataIndex: 'numberDoc', key: 'numberDoc' },
  { title: 'Мобильный номер', dataIndex: 'numberPhone', key: 'numberPhone' },
  {
    title: 'Оборудование',
    key: 'equipment',
    dataIndex: 'equipment',
    render: (_, { equipment }) => (
      <>
        {equipment.map((tag) => {
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
  { title: 'Время старта', dataIndex: 'timeStart', key: 'timeStart' },
  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
    render: () => <a>Завершить</a>,
  },
];

const data = [
  {
    key: 1,
    name: 'Петрова Юля',
    numberDoc: 'MP267365',
    numberPhone: '+374483883888',
    equipment: ['bike', 'samokat'],
    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    timeStart: '23:12:00',
  },
  {
    key: 2,
    name: 'Акенфеев Владимир',
    numberDoc: 'MP267365',
    numberPhone: '+374483883888',
    equipment: ['bike', 'samokat'],
    description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
    timeStart: '23:12:00',
  },
  {
    key: 3,
    name: 'Дроздова Анастасия',
    numberDoc: 'MP267365',
    numberPhone: '+374483883888',
    equipment: ['bike', 'samokat'],
    description: 'This not expandable',
    timeStart: '23:12:00',
  },
  {
    key: 4,
    name: 'Валькевич Рафаэль',
    numberDoc: 'MP267365',
    numberPhone: '+374483883888',
    equipment: ['bike', 'samokat', 'bike', 'bike', 'samokat'],
    description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
    timeStart: '23:12:00',
  },
];

const App = () => {
  const [visibleForm, setVisibleForm] = React.useState(false);
  return (
    <>
      <Button
        type="primary"
        onClick={() => setVisibleForm(!visibleForm)}
        style={{ marginBottom: 15 }}
      >
        Добавить аренду
      </Button>
      {visibleForm && <RentalForm setVisibleForm={setVisibleForm} />}
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.description}</p>,
          rowExpandable: (record) => record.name !== 'Not Expandable',
        }}
        dataSource={data}
      />
    </>
  );
};

export default App;
