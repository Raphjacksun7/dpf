import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Typography,
  Input,
  Tabs,
  List,
  Space,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import dataURItoBlob from "../../helpers/toBlob";
import { getTask, getTasksBySender, getTasksByReciever } from "../../actions/task";
import { getDModel } from "../../actions/d-model";

import "./styles.scss";

const { Title } = Typography;
const { TabPane } = Tabs;

const Action = () => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const auth = useSelector((state) => state.auth.user);
  const sender = useSelector((state) => state.task.sender);
  const reciever = useSelector((state) => state.task.reciever);
  const task = useSelector((state) => state.task.task);
  const dModel = useSelector((state) => state.dModel.dModel);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getTasksBySender(auth.sub));
    dispatch(getTasksByReciever(auth.sub));
  }, []);

  return (
    <>
      <div className="block">
        <div className="title">
          <Title level={2}>Actions</Title>
        </div>
      </div>
      <Tabs defaultActiveKey="1" size="middle" centered>
        <TabPane tab="Mes assignations" key="1">
          <Row>
            <Col span={8}>
              {/* <Title level={4}>Liste des actes signés</Title> */}
            </Col>
            <Col span={10} offset={6}>
              <div className="space-align-block">
                <Space size="large" align="baseline">
                  <Input
                    placeholder="Rechercher"
                    prefix={<SearchOutlined />}
                    style={{
                      height: "42px",
                      lineHeight: "30px",
                      borderColor: "#8E8E93",
                    }}
                  />
                </Space>
              </div>
            </Col>
          </Row>
          <List
            className="action-list"
            itemLayout="horizontal"
            dataSource={sender}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={
                    <span onClick={async()=> {
                      await dispatch(getTask(item._id)).then(async() => {
                        alert(task.ressourceId)
                       await dispatch(getDModel(task.ressourceId)).then(()=> {
                          setConfirmLoading(true);
                          var request = new XMLHttpRequest();
                          request.open("GET", dModel.fileURI, true);
                          request.responseType = "blob";
                          request.onload = function () {
                            var reader = new FileReader();
                            reader.readAsDataURL(request.response);
                            reader.onload = function (e) {
                              setConfirmLoading(false);
                              console.log(dataURItoBlob(e.target.result));
                              // history.push(`/view/${item._id}`, {
                              //   data: dataURItoBlob(e.target.result),
                              // });
                            };
                          };
                          request.send();
                        })
                      });
                    }}>
                      Vous avez assigné un modele pour{" "}
                      <strong>{item.taskType}</strong> à{" "}
                      <strong>{item.reciever.firstname}</strong>
                    </span>
                  }
                  description={`"${item.motif}"`}
                />
                <div className="extra-detail">
                  {moment(item.createdAt).fromNow()}
                </div>
              </List.Item>
            )}
          />
        </TabPane>
        <TabPane tab="Actions à réaliser" key="2">
          <Row>
            <Col span={8}>
              {/* <Title level={4}>Activités d’aujourd’hui</Title> */}
            </Col>
            <Col span={10} offset={6}>
              <div className="space-align-block">
                <Space size="large" align="baseline">
                  <Input
                    placeholder="Rechercher"
                    prefix={<SearchOutlined />}
                    style={{
                      height: "42px",
                      lineHeight: "30px",
                      borderColor: "#8E8E93",
                    }}
                  />
                </Space>
              </div>
            </Col>
          </Row>
          <List
            className="action-list"
            itemLayout="horizontal"
            dataSource={reciever}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={
                    <span to={`/view/${item._id}`}>
                      <strong>{item.sender.firstname}</strong> vous a assigné un
                      modele pour <strong>{item.taskType}</strong>
                    </span>
                  }
                  description={`"${item.motif}"`}
                />
                <div className="extra-detail">
                  {moment(item.createdAt).fromNow()}
                </div>
              </List.Item>
            )}
          />
        </TabPane>

        <TabPane tab="Actions faites" key="3">
          <Row>
            <Col span={8}>
              {/* <Title level={4}>Liste des actes signés</Title> */}
            </Col>
            <Col span={10} offset={6}>
              <div className="space-align-block">
                <Space size="large" align="baseline">
                  <Input
                    placeholder="Rechercher"
                    prefix={<SearchOutlined />}
                    style={{
                      height: "42px",
                      lineHeight: "30px",
                      borderColor: "#8E8E93",
                    }}
                  />
                </Space>
              </div>
            </Col>
          </Row>
          <List
            className="action-list"
            itemLayout="horizontal"
            dataSource={[]}
            // renderItem={(item) => (
            //   <List.Item>
            //     <List.Item.Meta
            //       title={
            //         <Link to={`/view/${item._id}`}>
            //           Vous avez assigné un modele pour{" "}
            //           <strong>{item.taskType}</strong> à{" "}
            //           <strong>{item.reciever.firstname}</strong>
            //         </Link>
            //       }
            //       description={`"${item.motif}"`}
            //     />
            //     <div className="extra-detail">
            //       {moment(item.createdAt).fromNow()}
            //     </div>
            //   </List.Item>
            // )}
          />
        </TabPane>
      </Tabs>
    </>
  );
};

export default Action;
