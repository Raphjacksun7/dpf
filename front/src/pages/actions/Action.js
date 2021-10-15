import React, { useEffect, useRef, useState } from "react";
import {
  Row,
  Col,
  Typography,
  Input,
  Tabs,
  List,
  Modal,
  notification,
  Button,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Icon } from "@iconify/react";
import comment48Regular from "@iconify/icons-fluent/comment-48-regular";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import lottie from "lottie-web";
import dataURItoBlob from "../../helpers/toBlob";

import {
  getTask,
  getTasksBySender,
  getTasksByReciever,
  updateTask,
} from "../../actions/task";
import { getDModel } from "../../actions/d-model";
import bleuMoney from "../../assets/json/blue-money.json";
import bleuMoney2 from "../../assets/gif/blue-money.gif";

import "./styles.scss";

const Action = () => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [validating, setValidating] = useState(false);
  const [confirmeValidateModal, setConfirmeValidateModal] = useState({
    state: false,
    data: null,
  });
  const [invalideModal, setInvalideModal] = useState(false);
  const [taskFilter, setTaskFilter] = useState("");
  const auth = useSelector((state) => state.auth.user);
  const sender = useSelector((state) => state.task.sender);
  const reciever = useSelector((state) => state.task.reciever);
  const task = useSelector((state) => state.task.task);
  const dModel = useSelector((state) => state.dModel.dModel);
  const dispatch = useDispatch();
  const taskRef = useRef();
  const dModelRef = useRef();
  taskRef.current = task;
  dModelRef.current = dModel;
  const history = useHistory();
  useEffect(() => {
    dispatch(getTasksBySender(auth.sub));
    dispatch(getTasksByReciever(auth.sub));
    lottie.loadAnimation({
      container: document.querySelector("#blue-money"),
      animationData: bleuMoney,
      renderer: "canvas", // "svg", "html", "canvas"
      loop: true, // boolean
      autoplay: true, // boolean
    });
  }, []);

  function validate(data) {
    setValidating(true);
    dispatch(getTask(data)).then(() => {
      dispatch(
        updateTask(taskRef.current._id, {
          ...taskRef.current,
          status: "FAIRE",
        })
      )
        .then(() => {
          setValidating(false);
          setConfirmeValidateModal(false);
          notification.success({
            message: "Vous avez validez ce modèle !",
            description: null,
            duration: 3,
          });
        })
        .catch(() => {
          setValidating(false);
          setConfirmeValidateModal(false);
          notification.error({
            message: "Vous avez validez ce modèle !",
            description: null,
            duration: 3,
          });
        });
    });
  }

  function inValidate() {}

  return (
    <>
      <div className="block">
        <div className="title">
          <Typography.Title level={2}>Actions</Typography.Title>
        </div>
      </div>
      <Tabs defaultActiveKey="1" size="middle" centered>
        <Tabs.TabPane tab="Mes assignations" key="1">
          <Row>
            <Col span={12} offset={6} className="search-block">
              <Input
                placeholder="Rechercher"
                prefix={<SearchOutlined />}
                style={{
                  height: "42px",
                  lineHeight: "30px",
                  borderColor: "#8E8E93",
                }}
                value={taskFilter}
                onChange={(e) => setTaskFilter(e.target.value.toLowerCase())}
              />
            </Col>
          </Row>
          <List
            className="action-list"
            itemLayout="horizontal"
            dataSource={sender.filter((item) => {
              return (
                item.motif.toLowerCase().indexOf(taskFilter.toLowerCase()) !==
                  -1 ||
                item.reciever.firstname
                  .toLowerCase()
                  .indexOf(taskFilter.toLowerCase()) !== -1
              );
            })}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={
                    <span>
                      Vous avez assigné un modèle pour{" "}
                      <strong>{item.taskType.toLowerCase()}</strong> à{" "}
                      <strong>{item.reciever.firstname}</strong>
                    </span>
                  }
                  description={
                    item.motif ? (
                      <>
                        <Icon icon={comment48Regular} />"{item.motif}"
                      </>
                    ) : (
                      "Pas de motif"
                    )
                  }
                />
                <div className="extra-detail">
                  {moment(item.createdAt).fromNow()}
                </div>
              </List.Item>
            )}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Actions à réaliser" key="2">
          <Row>
            <Col span={12} offset={6} className="search-block">
              <Input
                placeholder="Rechercher"
                prefix={<SearchOutlined />}
                style={{
                  height: "42px",
                  lineHeight: "30px",
                  borderColor: "#8E8E93",
                }}
                value={taskFilter}
                onChange={(e) => setTaskFilter(e.target.value.toLowerCase())}
              />
            </Col>
          </Row>
          <List
            className="action-list"
            itemLayout="horizontal"
            dataSource={reciever
              .filter((task) => {
                return task.status === "ATTENTE" && task.sender !== null;
              })
              .filter((item) => {
                return (
                  item.motif.toLowerCase().indexOf(taskFilter.toLowerCase()) !==
                    -1 ||
                  item.sender.firstname
                    .toLowerCase()
                    .indexOf(taskFilter.toLowerCase()) !== -1
                );
              })}
            renderItem={(item) => (
              <List.Item>
                {item.taskType === "REVISION" ? (
                  <List.Item.Meta
                    onClick={() => {
                      dispatch(getTask(item._id)).then(() => {
                        dispatch(getDModel(taskRef.current.ressourceId)).then(
                          () => {
                            var request = new XMLHttpRequest();
                            request.open(
                              "GET",
                              dModelRef.current.fileURI.replace(
                                "http://",
                                "https://"
                              ),
                              true
                            );
                            request.responseType = "blob";
                            request.onload = function () {
                              var reader = new FileReader();
                              reader.readAsDataURL(request.response);
                              reader.onload = function (e) {
                                setConfirmLoading(false);
                                console.log(dataURItoBlob(e.target.result));
                                console.log(dModelRef.current.fileURI);
                                history.push(`/action/${item._id}`, {
                                  data: dataURItoBlob(e.target.result),
                                });
                              };
                            };
                            request.send();
                            setConfirmLoading(true);
                          }
                        );
                      });
                    }}
                    title={
                      <span>
                        <strong>{item.sender.firstname}</strong> vous a assigné
                        un modele pour{" "}
                        <strong>{item.taskType.toLowerCase()}</strong>
                      </span>
                    }
                    description={
                      item.motif ? (
                        <>
                          <Icon icon={comment48Regular} />"{item.motif}"
                        </>
                      ) : (
                        "Pas de motif"
                      )
                    }
                  />
                ) : (
                  <List.Item.Meta
                    onClick={() => {
                      setConfirmeValidateModal({ state: true, data: item._id });
                    }}
                    title={
                      <span>
                        <strong>{item.sender.firstname}</strong> vous a assigné
                        un modele pour{" "}
                        <strong>{item.taskType.toLowerCase()}</strong>
                      </span>
                    }
                    description={
                      item.motif ? (
                        <>
                          <Icon icon={comment48Regular} />"{item.motif}"
                        </>
                      ) : (
                        "Pas de motif"
                      )
                    }
                  />
                )}

                <div className="extra-detail">
                  {moment(item.createdAt).fromNow()}
                </div>
              </List.Item>
            )}
          />
        </Tabs.TabPane>

        <Tabs.TabPane tab="Actions faites" key="3">
          <Row>
            <Col span={12} offset={6} className="search-block">
              <Input
                placeholder="Rechercher"
                prefix={<SearchOutlined />}
                style={{
                  height: "42px",
                  lineHeight: "30px",
                  borderColor: "#8E8E93",
                }}
                value={taskFilter}
                onChange={(e) => setTaskFilter(e.target.value.toLowerCase())}
              />
            </Col>
          </Row>
          <List
            className="action-list"
            itemLayout="horizontal"
            dataSource={reciever
              .filter((task) => {
                return task.status === "FAIRE";
              })
              .filter((item) => {
                return (
                  item.motif.toLowerCase().indexOf(taskFilter.toLowerCase()) !==
                    -1 ||
                  item.sender.firstname
                    .toLowerCase()
                    .indexOf(taskFilter.toLowerCase()) !== -1
                );
              })
              // To sort the array data by the last element updated
              .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={
                    <span>
                      Vous avez réalisé cette action de{" "}
                      <strong>{item.sender.firstname}</strong>
                    </span>
                  }
                  description={
                    item.motif ? (
                      <>
                        <Icon icon={comment48Regular} />"{item.motif}"
                      </>
                    ) : (
                      "Pas de motif"
                    )
                  }
                />
                <div className="extra-detail">
                  {moment(item.updatedAt).fromNow()}
                </div>
              </List.Item>
            )}
          />
        </Tabs.TabPane>
      </Tabs>
      <Modal
        className="validation-modal"
        okText="Oui"
        cancelText="Non"
        visible={confirmeValidateModal.state}
        onCancel={() => setConfirmeValidateModal({ state: false })}
        footer={
          <>
            <Button onClick={() => setInvalideModal(true)}>Non</Button>
            <Button
              type="primary"
              loading={validating}
              onClick={() => validate(confirmeValidateModal.data)}
            >
              Oui
            </Button>
          </>
        }
      >
        <img
          src={bleuMoney2}
          alt="Blue Money"
          style={{ width: "200px", margin: "auto" }}
        />
        <h4>Confirmez-vous la validation financière ?</h4>
      </Modal>
      <Modal
        visible={invalideModal}
        onCancel={() => setInvalideModal(false)}
        className="validation-modal"
        footer={
          <Button type="primary" onClick={() => inValidate()}>
            Envoyer
          </Button>
        }
      >
        <span>Message</span>
        <Input.TextArea
          rows={5}
          placeholder="Décrivez pourquoi vous n'avez pas validé ici"
        />
      </Modal>
    </>
  );
};

export default Action;
