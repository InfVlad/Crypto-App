import React, { useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
// import moment from 'moment';

// import { useGetCryptosQuery } from '../services/cryptoApi';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import Loader from './Loader';
//@ts-ignore
import demoImage from "../images/cryptonews.jpg";



const { Text, Title } = Typography;
// const { Option } = Select;

type NewsProps = {
  simplified?: boolean
};


const News = ({ simplified }: NewsProps) => {
  // const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  // const { data } = useGetCryptosQuery(100);
  const { data: cryptoNews } = useGetCryptoNewsQuery({ count: simplified ? 6 : 12 });

  const regexDate = /\,\s(\d{1,2}.*2023)/

  if (!(cryptoNews?.length > 0 )) return <Loader />;

  return (
    <Row gutter={[24, 24]}>
      {/* {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={true}
          >
            <Option value="Cryptocurency">Cryptocurrency</Option>
            {data?.data?.coins?.map((currency:any) => <Option value={currency.name}>{currency.name}</Option>)}
          </Select>
        </Col>
      )} */}
      {cryptoNews.map((news:any, i:number) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>{news.title}</Title>
                <img src={news?.image?.thumbnail?.contentUrl || demoImage} alt="" style={{width:"100px", height:"100px"}} />
              </div>
              <p>{news.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description}</p>
              <div className="provider-container">
                {/* <div>
                  <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="news thumbnail" />
                  <Text className="provider-name">{news.provider[0]?.name}</Text>
                </div> */}
                <Text>{news.date.match(regexDate)[1]}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;