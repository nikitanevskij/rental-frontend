import React from 'react';
import style from './Total.module.scss';

import {
  CheckOutlined,
  FormOutlined,
  HistoryOutlined,
  RightOutlined,
  LeftOutlined,
  DownOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, Result, Space, Tag, Typography } from 'antd';

const { Paragraph, Text } = Typography;
function Total({ setVisibleTotal, setVisibleForm }) {
  const items = [
    {
      label: 'Silverback L 26 blue 1729',
      key: '0',
    },
    {
      label: 'Silverback L 26 blue 1723',
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: 'Silverback L 26 blue 1799',
      key: '3',
    },
  ];
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
              <FormOutlined className="site-result-demo-error-icon" /> Оформление: 2022-12-22
              13:00:00
            </Paragraph>
            <Paragraph>
              <UnorderedListOutlined className="site-result-demo-error-icon" />{' '}
              <Dropdown menu={{ items }} trigger={['click']}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    Выданное оборудование
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </Paragraph>
            <Paragraph>
              <RightOutlined className="site-result-demo-error-icon" /> Время выдачи оборудования:
              2022-12-22 13:10:00
            </Paragraph>
            <Paragraph>
              <LeftOutlined className="site-result-demo-error-icon" /> Время сдачи оборудования:
              2022-12-22 14:10:00
            </Paragraph>
            <Paragraph>
              <HistoryOutlined className="site-result-demo-error-icon" /> Итоговое время аренды:
              01:00:00
            </Paragraph>
            <Paragraph>
              <CheckOutlined className="site-result-demo-error-icon" /> Сумма к оплате: 5 byn
            </Paragraph>
          </div>
          ,
        </Result>
      </div>
    </div>
  );
}

export default Total;
