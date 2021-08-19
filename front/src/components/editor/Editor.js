import React from "react";
// froala
// Require Editor JS files.
import FroalaEditor from "react-froala-wysiwyg";
import { FroalaConfig } from "./config/froala-config";
import "froala-editor/js/languages/fr";

// Require Editor CSS files.
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/plugins.pkgd.min.js";

// Require Font Awesome.
import "font-awesome/css/font-awesome.css";

// tribute
import tribute from "./tribute";
import "tributejs/dist/tribute.css";
// To read the docx file
import * as mammoth from "mammoth";
import "./style.scss";

class Editor extends React.Component {
  constructor() {
    super();
    this.state = {
      model: "",
      config: FroalaConfig,
    };
  }

  componentDidMount() {
    if (this.props.model) {
      switch (this.props.contentType) {
        case "docx":
          const docxReader = new FileReader();
          docxReader.onloadend = (e) => {
            const arrayBuffer = e.target.result;
            console.log(arrayBuffer);
            const data = mammoth
              .convertToHtml({ arrayBuffer: arrayBuffer })
              .then(async (resultObject) => {
                arrayBuffer.innerHTML = resultObject.value;
                return await resultObject.value;
              });

            data.then((data) => {
              console.log(data);
              this.setState({
                model: data,
              });
            });
          };
          docxReader.readAsArrayBuffer(this.props.model.data);
          break;

        case "html":
          const htmlReader = new FileReader();
          htmlReader.onloadend = (e) => {
            const arrayBuffer = e.target.result;
            console.log(arrayBuffer);
            this.setState({
              model: arrayBuffer,
            });
          };
          htmlReader.readAsText(this.props.model.data);
          break;

        default:
          this.setState({
            model: "",
          });
          break;
      }
    }
  }

  render() {
    return (
      <>
        <FroalaEditor config={this.state.config} model={this.state.model} />
      </>
    );
  }
}

export default Editor;
