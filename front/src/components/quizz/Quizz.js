import React, { useState } from "react";
import { Button, Layout, Typography, Result } from "antd";
import { FileMarkdownOutlined } from "@ant-design/icons";
import { questionnaire } from "../../helpers/model-generator";
import "./style.scss";

const Quizz = () => {
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
                    onClick={() => {}}
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
                    questionnaire.find((item) => item.id === currentQuestion)
                      .question
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
    </>
  );
};

export default Quizz;
