import React from 'react';
import { Button, Progress, Table, Tag, TimePicker } from 'antd';
// import type { ColumnsType } from 'antd/es/table';
import { RentalForm } from '../../components/Form/RentalForm';
import { useSelector } from 'react-redux';
import Total from '../../components/Total/Total';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import calendar from 'dayjs/plugin/calendar';
import { FormOutlined, DeleteTwoTone } from '@ant-design/icons';

// interface DataType {
//   key: React.Key;
//   name: string;
//   numberDoc: string;
//   numberPhone: string;
//   description: string;
//   equipment: string[];
//   timeStart: string;
// }

const App = () => {
  dayjs.extend(relativeTime);
  const [visibleForm, setVisibleForm] = React.useState(false);
  const [visibleTotal, setVisibleTotal] = React.useState(false);
  const [visibleInfom, setvisibleInfom] = React.useState(false);
  const { currentData } = useSelector((state) => state.rentalSlice);
  const [clockState, setclockState] = React.useState(null);

  const getDate = () => {
    const date = dayjs().format('HH:mm:ss DD/MM/YYYY');
    setclockState(date);
  };
  React.useEffect(() => {
    getDate();
    setInterval(getDate, 1000);
  }, []);

  function msToTime(ms) {
    const days = Math.floor(ms / (24 * 60 * 60 * 1000));
    const daysms = ms % (24 * 60 * 60 * 1000);
    const hours = Math.floor(daysms / (60 * 60 * 1000));
    const hoursms = ms % (60 * 60 * 1000);
    const minutes = Math.floor(hoursms / (60 * 1000));
    const minutesms = ms % (60 * 1000);
    const seconds = Math.floor(minutesms / 1000);

    const hoursGet = hours < 10 ? '0' + hours : hours;
    const minutesGet = minutes < 10 ? '0' + minutes : minutes;
    // const secondsGet = seconds < 10 ? '0' + seconds : seconds;
    return days + 'д ' + hoursGet + 'ч ' + minutesGet + 'м ';
  }

  const resultPrice = (arr, time) => {};

  console.log(resultPrice(['bike', 'samokat', 'bike']));
  const columns = [
    { title: 'Имя, Фамилия', dataIndex: 'userName', key: 'userName', width: 200 },
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
      title: 'Время аренды',
      dataIndex: 'timeRental',
      key: 'timeRental',
      width: 130,
      render: (text) => {
        return <Tag>{text}</Tag>;
      },
    },
    {
      title: 'Время старта',
      dataIndex: 'dateTime',
      key: 'dateTime',
      width: 170,
      render: (text) => {
        return <>{text}</>;
      },
    },
    {
      title: 'Время в пути',
      dataIndex: 'dateTime',
      key: 'dateTime',
      width: 120,
      render: (date) => {
        const diff = dayjs().diff(date);
        if (diff < 0) {
          return <Progress percent={50} status="active" />;
        }
        const result = msToTime(diff);
        return <>{result}</>;
      },
    },
    {
      title: 'Итого',
      dataIndex: 'price',
      key: 'price',
      render: () => {},
    },

    {
      title: 'Действие',
      dataIndex: 'e',
      key: 'e',
      width: 270,
      render: () => (
        <>
          <Button onClick={() => setVisibleTotal(true)} style={{ marginRight: 10 }}>
            Завершить аренду
          </Button>
          <Button icon={<FormOutlined />} style={{ marginRight: 10 }}></Button>
          <Button danger icon={<DeleteTwoTone twoToneColor="red" />}></Button>
        </>
      ),
    },
  ];
  const columns1 = [columns[0], ...columns.slice(3, 11)];

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
      <div>{clockState}</div>

      {visibleForm && <RentalForm setVisibleForm={setVisibleForm} />}
      {visibleTotal && <Total setVisibleTotal={setVisibleTotal} setVisibleForm={setVisibleForm} />}
      <Table
        style={{ overflow: 'auto' }}
        columns={visibleInfom ? columns : columns1}
        expandable={{
          expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.description}</p>,
          rowExpandable: (record) => record.name !== 'Not Expandable',
        }}
        dataSource={currentData}
        scroll={{ x: 1500 }}
      />
    </>
  );
};

export default App;
