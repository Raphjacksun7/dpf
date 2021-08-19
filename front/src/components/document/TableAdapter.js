import React from 'react'
import {Table} from 'antd';
import "./styles.scss"

const TableAdapter = ( {columns, data, action}) => {
   
  return (
    <>
      <Table 
        columns={columns} 
        dataSource={data} 
        scroll={{ x: 1000 }}
        onRow={(record, rowIndex) => {
          return {
            onClick: () => { action(record) }, 
          };
        }}
      />
   </>
  )
}

export default TableAdapter





