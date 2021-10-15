import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Typography, Button, Layout, Result, Spin } from "antd";
import { FileMarkdownOutlined, LoadingOutlined } from "@ant-design/icons";
import { questionnaire } from "../../data/questionnaire";
import dataURItoBlob from "../../helpers/toBlob";
import "./styles.scss";
import "./quizz.scss";

const GenerateModel = () => {
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const { id } = useParams();
  const history = useHistory();

  const [currentQuestion, setCurrentQuestion] = useState("1");
  const [showResult, setShowshowResult] = useState(false);

  const handleAnswerOptionClick = (answer) => {
    if (!answer.result) {
      setCurrentQuestion(answer.nextQuestion);
    } else {
      setShowshowResult(answer.result);
    }
  };

  return (
    <>
      <Typography.Title level={3} style={{ textAlign: "center" }}>
        Générer votre modèle en quelques étapes
      </Typography.Title>
      <Spin className="quizz-spin" indicator={<LoadingOutlined/>} spinning={confirmLoading} tip="Ouverture du modèle...">
        <div className="flex justify-center mt-20 mb-20">
          <Layout.Content style={{ padding: "0 50px" }}>
            <div className="app">
              {showResult ? (
                <div className="result-section">
                  <Result
                    icon={<FileMarkdownOutlined />}
                    title={showResult.message}
                    subTitle={
                      <span>
                        Voulez-vous revenir au questionnaire?{" "}
                        <span
                          className="link"
                          onClick={() => {
                            setCurrentQuestion("1");
                            setShowshowResult(false);
                          }}
                        >
                          Cliquez Ici
                        </span>{" "}
                      </span>
                    }
                    extra={
                      <Button
                        className="d_btn_primary"
                        type="primary"
                        onClick={() => {
                          setConfirmLoading(true);
                          var request = new XMLHttpRequest();
                          request.open("GET", showResult.url, true);
                          request.responseType = "blob";
                          request.onload = function () {
                            var reader = new FileReader();
                            reader.readAsDataURL(request.response);
                            reader.onload = function (e) {
                              setConfirmLoading(false);
                              console.log(dataURItoBlob(e.target.result));
                              history.replace(`/editor/new/${id}`, {
                                data: dataURItoBlob(e.target.result),
                              });
                            };
                          };
                          request.send();
                        }}
                      >
                        Commencer la génération
                      </Button>
                    }
                  />
                </div>
              ) : (
                <>
                  <div className="question-section">
                    <Typography.Title level={2} style={{ textAlign: "center" }}>
                      {
                        questionnaire.find(
                          (item) => item.id === currentQuestion
                        ).question
                      }
                    </Typography.Title>
                  </div>
                  <div className="answer-section">
                    {console.log(
                      questionnaire.find((item) => item.id === currentQuestion)
                    )}
                    {questionnaire
                      .find((item) => item.id === currentQuestion)
                      .answers.map((answerOption) => (
                        <button
                          onClick={() => handleAnswerOptionClick(answerOption)}
                        >
                          {answerOption.option}
                        </button>
                      ))}
                  </div>
                </>
              )}
            </div>
          </Layout.Content>
        </div>
      </Spin>
    </>
  );
};

export default GenerateModel;
