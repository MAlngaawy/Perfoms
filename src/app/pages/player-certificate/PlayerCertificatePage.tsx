import jsPDF from "jspdf";
import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import AppIcons from "~/@main/core/AppIcons";
import { usePlayerCertificateQuery } from "~/app/store/parent/parentApi";
import CertificateImage from "./components/CertificateImage";

type Props = {};

const PlayerCertificatePage = (props: Props) => {
  const canvasRef = useRef(null);
  const { id } = useParams();
  const { data: certificate } = usePlayerCertificateQuery(id as string, {
    skip: !id,
  });

  const printDocument = () => {
    //@ts-ignore
    const imgData = canvasRef?.current.toDataURL("image/png");
    const pdf = new jsPDF("landscape");
    pdf.addImage(imgData, "JPEG", 23, 10, 253, 0);
    pdf.save("Player Name certificate.pdf");
  };

  return (
    <div className="flex flex-col gap-5 justify-center items-center p-5 h-full w-full">
      <div
        onClick={() => printDocument()}
        className="z-50 flex flex-col items-center justify-center  fixed right-20 bottom-20 opacity-70 hover:opacity-100 w-20 h-20 rounded-full cursor-pointer bg-perfBlue text-white"
      >
        <AppIcons
          className="w-8 h-8 text-white"
          icon="DocumentArrowDownIcon:outline"
        />
        <span>PDF</span>
      </div>
      <h2 className="font-extrabold text-3xl">
        Player {certificate?.player.name} Certificate
      </h2>
      <div>
        {certificate && (
          <CertificateImage certificate={certificate} ref={canvasRef} />
        )}
      </div>
    </div>
  );
};

export default PlayerCertificatePage;
