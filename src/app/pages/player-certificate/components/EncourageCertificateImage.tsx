import { forwardRef, useEffect } from "react";
import { PlayerCertificate } from "~/app/store/types/parent-types";

type Props = {
  certificate: Partial<PlayerCertificate>;
  forPrint?: boolean;
  clubLogo?: string;
};

const EncourageCertificate = forwardRef(
  ({ certificate, clubLogo }: Props, ref) => {
    let myFont = new FontFace("old-english", "url(/assets/fonts/OLD.ttf)");
    let coachNameFont = new FontFace(
      "alex-brush",
      "url(/assets/fonts/AlexBrush-Regular.ttf)"
    );
    useEffect(() => {
      coachNameFont.load().then((font) => {
        document.fonts.add(font);

        myFont.load().then((font) => {
          document.fonts.add(font);

          //@ts-ignore
          const ctx = ref.current.getContext("2d");
          const image = new Image();
          image.crossOrigin = "anonymous";
          image.src = "/assets/images/encourage_certificate2.png";
          image.onload = () => {
            ctx.drawImage(image, 0, 0, 880, 550);
            ctx.drawImage(logoImage, 580, 360);

            ctx.letterSpacing = "10px";
            ctx.font = "30px old-english";
            ctx.textAlign = "center";
            ctx.fillStyle = "#000000";
            ctx.fillText(certificate && certificate?.player?.name, 500, 270);
            ctx.font =
              "normal 20px -apple-system, BlinkMacSystemFont, “regular”, sans-serif";
            ctx.textAlign = "center";
            ctx.fillStyle = "#4F4F4F";
            ctx.fillText(
              new Date(
                (certificate && certificate && certificate?.created_at) || ""
              ).toLocaleDateString(),
              450,
              530
            );
            ctx.font = "30px alex-brush";
            ctx.letterSpacing = "5px";
            ctx.fillText(
              certificate &&
                certificate.coach?.first_name +
                  " " +
                  certificate.coach?.last_name,
              350,
              430
            );
          };
        });
      });
    }, [certificate, ref]);
    const logoImage = new Image();
    logoImage.src =
      clubLogo ||
      "https://djangoperforms.blob.core.windows.net/media/icons/0afcc4caf5964f97ab7393d97bff37a3.png";
    return (
      <div id={"" + 564654} className="flex flex-col bg-black">
        {/* @ts-ignore */}
        <canvas className="bg-black" ref={ref} width={880} height={550} />
      </div>
    );
  }
);

export default EncourageCertificate;
