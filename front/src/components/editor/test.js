componentDidMount() {
    const reader = new FileReader();
    reader.onloadend = (e) => {
      // console.log(e.target.result);
      const arrayBuffer = e.target.result;
      console.log(arrayBuffer);
      const data = mammoth
        .convertToHtml({ arrayBuffer: arrayBuffer })
        .then(async (resultObject) => {
          arrayBuffer.innerHTML = resultObject.value;
          // console.log(resultObject.value);
          return await resultObject.value;
        });
      // const zip = new PizZip(e.target.result);
      // const doc = new Docxtemplater(zip, {
      //   paragraphLoop: true,
      //   linebreaks: true,
      //   delimiters:true
      // })
      // const text = doc.getFullText();
      // this.setState({
      //   model: data,
      // });
      // console.log();
      data.then((data) => {
        console.log(data);
        this.setState({
          model: data,
        });
      });
    };
    reader.readAsArrayBuffer(this.props.model);
  }


  componentDidMount() {
    const reader = new FileReader();
    reader.onloadend = (e) => {
      // console.log(e.target.result);
      const zip = new PizZip(e.target.result);
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
        delimiters:true
      })
      const text = doc;
  
      console.log(text);
      this.setState({
        model: text,
      });
    };
    reader.readAsBinaryString(this.props.model);

  }