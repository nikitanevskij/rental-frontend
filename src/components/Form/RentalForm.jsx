import { Button, DatePicker, Form, Input, Radio, Select } from 'antd';
import dayjs from 'dayjs';
import { Option } from 'antd/es/mentions';
import React from 'react';
import { CascaderInput } from './inputs/CascaderInput';
import './rentalForm.scss';
import { useAppDispatch } from '../../store/store';
import { addRent } from '../../store/rentalSlice';

export const RentalForm = ({ setVisibleForm }) => {
  const dispatch = useAppDispatch();
  const onFinish = (fieldsValue) => {
    const values = {
      ...fieldsValue,
      phoneNumber: `+375 (${fieldsValue.prefix}) ${fieldsValue.phoneNumber}`,
      dateTime: fieldsValue['dateTime'].format('YYYY-MM-DD HH:mm:ss'),
    };
    dispatch(addRent(values));
    console.log('Success:', values);
    setVisibleForm((prev) => !prev);
  };

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
            timeRental: 'a',
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Имя, Фамилия"
            name="userName"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Номер документа"
            name="docNumber"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Мобильный номер"
            name="phoneNumber"
            rules={[{ required: true, message: 'Please input your password!' }]}
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
            rules={[
              { required: true, message: 'Please select your favourite colors!', type: 'array' },
            ]}
          >
            <Select mode="multiple" placeholder="Please select favourite colors">
              <Option value="red">Silverback L 26 blue 1729</Option>
              <Option value="green">Stels M 26 light blue</Option>
              <Option value="blue1">Silverback L 26 blue 2229</Option>
              <Option value="blue2">Silverback L 26 blue 2249</Option>
              <Option value="blue3">Silverback L 26 blue 2109</Option>
              <Option value="blue4">Silverback L 26 blue 2269</Option>
              <Option value="blue5">Silverback L 26 blue 2209</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="timeRental"
            label="Время аренды"
            rules={[{ required: true, message: 'Please pick an item!' }]}
          >
            <Radio.Group>
              <Radio.Button value="a">по факту</Radio.Button>
              <Radio.Button value="bq">15 </Radio.Button>
              <Radio.Button value="b">30 </Radio.Button>
              <Radio.Button value="c">1 </Radio.Button>
              <Radio.Button value="d">1.5 </Radio.Button>
              <Radio.Button value="e">2 </Radio.Button>
              <Radio.Button value="f">2.5 </Radio.Button>
              <Radio.Button value="g">3 </Radio.Button>
              <Radio.Button value="y">3.5 </Radio.Button>
              <Radio.Button value="u">4 </Radio.Button>
              <Radio.Button value="o">сутки</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="dateTime"
            label="Время старта"
            rules={[
              {
                type: 'object',
                required: true,
                message: 'Please select time!',
              },
            ]}
          >
            {/* <DatePicker picker="month" defaultValue={dayjs('2015-06', 'YYYY-MM')} /> */}
            <DatePicker format="YYYY-MM-DD HH:mm:ss" showTime />
          </Form.Item>
          <Form.Item name="comment" label="Примечание">
            <Input.TextArea />
          </Form.Item>

          <Form.Item wrapperCol={{}}>
            <Button style={{ marginRight: 10 }} onClick={() => setVisibleForm((prev) => !prev)}>
              Сбросить и закрыть
            </Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
