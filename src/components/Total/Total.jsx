import React from 'react';
import style from './Total.module.scss';
import dayjs from 'dayjs';
import {
  CheckOutlined,
  FormOutlined,
  HistoryOutlined,
  RightOutlined,
  LeftOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, Result, Space, Typography, Input } from 'antd';
import { useSelector } from 'react-redux';
import { finalPrice, msToTime } from '../../helpers/helper';

const Total = React.memo(({ setVisibleTotal, setVisibleForm, currentSelectedObj }) => {
  const { Paragraph, Text } = Typography;
  const { currentData } = useSelector((state) => state.rentalSlice);
  const currentObj = currentData.filter((item) => item.key === currentSelectedObj);
  const items = currentObj[0].selectEquipment.map((item, index) => ({ key: index, label: item }));

  const diff = dayjs().diff(currentObj[0].startTimeTrip);
  const diffTime = msToTime(diff);
  console.log(currentObj);
  return (
    <div className={style.active}>
      <div className={style.inner}>
        <Result
          status="success"
          title="Аренда завершена"
          subTitle="Номер заказа: 2017182818828182881"
          extra={[
            <Button
              type="primary"
              key="console"
              onClick={() => {
                setVisibleTotal(false);
                setVisibleForm(true);
              }}
            >
              Добавить новую аренду
            </Button>,
            <Button
              key="buy"
              onClick={() => {
                setVisibleTotal(false);
              }}
            >
              Закрыть окно
            </Button>,
          ]}
        >
          <div>
            <Paragraph>
              <Text
                strong
                style={{
                  fontSize: 16,
                }}
              >
                Информация о текущей аренде:
              </Text>
            </Paragraph>
            <Paragraph>
              <FormOutlined className="site-result-demo-error-icon" /> Оформление:{' '}
              {currentObj[0].startTimeRegistration}
            </Paragraph>
            <Paragraph>
              <Dropdown menu={{ items }} trigger={['click']}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <DownOutlined />
                    Выданное оборудование
                  </Space>
                </a>
              </Dropdown>
            </Paragraph>
            <Paragraph>
              <RightOutlined className="site-result-demo-error-icon" /> Время старта:{' '}
              {currentObj[0].startTimeTrip}
            </Paragraph>
            <Paragraph>
              <LeftOutlined className="site-result-demo-error-icon" /> Время сдачи оборудования:{' '}
              {dayjs().format('YYYY-MM-DD HH:mm:ss')}
            </Paragraph>
            <Paragraph>
              <HistoryOutlined className="site-result-demo-error-icon" /> Итоговое время аренды:{' '}
              {diffTime}
            </Paragraph>
            <Paragraph>
              <CheckOutlined className="site-result-demo-error-icon" /> Сумма к оплате:{' '}
              {finalPrice(currentObj[0].selectEquipment, currentObj[0].startTimeTrip)} BYN
            </Paragraph>
          </div>
          <Input.Group compact>
            <Input
              style={{ width: 'calc(70% )' }}
              suffix="BYN"
              placeholder="Подтвердите сумму"
              type="number"
            />
            <Button type="primary">Подтвердить</Button>
          </Input.Group>
        </Result>
      </div>
    </div>
  );
});

export default Total;
