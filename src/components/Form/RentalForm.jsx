import { Button, Form, Input, Radio, Select, Typography } from 'antd';
import { Option } from 'antd/es/mentions';
import './rentalForm.scss';
import { useAppDispatch } from '../../store/store';
import { addRentEquipment } from '../../store/rentalSlice';
import dayjs from 'dayjs';

const { Text } = Typography;

export const RentalForm = ({ setVisibleForm }) => {
  const dispatch = useAppDispatch();
  const onFinish = ({
    userName,
    docNumber,
    comment,
    prefix,
    phoneNumber,
    timeRental,
    selectEquipment,
  }) => {
    const objRental = {
      key: dayjs().add(10, 'minute').format('YYYY-MM-DD HH:mm:ss'),
      startTimeRegistration: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      userName,
      docNumber,
      phoneNumber: `+375 (${prefix}) ${phoneNumber}`,
      timeRental,
      equipment: [
        {
          key: '1',
          type: 'group',
          label: 'Текущее оборудование:',
          children: selectEquipment.map((item, index) => ({
            key: String(index + 1),
            label: item,
          })),
        },
        {
          type: 'divider',
        },
        {
          key: '2',
          type: 'group',
          label: 'Ранее принятое оборудование:',
          children: [],
        },
      ],
      startTimeTrip: dayjs().add(10, 'minute').format('YYYY-MM-DD HH:mm:ss'),
      comment,
    };
    dispatch(addRentEquipment(objRental));
    // console.log('Success:', objRental);
    setVisibleForm((prev) => !prev);
  };

  const options = [
    { label: 'Silverback L синий 1', value: 'Silverback L синий 1 bike' },
    { label: 'Silverback L синий 2', value: 'Silverback L синий 2 bike' },
    { label: 'Silverback L синий 3', value: 'Silverback L синий 3 bike' },
    { label: 'Silverback L синий 4', value: 'Silverback L синий 4 bike' },
    { label: 'Silverback L синий 5', value: 'Silverback L синий 5 bike' },
    { label: 'Xiaomi m365 1', value: 'Xiaomi m365 1 sam' },
    { label: 'Xiaomi m365 2', value: 'Xiaomi m365 2 sam' },
  ];

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="29">29</Option>
        <Option value="33">33</Option>
        <Option value="44">44</Option>
        <Option value="rus">rus</Option>
        <Option value="other">other</Option>
      </Select>
    </Form.Item>
  );

  return (
    <div className="active">
      <div className="inner">
        <Form
          name="basic"
          // layout="vertical"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 22 }}
          initialValues={{
            remember: true,
            userName: 'Газманов Олег',
            docNumber: 'MP123456',
            prefix: '29',
            phoneNumber: '2343434',
            timeRental: 'fact',
            comment: '',
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Имя, Фамилия"
            name="userName"
            rules={[{ required: true, message: 'Пожалуйста заполните поле' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Номер документа"
            name="docNumber"
            rules={[{ required: true, message: 'Пожалуйста заполните поле' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Мобильный номер"
            name="phoneNumber"
            rules={[{ required: true, message: 'Пожалуйста заполните поле' }]}
          >
            <Input
              addonBefore={prefixSelector}
              style={{
                width: '100%',
              }}
            />
          </Form.Item>

          <Form.Item
            name="selectEquipment"
            label="Выбор оборудования"
            rules={[{ required: true, message: 'Пожалуйста выберите оборудование', type: 'array' }]}
          >
            <Select mode="multiple" placeholder="Выберите оборудование" options={options} />
          </Form.Item>

          <Form.Item name="timeRental" label="Время аренды">
            <Radio.Group>
              <Radio.Button value="fact">по факту</Radio.Button>
              <Radio.Button value="15 мин">15</Radio.Button>
              <Radio.Button value="30 мин">30</Radio.Button>
              <Radio.Button value="1 час">1</Radio.Button>
              <Radio.Button value="1.5 часа">1.5</Radio.Button>
              <Radio.Button value="2 часа">2</Radio.Button>
              <Radio.Button value="2.5 часа">2.5</Radio.Button>
              <Radio.Button value="3 часа">3</Radio.Button>
              <Radio.Button value="3.5 часа">3.5</Radio.Button>
              <Radio.Button value="4 часа">4</Radio.Button>
              <Radio.Button value="day">сутки</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Оформление">
            <Text>{dayjs().format('YYYY-MM-DD HH:mm:ss')}</Text>
          </Form.Item>
          <Form.Item name="comment" label="Примечание">
            <Input.TextArea />
          </Form.Item>

          <Form.Item wrapperCol={{}}>
            <Button style={{ marginRight: 10 }} onClick={() => setVisibleForm((prev) => !prev)}>
              Сбросить и закрыть
            </Button>
            <Button type="primary" htmlType="submit">
              Готово, выдать!
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
