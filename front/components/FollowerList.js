import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Card, List } from 'antd';
import { StopOutlined } from '@ant-design/icons';

const FollowerList = ({ header, data }) => {
  const FollowerListStyle = useMemo(() => ({
    marginBottom: '20px',
  }));

  const grid = useMemo(() => ({
    gutter: 4, xs: 2, md: 3,
  }));

  const loadMoreStyle = useMemo(() => ({
    margin: '10px 0',
    textAlign: 'center',
  }));

  const listItemStyle = useMemo(() => ({
    marginTop: '20px',
  }));

  return (
    <List
      header={<div>{header}</div>}
      style={FollowerListStyle}
      grid={grid}
      size="small"
      loadMore={<div style={loadMoreStyle}><button type="button">더 보기</button></div>}
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item style={listItemStyle}>
          <Card actions={[<StopOutlined key="stop" />]}>
            <Card.Meta description={item.nickname} />
          </Card>
        </List.Item>
      )}
    />
  );
};

FollowerList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default FollowerList;
