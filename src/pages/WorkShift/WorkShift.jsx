import React from 'react';
import { Button, Table, Tag } from 'antd';
import { RentalForm } from '../../components/Form/RentalForm';
import { useSelector } from 'react-redux';
import { Total } from '../../components/Total/Total';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { FormOutlined, DeleteTwoTone, ClockCircleOutlined } from '@ant-design/icons';
import { finalPrice, msToTime } from '../../helpers/helper';
import { useAppDispatch } from '../../store/store';
import {
  addRentBabyCar,
  fetchGetRental,
  returnedEquipmentNow,
  updateStartTimeTrip,
} from '../../store/rentalSlice';
import './workshift.scss';

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

  const getDate = () => {
    const date = dayjs().format('HH:mm:ss DD/MM/YYYY');
    setclockState(date);
  };

  React.useEffect(() => {
    getDate();
    setInterval(getDate, 1000);
    dispatch(fetchGetRental());
    console.log('Hello');
  }, []);

  const columns = [
    { title: 'Имя, Фамилия', dataIndex: 'userName', key: 'userName', width: 200, fixed: 'left' },
    { title: 'Номер документа', dataIndex: 'docNumber', key: 'docNumber', width: 160 },
    { title: 'Мобильный номер', dataIndex: 'phoneNumber', key: 'phoneNumber', width: 170 },
    {
      title: 'Оборудование',
      key: 'selectEquipment',
      dataIndex: 'selectEquipment',
      width: 200,
      render: (_, { key, equipment }) => (
        <>
          {equipment[0].children.map((item, index, arr) => {
            let color = item.label.includes('bike') ? 'green' : 'red';

            return (
              <Tag
                color={color}
                key={item.label}
                style={{ marginBottom: 2, cursor: 'pointer' }}
                onClick={() => {
                  arr.length <= 1
                    ? window.alert(
                        'Это последнее арендное оборудование. Кликай действие «Завершить»',
                      )
                    : window.confirm(`Хотите сдать ${item.label}?`) &&
                      dispatch(returnedEquipmentNow({ tag: item, key }));
                }}
              >
                {item.label.toUpperCase()}
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
      render: (date) => {
        return <>{date.slice(11)}</>;
      },
    },
    {
      title: 'Время аренды',
      dataIndex: 'startTimeTrip',
      key: 'startTimeTrip',
      width: 130,
      render: (date, { key }) => {
        const diff = dayjs().diff(date);
        // console.log(diff, key);
        // const a = Math.trunc(diff / 60000);

        // const diff1 = (numb) => {
        //   switch (numb) {
        //     case -8:
        //       return 10;
        //     case -7:
        //       return 20;
        //     case -6:
        //       return 30;
        //     case -5:
        //       return 40;
        //     case -4:
        //       return 50;
        //     case -3:
        //       return 60;
        //     case -2:
        //       return 70;
        //     case -1:
        //       return 80;
        //     case -0:
        //       return 90;
        //     case 0:
        //       return 100;
        //     default:
        //   }
        // };
        if (diff < 0) {
          return (
            <>
              <Button onClick={() => dispatch(updateStartTimeTrip(key))} block type="primary">
                Start Time!
              </Button>
              {/* <Progress
                percent={diff1(a)}
                status="active"
                style={{ marginRight: 8, cursor: 'pointer' }}
                showInfo={false}
              /> */}
            </>
          );
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
      render: (_, obj) => {
        const { startTimeTrip, equipment } = obj;
        const result = finalPrice(equipment[0].children, startTimeTrip);
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
    <div className="worksift-wrapper">
      <div style={{ marginBottom: 15, display: 'flex', justifyContent: 'space-between' }}>
        {/* <Button
          type="primary"
          onClick={() => setVisibleForm(!visibleForm)}
          style={{ marginBottom: 15, marginRight: 15 }}
        >
          Добавить аренду
        </Button> */}
        <div>
          <Button onClick={() => dispatch(addRentBabyCar('Volvo'))} style={{ marginRight: 15 }}>
            Выдать Volvo
          </Button>
          <Button onClick={() => dispatch(addRentBabyCar('Mercedes'))} style={{ marginRight: 15 }}>
            Выдать Mercedes
          </Button>
          <Button onClick={() => setvisibleInfom(!visibleInfom)} style={{ marginRight: 15 }}>
            Доп информация
          </Button>
        </div>
        <div>
          <Button type="primary" ghost>
            {clockState}
          </Button>
        </div>
      </div>
      <RentalForm />
      {/* {visibleForm && <RentalForm setVisibleForm={setVisibleForm} />} */}
      {visibleTotal && (
        <Total
          setVisibleTotal={setVisibleTotal}
          setVisibleForm={setVisibleForm}
          currentSelectedObj={currentSelectedObj}
          setCurrentSelectedObj={setCurrentSelectedObj}
        />
      )}
      <div className="result-block">
        <Table
          columns={visibleInfom ? columns : columns1}
          expandable={{
            expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.description}</p>,
            // rowExpandable: (record) => record.name !== 'Not Expandable',
          }}
          dataSource={currentData}
          scroll={{ x: 'max-content' }}
          pagination={{ pageSize: 7, position: ['bottomLeft'], hideOnSinglePage: true }}
        />
      </div>
    </div>
  );
};

export default App;
