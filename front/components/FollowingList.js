import React, { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Card, List } from 'antd';
import { StopOutlined } from '@ant-design/icons';
import { UNFOLLOW_REQUEST } from '../reducers/user';

const FollowingList = ({ header, data }) => {
  const FollowingListStyle = useMemo(() => ({
    marginBottom: '20px',
  }));

  const loadMoreStyle = useMemo(() => ({
    margin: '10px 0',
    textAlign: 'center',
  }));

  const listItemStyle = useMemo(() => ({
    marginTop: '20px',
  }));

  const dispatch = useDispatch();
  const onUnFollowUser = (id) => () => {
    dispatch({
      type: UNFOLLOW_REQUEST,
      data: id,
    });
  };

  return (
    <List
      header={<div>{header}</div>}
      style={FollowingListStyle}
      grid={{ gutter: 4, xs: 2, md: 3 }}
      size="small"
      loadMore={<div style={loadMoreStyle}><button type="button">더 보기</button></div>}
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item style={listItemStyle}>
          <Card actions={[<StopOutlined key="stop" onClick={onUnFollowUser(item.id)} />]}>
            <Card.Meta description={item.nickname} />
          </Card>
        </List.Item>
      )}
    />
  );
};

FollowingList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default FollowingList;
