import jsPDF from "jspdf";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AppIcons from "~/@main/core/AppIcons";
import { usePlayerCertificateQuery } from "~/app/store/parent/parentApi";
import { selectedPlayerFn } from "~/app/store/parent/parentSlice";
import CertificateImage from "./components/CertificateImage";

type Props = {
  certificateId?: number;
};

const PlayerCertificatePage = ({ certificateId }: Props) => {
  const canvasRef = useRef(null);
  const { id } = useParams();
  const { data: certificate } = usePlayerCertificateQuery(
    certificateId as unknown as string,
    {
      skip: !certificateId,
    }
  );

  const printDocument = () => {
    //@ts-ignore
    const imgData = canvasRef?.current.toDataURL("image/png");
    const pdf = new jsPDF("landscape");
    pdf.addImage(imgData, "JPEG", 23, 10, 253, 0);
    pdf.save(`${certificate?.player.name} certificate.pdf`);
  };

  return (
    <div className="flex flex-col gap-5 justify-center items-center p-5 h-full w-full">
      <div
        onClick={() => printDocument()}
        className="z-50 flex flex-col border items-center justify-center  fixed right-10 bottom-10 opacity-70 hover:opacity-100 w-20 h-20 rounded-full cursor-pointer bg-perfBlue text-white"
      >
        <AppIcons
          className="w-8 h-8 text-white"
          icon="DocumentArrowDownIcon:outline"
        />
        <span>PDF</span>
      </div>
      <h2 className=" my-2 text-perfGray2 text-2xl">
        Player <span className="font-bold">{certificate?.player.name}</span>{" "}
        Certificate
      </h2>
      <div className="overflow-scroll max-w-full">
        {certificate && (
          <CertificateImage certificate={certificate} ref={canvasRef} />
        )}
      </div>
    </div>
  );
};

export default PlayerCertificatePage;
