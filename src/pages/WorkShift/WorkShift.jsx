import React from 'react';
import { Button, Progress, Table, Tag } from 'antd';
import { RentalForm } from '../../components/Form/RentalForm';
import { useSelector } from 'react-redux';
import Total from '../../components/Total/Total';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { FormOutlined, DeleteTwoTone, ClockCircleOutlined } from '@ant-design/icons';
import { finalPrice, msToTime, rentalTime } from '../../helpers/helper';
import { useAppDispatch } from '../../store/store';
import { returnedEquipmentNow } from '../../store/rentalSlice';

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
  const dispatch = useAppDispatch();
  const [visibleForm, setVisibleForm] = React.useState(false);
  const [visibleTotal, setVisibleTotal] = React.useState(false);
  const [visibleInfom, setvisibleInfom] = React.useState(false);
  const [clockState, setclockState] = React.useState(null);
  const [currentSelectedObj, setCurrentSelectedObj] = React.useState({});
  const { currentData } = useSelector((state) => state.rentalSlice);

  // const [sumObj, setSumObj] = React.useState([]);
  // const [sumPrice, setSumPrice] = React.useState([]);

  const getDate = () => {
    const date = dayjs().format('HH:mm:ss DD/MM/YYYY');
    setclockState(date);
  };

  React.useEffect(() => {
    getDate();
    setInterval(getDate, 1000);
  }, []);

  // const summery = React.useMemo(() => sum(sumObj, sumPrice), [sumObj, sumPrice]);
  // console.log('Обновился');
  const columns = [
    { title: 'Имя, Фамилия', dataIndex: 'userName', key: 'userName', width: 140, fixed: 'left' },
    { title: 'Номер документа', dataIndex: 'docNumber', key: 'docNumber', width: 160 },
    { title: 'Мобильный номер', dataIndex: 'phoneNumber', key: 'phoneNumber', width: 170 },
    {
      title: 'Оборудование',
      key: 'selectEquipment',
      dataIndex: 'selectEquipment',
      width: 200,
      render: (_, { key, selectEquipment }) => (
        <>
          {selectEquipment.map((tag, index, arr) => {
            let color = tag.includes('bike') ? 'green' : 'red';

            return (
              <Tag
                color={color}
                key={tag}
                style={{ marginBottom: 2, cursor: 'pointer' }}
                onClick={() => {
                  arr.length <= 1
                    ? window.alert(
                        'Это последнее арендное оборудование. Кликай действие «Завершить»',
                      )
                    : window.confirm(`Хотите сдать ${tag}?`) &&
                      dispatch(returnedEquipmentNow({ tag, key }));
                }}
              >
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
        return <Tag icon={<ClockCircleOutlined />}>{text}</Tag>;
      },
    },
    {
      title: 'Время старта',
      dataIndex: 'startTimeTrip',
      key: 'startTimeTrip',
      width: 140,
      render: (text) => {
        return <>{text.slice(11)}</>;
      },
    },
    {
      title: 'Время аренды',
      dataIndex: 'rentalTime',
      key: 'rentalTime',
      width: 120,
      render: (date) => {
        const diff = dayjs().diff(date);
        const a = Math.trunc(diff / 60000);

        const diff1 = (numb) => {
          switch (numb) {
            case -8:
              return 10;
            case -7:
              return 20;
            case -6:
              return 30;
            case -5:
              return 40;
            case -4:
              return 50;
            case -3:
              return 60;
            case -2:
              return 70;
            case -1:
              return 80;
            case -0:
              return 90;
            case 0:
              return 100;
            default:
          }
        };
        if (diff < 0) {
          return <Progress percent={diff1(a)} status="active" />;
        }
        const result = msToTime(diff);
        return <>{result}</>;
      },
    },
    {
      title: 'Итого р.',
      dataIndex: 'price',
      width: 100,
      key: 'price',
      render: (_, selectEquipments) => {
        const { startTimeTrip, selectEquipment } = selectEquipments;
        const result = finalPrice(selectEquipment, startTimeTrip);
        return <>{result}</>;
      },
    },
    {
      title: '',
      dataIndex: 'e',
      key: 'e',
      render: (_, data) => (
        <>
          <Button icon={<FormOutlined />} style={{ marginRight: 10 }}></Button>
          <Button danger icon={<DeleteTwoTone twoToneColor="red" />}></Button>
        </>
      ),
    },
    {
      title: 'Действие',
      dataIndex: 'x',
      key: 'x',
      fixed: 'right',
      width: 130,
      render: (_, data) => (
        <>
          <Button
            onClick={() => {
              setVisibleTotal(true);
              setCurrentSelectedObj(data.key);
            }}
            style={{ marginRight: 10 }}
          >
            Завершить
          </Button>
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
      <Button onClick={() => setvisibleInfom(!visibleInfom)} style={{ marginRight: 15 }}>
        Выдать Volvo
      </Button>
      <Button onClick={() => setvisibleInfom(!visibleInfom)} style={{ marginRight: 15 }}>
        Выдать Mercedes
      </Button>
      <Button onClick={() => setvisibleInfom(!visibleInfom)} style={{ marginRight: 15 }}>
        Доп информация
      </Button>
      <Button type="primary" ghost>
        {clockState}
      </Button>

      {visibleForm && <RentalForm setVisibleForm={setVisibleForm} />}
      {visibleTotal && (
        <Total
          setVisibleTotal={setVisibleTotal}
          setVisibleForm={setVisibleForm}
          currentSelectedObj={currentSelectedObj}
          setCurrentSelectedObj={setCurrentSelectedObj}
        />
      )}
      <Table
        style={{ overflow: 'auto' }}
        columns={visibleInfom ? columns : columns1}
        expandable={{
          expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.description}</p>,
          // rowExpandable: (record) => record.name !== 'Not Expandable',
        }}
        dataSource={currentData}
        scroll={{ x: 1500 }}
        pagination={{ pageSize: 7, position: ['bottomLeft'], hideOnSinglePage: true }}
      />
    </>
  );
};

export default App;
