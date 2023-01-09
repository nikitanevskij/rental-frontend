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
  EditOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, Result, Space, Typography, Input, message } from 'antd';
import { useSelector } from 'react-redux';
import { finalPrice, msToTime } from '../../helpers/helper';
import { useAppDispatch } from '../../store/store';
import { deleteRent } from '../../store/rentalSlice';

export const Total = React.memo(({ setVisibleTotal, currentSelectedObj }) => {
  const { Paragraph, Text } = Typography;
  const dispatch = useAppDispatch();
  const { currentData } = useSelector((state) => state.rentalSlice);
  const currentObj = currentData.filter((item) => item.key === currentSelectedObj);
  const items = currentObj[0].equipment;

  const onClick = ({ key }) => {
    message.info(`Click on item ${key}`);
  };

  const [sum, setSum] = React.useState(0);
  const [visible, setVisible] = React.useState(true);

  const totalOrder = () => {
    const totalObj = {
      ...currentObj[0],
      totalSum: sum,
    };
    dispatch(deleteRent(totalObj));
  };

  const diff = dayjs().diff(currentObj[0].startTimeTrip);
  const diffTime = msToTime(diff);

  console.log(currentObj);
  return (
    <div className={style.active}>
      <div className={style.inner}>
        <Result
          status={visible ? 'info' : 'success'}
          title="Завершение аренды"
          subTitle="Номер заказа: 2017182818828182881"
          extra={[
            <Button
              type="primary"
              key="console"
              onClick={() => {
                if (visible) {
                  alert('Нельзя завершить аренду. Подтвердите сумму в поле для ввода.');
                  return;
                }
                totalOrder();
                setVisibleTotal(false);
              }}
            >
              Завершить аренду и закрыть окно
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
              <Dropdown menu={{ items, onClick }} trigger={['click']}>
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
              {finalPrice(currentObj[0].equipment[0].children, currentObj[0].startTimeTrip)} BYN
            </Paragraph>
          </div>
          {visible ? (
            <Input.Group compact>
              <Input
                style={{ width: 'calc(70% )' }}
                suffix="BYN"
                placeholder="Подтвердите сумму"
                type="number"
                value={sum}
                onChange={(e) => {
                  setSum(e.target.value);
                }}
              />
              <Button
                type="primary"
                onClick={() => {
                  if (Number(sum) >= 0) {
                    setVisible((prev) => !prev);
                  }
                  return;
                }}
              >
                Подтвердить
              </Button>
            </Input.Group>
          ) : (
            <Paragraph>
              <CheckOutlined className="site-result-demo-error-icon" /> Фактически оплачено: {sum}{' '}
              BYN{'  '}
              <EditOutlined
                className={style.editIcon}
                onClick={() => setVisible((prev) => !prev)}
              />
            </Paragraph>
          )}
        </Result>
      </div>
    </div>
  );
});
