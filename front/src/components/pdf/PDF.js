import React, { useState } from "react";
import { Button } from 'antd';
import { Document, Page, pdfjs } from "react-pdf";
import "./styles.scss";

export default function PDF({ url }) {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  /*To Prevent right click on screen*/
  document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });

  /*When document gets loaded successfully*/
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }
  return (
    <>
      <div className="main">
        <div className="page">
          Page {pageNumber || (numPages ? 1 : "--")} sur {numPages || "--"}
        </div>
        <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
        <div className="footer">
          <div className="actions">
            <Button
              disabled={pageNumber <= 1}
              onClick={previousPage}
            >
              Précédent
            </Button>
            <Button
              type="primary"
              disabled={pageNumber >= numPages}
              onClick={nextPage}
            >
              Suivant
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
