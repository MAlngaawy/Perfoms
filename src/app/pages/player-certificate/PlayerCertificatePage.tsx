import jsPDF from "jspdf";
import { useRef } from "react";
import { useSelector } from "react-redux";
import AppIcons from "~/@main/core/AppIcons";
import CertificateImage from "./components/CertificateImage";
import CongratsCertificate from "./components/CongratsCertificateImage";
import EncourageCertificate from "./components/EncourageCertificateImage";
import { timeFilterFn } from "~/app/store/parent/parentSlice";
import {
  useGetMyClubQuery,
  useGetPlayerCertificateQuery,
} from "~/app/store/user/userApi";

type Props = {
  certificateId?: number;
};

const PlayerCertificatePage = ({ certificateId }: Props) => {
  const { data: myClub } = useGetMyClubQuery({});
  const canvasRef = useRef<any>();
  const printRef = useRef<any>();
  const { data: certificate } = useGetPlayerCertificateQuery(
    certificateId as unknown as string,
    {
      skip: !certificateId,
    }
  );

  const timeFilter = useSelector(timeFilterFn);

  const printDocument = () => {
    //@ts-ignore
    const imgData = printRef?.current.toDataURL("image/png");
    const pdf = new jsPDF("landscape");
    pdf.addImage(imgData, "png", 23, 10, 253, 0);
    pdf.save(`${certificate?.player.name} certificate.pdf`);
  };

  const PrintIcon = () => (
    <div
      onClick={() => printDocument()}
      className="z-50 flex flex-col border items-center justify-center absolute  right-0 bottom-0 opacity-70 hover:opacity-100 w-12 h-12 rounded-full cursor-pointer bg-perfBlue text-white"
    >
      <AppIcons
        className="w-5 h-5 text-white"
        icon="DocumentArrowDownIcon:outline"
      />
      <span className="text-xs">PDF</span>
    </div>
  );

  return (
    <div className=" relative flex flex-col gap-5 justify-center items-center h-full w-full">
      <div className="overflow-scroll md:overflow-hidden max-w-full">
        {certificate &&
          certificate.created_at.getMonth() === +timeFilter.month &&
          certificate.created_at.getFullYear() === +timeFilter.year &&
          (certificate.type === "Encouragement" ? (
            <div className="my-6">
              <PrintIcon />
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
              <PrintIcon />
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
              <PrintIcon />
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
