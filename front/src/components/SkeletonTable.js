import { Table, Skeleton } from 'antd';
import PropTypes from 'prop-types';

const SkeletonTable = ({ columns, rowCount }) => {
  return (
    <Table
      rowKey="key"
      pagination={false}
      dataSource={[...Array(rowCount)].map((_, index) => ({
        key: `key${index}`,
      }))}
      columns={columns.map((column) => {
        return {
          ...column,
          render: function renderPlaceholder() {
            return (
              <Skeleton
                key={column.dataIndex}
                title={true}
                paragraph={false}
              />
            );
          },
        };
      })}
    />
  );
};

SkeletonTable.propTypes = {
  columns: PropTypes.array.isRequired,
  rowCount: PropTypes.number,
};

SkeletonTable.defaultProps = {
  rowCount: 20,
};

export default SkeletonTable;