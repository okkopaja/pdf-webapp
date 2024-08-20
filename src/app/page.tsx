"use client"
import React from "react";
import PdfUploader from "./component/PdfUploader";

const Home: React.FC = () => {
  return (
    <div>
      <h1>PDF Upload Example</h1>
      <PdfUploader />
    </div>
  );
};

export default Home;
