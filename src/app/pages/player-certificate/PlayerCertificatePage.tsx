import jsPDF from "jspdf";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AppIcons from "~/@main/core/AppIcons";
import { usePlayerCertificateQuery } from "~/app/store/parent/parentApi";
import { selectedPlayerFn } from "~/app/store/parent/parentSlice";
import CertificateImage from "./components/CertificateImage";
import CongratsCertificate from "./components/CongratsCertificateImage";
import EncourageCertificate from "./components/EncourageCertificateImage";
import { timeFilterFn } from "~/app/store/parent/parentSlice";

type Props = {
  certificateId?: number;
};

const PlayerCertificatePage = ({ certificateId }: Props) => {
  const canvasRef = useRef<any>();
  const { id } = useParams();
  const { data: certificate } = usePlayerCertificateQuery(
    certificateId as unknown as string,
    {
      skip: !certificateId,
    }
  );

  const timeFilter = useSelector(timeFilterFn);

  const dateFilter = (date: Date): boolean => {
    let theDate = new Date(date).getTime();
    let toDate = new Date(timeFilter.to_date).getTime();
    let fromDate = new Date(timeFilter.from_date).getTime();

    if (theDate > fromDate && theDate < toDate) {
      return true;
    }
    return false;
  };

  const printDocument = () => {
    //@ts-ignore
    const imgData = canvasRef?.current.toDataURL("image/png");
    const pdf = new jsPDF("landscape");
    pdf.addImage(imgData, "JPEG", 23, 10, 253, 0);
    pdf.save(`${certificate?.player.name} certificate.pdf`);
  };

  return (
    <div className=" relative flex flex-col gap-5 justify-center items-center p-5 h-full w-full">
      <div className="overflow-scroll md:overflow-hidden max-w-full">
        {certificate &&
          dateFilter(certificate.created_at) &&
          (certificate.type === "Encouragement" ? (
            <>
              <div
                onClick={() => printDocument()}
                className="z-50 flex flex-col border items-center justify-center absolute  right-0 bottom-0 opacity-70 hover:opacity-100 w-20 h-20 rounded-full cursor-pointer bg-perfBlue text-white"
              >
                <AppIcons
                  className="w-8 h-8 text-white"
                  icon="DocumentArrowDownIcon:outline"
                />
                <span>PDF</span>
              </div>
              <EncourageCertificate certificate={certificate} ref={canvasRef} />
            </>
          ) : certificate.type === "Congratulations" ? (
            <>
              <div
                onClick={() => printDocument()}
                className="z-50 flex flex-col border items-center justify-center absolute  right-0 bottom-0 opacity-70 hover:opacity-100 w-20 h-20 rounded-full cursor-pointer bg-perfBlue text-white"
              >
                <AppIcons
                  className="w-8 h-8 text-white"
                  icon="DocumentArrowDownIcon:outline"
                />
                <span>PDF</span>
              </div>
              <CongratsCertificate certificate={certificate} ref={canvasRef} />
            </>
          ) : (
            <>
              <div
                onClick={() => printDocument()}
                className="z-50 flex flex-col border items-center justify-center absolute  right-0 bottom-0 opacity-70 hover:opacity-100 w-20 h-20 rounded-full cursor-pointer bg-perfBlue text-white"
              >
                <AppIcons
                  className="w-8 h-8 text-white"
                  icon="DocumentArrowDownIcon:outline"
                />
                <span>PDF</span>
              </div>
              <CertificateImage certificate={certificate} ref={canvasRef} />
            </>
          ))}
      </div>
    </div>
  );
};

export default PlayerCertificatePage;
