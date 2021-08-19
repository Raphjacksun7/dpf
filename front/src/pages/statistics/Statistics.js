import React from 'react';
import { 
  Row, 
  Col, 
  Button,
  Typography,
  Statistic,
  Select
} from 'antd';
import {Chart} from '../../components'
import "./styles.scss"

const { Title } = Typography;
const { Option } = Select;

const Statistics = () => {
  return (
    <>
      <Title level={2}>Statistiques</Title>
      <Row justify="space-around" className="stats">
        <Col  md={6}>
          <Select
            showSearch
            defaultValue="jack"
            placeholder="Par gestionnaires"
            optionFilterProp="children"
            bordered={false}
          >
            <Option value="jack">Tous les gestionnaires</Option>
            <Option value="lucy">Jean</Option>
            <Option value="toti">Luc</Option>
          </Select>
        </Col>
        <Col  md={6}>
          <Select
            showSearch
            defaultValue="jack"
            placeholder="Par états"
            optionFilterProp="children"
            bordered={false}
          >
            <Option value="jack">Tous les états </Option>
            <Option value="lucy">Jean</Option>
            <Option value="toti">Luc</Option>
          </Select>
        </Col>
        <Col  md={6}>
          <Select
            showSearch
            defaultValue="jack"
            placeholder="Par période"
            optionFilterProp="children"
            bordered={false}
          >
            <Option value="jack">Par période </Option>
            <Option value="lucy">Jean</Option>
            <Option value="toti">Luc</Option>
          </Select>
        </Col>
        <Col  md={6}>
          <Button className="d_btn_primary" type="primary">Voir</Button>
        </Col>
      </Row>
      <Row style={{marginTop:"5em"}} justify="center" className="stats">
        <Col md={6}>
          <Statistic title="Nombres de dossiers trouvés" value={390} />
        </Col>
        <Col md={6}>
          <Statistic title="Nombres de temps passés" value={"264h"} />
        </Col>
      </Row>
      <Row style={{marginTop:"5em"}} justify="center" className="stats">
        <Col md={16}>
          <Chart/>
        </Col>
      </Row>
    </>
  )
}

export default Statistics
