import React from 'react';
import './rentalForm.scss';
import { PlusOutlined } from '@ant-design/icons';
import { Checkbox, Segmented, Button, Col, Drawer, Form, Input, Row, Select, Space } from 'antd';
import dayjs from 'dayjs';
import { useAppDispatch } from '../../store/store';
import { addRentEquipment, fetchCreateRental } from '../../store/rentalSlice';

const { Option } = Select;

export const RentalForm = () => {
  const id = React.useId();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [open, setOpen] = React.useState(false);
  const [timeRental, setTimeRental] = React.useState('fact');

  const onFinish = ({ userName, docNumber, comment, prefix, phoneNumber, selectEquipment }) => {
    const objRental = {
      key: dayjs().format('YYYY-MM-DD HH:mm:ss'),
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
    dispatch(fetchCreateRental(objRental));
    console.log(objRental);
    setOpen(false);
    form.resetFields();
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    form.resetFields();
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

  const optionsTimeRental = [
    { label: 'по факту', value: 'fact' },
    { label: '15м', value: '15 мин' },
    { label: '30м', value: '30 мин' },
    { label: '1ч', value: '1 час' },
    { label: '1.5ч', value: '1.5 часа' },
    { label: '2ч', value: '2 часа' },
    { label: '2.5ч', value: '2.5 часа' },
    { label: '3ч', value: '3 часа' },
    { label: '3.5ч', value: '3.5 часа' },
    { label: '4ч', value: '4 часа' },
    { label: '24ч', value: 'day' },
  ];

  const optionsSelectEquipment = [
    { label: 'Silverback L синий 1', value: 'Silverback L синий 1 bike' },
    { label: 'Silverback L синий 2', value: 'Silverback L синий 2 bike' },
    { label: 'Silverback L синий 3', value: 'Silverback L синий 3 bike' },
    { label: 'Silverback L синий 4', value: 'Silverback L синий 4 bike' },
    { label: 'Silverback L синий 5', value: 'Silverback L синий 5 bike' },
    { label: 'Silverback L синий 6', value: 'Silverback L синий 6 bike' },
    { label: 'Silverback L синий 7', value: 'Silverback L синий 7 bike' },
    { label: 'Silverback L синий 8', value: 'Silverback L синий 8 bike' },
    { label: 'Xiaomi m365 1', value: 'Xiaomi m365 1 sam' },
    { label: 'Xiaomi m365 2', value: 'Xiaomi m365 2 sam' },
    { label: 'Xiaomi m365 3', value: 'Xiaomi m365 3 sam' },
    { label: 'Xiaomi m365 4', value: 'Xiaomi m365 4 sam' },
    { label: 'Xiaomi m365 5', value: 'Xiaomi m365 5 sam' },
    { label: 'Xiaomi m365 6', value: 'Xiaomi m365 6 sam' },
  ];

  const bikeBox1 = [
    'Silverback L синий 1',
    'Silverback L синий 2',
    'Silverback L синий 3',
    'Silverback L синий 4',
    'Silverback L синий 5',
    'Silverback L синий 6',
    'Silverback L синий 7',
    'Silverback L синий 8',
  ];
  const bikeBox2 = ['Stels M синий 1', 'Stels M синий 2', 'Aist S синий 1'];
  const bikeBox3 = [
    'Stels M синий 11',
    'Stels M синий 21',
    'Aist S синий 11',
    'Stels M синий 12',
    'Stels M синий 13',
    'Stels M синий 14',
  ];
  const electroBox = [
    'Xiaomi m365 1',
    'Xiaomi m365 2',
    'Xiaomi m365 3',
    'Xiaomi m365 4',
    'Xiaomi m365 5',
    'Xiaomi m365 6',
    'Xiaomi m365 7',
    'Xiaomi PRO 8',
  ];
  return (
    <>
      <Button
        type="primary"
        onClick={showDrawer}
        icon={<PlusOutlined />}
        style={{ marginBottom: 20, height: 40 }}
      >
        Добавить аренду
      </Button>
      <Drawer
        placement="top"
        title="Добавление нового арендатора"
        onClose={onClose}
        open={open}
        height={'max-content'}
        bodyStyle={{}}
        extra={
          <Space>
            <div style={{ fontSize: 20 }}>{dayjs().format('HH:mm:ss DD/MM/YYYY')}</div>
            {/* <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onClose} type="primary">
              Submit
            </Button> */}
          </Space>
        }
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            userName: 'Юра Дудь',
            docNumber: 'MP2345678',
            prefix: '29',
            phoneNumber: '3334455',
            comment: '',
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="userName"
                label="Фамилия, Имя, Отчество"
                rules={[{ required: true, message: 'Пожалуйста заполните поле ФИО' }]}
              >
                <Input placeholder="Пожалуйста заполните поле ФИО" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="docNumber"
                label="Номер документа"
                rules={[{ required: true, message: 'Пожалуйста введите номер документа' }]}
              >
                <Input placeholder="Пожалуйста введите номер документа" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="phoneNumber"
                label="Мобильный номер"
                rules={[{ required: true, message: 'Пожалуйста введите номер' }]}
              >
                <Input
                  style={{ width: '100%' }}
                  addonBefore={prefixSelector}
                  placeholder="Пожалуйста введите номер"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              {/* <Form.Item name="timeRental"> */}
              <Segmented
                block
                options={optionsTimeRental}
                defaultValue={'fact'}
                onChange={(value) => setTimeRental(value)}
              />
              {/* </Form.Item> */}
            </Col>

            <Col span={24}>
              <Form.Item
                name="selectEquipment"
                rules={[
                  { required: true, message: 'Пожалуйста выберите оборудование', type: 'array' },
                ]}
              >
                <Checkbox.Group>
                  <div className="checkbox-wrapper">
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      {bikeBox1.map((item, index) => (
                        <Checkbox value={item} key={id + index}>
                          {item}
                        </Checkbox>
                      ))}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      {bikeBox2.map((item, index) => (
                        <Checkbox value={item} key={id + index}>
                          {item}
                        </Checkbox>
                      ))}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      {bikeBox3.map((item, index) => (
                        <Checkbox value={item} key={id + index}>
                          {item}
                        </Checkbox>
                      ))}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      {electroBox.map((item, index) => (
                        <Checkbox value={item} key={id + index}>
                          {item}
                        </Checkbox>
                      ))}
                    </div>
                  </div>
                </Checkbox.Group>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item name="comment">
                <Input.TextArea rows={2} placeholder="Тут можно сделать любые пометки" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item>
                <Button style={{ width: '100%', height: 40 }} type="primary" htmlType="submit">
                  Готово, выдать!
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
