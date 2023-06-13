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
import { useGetMyClubQuery } from "~/app/store/user/userApi";

type Props = {
  certificateId?: number;
};

const PlayerCertificatePage = ({ certificateId }: Props) => {
  const { data: myClub } = useGetMyClubQuery({});
  const canvasRef = useRef<any>();
  const printRef = useRef<any>();
  // const { id } = useParams();
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
    const imgData = printRef?.current.toDataURL("image/png");
    const pdf = new jsPDF("landscape");
    pdf.addImage(imgData, "png", 23, 10, 253, 0);
    pdf.save(`${certificate?.player.name} certificate.pdf`);
  };

  return (
    <div className=" relative flex flex-col gap-5 justify-center items-center h-full w-full">
      <div className="overflow-scroll md:overflow-hidden max-w-full">
        {certificate &&
          dateFilter(certificate.created_at) &&
          (certificate.type === "Encouragement" ? (
            <div className="my-6">
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
              <div>
                <EncourageCertificate
                  clubLogo={myClub?.icon}
                  forPrint={false}
                  ref={canvasRef}
                  certificate={certificate}
                />
              </div>
              <div className="hidden">
                <EncourageCertificate
                  clubLogo={myClub?.icon}
                  certificate={certificate}
                  ref={printRef}
                  forPrint={true}
                />
              </div>
            </div>
          ) : certificate.type === "Congratulations" ? (
            <div className="my-6">
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
              <div>
                <CongratsCertificate
                  clubLogo={myClub?.icon}
                  forPrint={false}
                  ref={canvasRef}
                  certificate={certificate}
                />
              </div>
              <div className="hidden">
                <CongratsCertificate
                  clubLogo={myClub?.icon}
                  certificate={certificate}
                  ref={printRef}
                  forPrint={true}
                />
              </div>
            </div>
          ) : (
            <div className="my-6">
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
              <div>
                <CertificateImage
                  clubLogo={myClub?.icon}
                  forPrint={false}
                  ref={canvasRef}
                  certificate={certificate}
                />
              </div>
              <div className="hidden">
                <CertificateImage
                  clubLogo={myClub?.icon}
                  certificate={certificate}
                  ref={printRef}
                  forPrint={true}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PlayerCertificatePage;
