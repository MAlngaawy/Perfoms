import { forwardRef, useEffect } from "react";
import { PlayerCertificate } from "~/app/store/types/parent-types";

type Props = {
  certificate: PlayerCertificate;
};

const CertificateImage = forwardRef(({ certificate }: Props, ref) => {
  let myFont = new FontFace("old-english", "url(/assets/fonts/OLD.ttf)");

  useEffect(() => {
    myFont.load().then((font) => {
      console.log(font);
      document.fonts.add(font);

      //@ts-ignore
      const ctx = ref.current.getContext("2d");
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.src = "/assets/images/certificate-image.png";
      image.onload = () => {
        ctx.drawImage(image, 0, 0, 1080, 774);
        ctx.letterSpacing = "10px";
        ctx.font = "50px old-english";
        ctx.textAlign = "center";
        ctx.fillStyle = "#000000";
        ctx.fillText(certificate.player.name, 550, 400);
        ctx.letterSpacing = "1px";
        ctx.font = "30px serif";
        ctx.fillText(
          `We are so impressed by your performance for last period.`,
          550,
          500
        );
        ctx.fillText(
          `Honestly, you are such an inspiration to us all`,
          550,
          540
        );
        ctx.font =
          "normal 20px -apple-system, BlinkMacSystemFont, “regular”, sans-serif";
        ctx.textAlign = "center";
        ctx.fillStyle = "#4F4F4F";
        ctx.fillText(
          new Date(certificate.created_at).toLocaleDateString(),
          550,
          633
        );
      };
    });
  }, [certificate, ref]);
  return (
    <div
      id={"" + 564654}
      className="flex flex-col bg-black justify-center items-center"
    >
      {/* @ts-ignore */}
      <canvas className="bg-black" ref={ref} width={1080} height={774} />
    </div>
  );
});

export default CertificateImage;
