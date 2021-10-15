import React from "react";
import { Editor as TinyEditor } from "@tinymce/tinymce-react";
// To read the docx file
import * as mammoth from "mammoth";
import "./style.scss";

class Editor extends React.Component {
  constructor() {
    super();
    this.state = {
      model: "",
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

  handleEditorChange(e) {
    // console.log(e);
  }

  render() {
    return (
      <>
        <TinyEditor
          apiKey="vloxe5omtla83noe6u0pkvwvwgcgwhfxlihru15ayyg5fygj"
          initialValue={this.state.model}
          onEditorChange={this.handleEditorChange}
          onInit={() => {
            document
              .getElementsByTagName("iframe")[0]
              .contentWindow.document.getElementById("tinymce").style.margin =
              "2.5rem auto 0";
            document
              .getElementsByTagName("iframe")[0]
              .contentWindow.document.getElementsByTagName(
                "html"
              )[0].style.background = "#f8f9fa";
          }}
          init={{
            language: "fr_FR",
            height: 800,
            menubar: false,
            selector: "textarea",
            content_css: "document",
            // skin: "fabric",
            // skin: "material-outline",
            skin: "material-classic",
            icons: "fabric",
            plugins: "print link image lists advlist wordcount table",
            toolbar:
              "undo redo print | styleselect | fontselect fontsizeselect bold italics underline forecolor backcolor | link image | table |alignleft aligncenter alignright alignjustify |lineheight | numlist bullist indent outdent | removeformat",
            file_picker_types: "file image media",
          }}
        />
      </>
    );
  }
}

export default Editor;
