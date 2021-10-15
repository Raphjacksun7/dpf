import React, { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Modal, Result, Button, Input } from "antd";

import { getTask, updateTask } from "../../actions/task";
import { getDModel } from "../../actions/d-model";
import { updateDModel } from "../../actions/d-model";

import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import lottie from "lottie-web";
import bleuMoney from "../../assets/json/blue-money.json";

const ValidateAction = ({ location }) => {
  const { id } = useParams();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const task = useSelector((state) => state.task.task);
  const taskRef = useRef();
  taskRef.current = task;
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    console.log(location);
    dispatch(getTask(id)).then(() => {
      dispatch(getDModel(taskRef.current.ressourceId));
    });
    lottie.loadAnimation({
      container: document.querySelector("#blue-money"),
      animationData: bleuMoney,
      renderer: "canvas", // "svg", "html", "canvas"
      loop: true, // boolean
      autoplay: true, // boolean
    });
  }, []);

  function inValidate() {}

  return (
    <>
      <div className="validate-action">
        <span onClick={() => history.goBack()}>RETOUR</span>
        <Result
          icon={
            <div id="blue-money" style={{ width: "500px", margin: "auto" }} />
          }
          title={<h4>Confirmez-vous la validation financière ?</h4>}
          extra={[
            <Button onClick={() => setIsModalVisible(true)}>Non</Button>,
            <Button type="primary" onClick={() => {}}>
              Oui
            </Button>,
          ]}
        />
        <Modal
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
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
      </div>
    </>
  );
};

export default ValidateAction;
