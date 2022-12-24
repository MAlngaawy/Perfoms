import { forwardRef, useEffect } from "react";
import { PlayerCertificate } from "~/app/store/types/parent-types";

type Props = {
  certificate: PlayerCertificate | undefined;
};

const CongratsCertificate = forwardRef(({ certificate }: Props, ref) => {
  let myFont = new FontFace("old-english", "url(/assets/fonts/OLD.ttf)");

  useEffect(() => {
    myFont.load().then((font) => {
      console.log(font);
      document.fonts.add(font);

      //@ts-ignore
      const ctx = ref.current.getContext("2d");
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.src = "/assets/images/congrates_certificate.png";
      image.onload = () => {
        ctx.drawImage(image, 0, 0, 1080, 774);
        ctx.letterSpacing = "10px";
        ctx.font = "50px old-english";
        ctx.textAlign = "center";
        ctx.fillStyle = "#000000";
        ctx.fillText(certificate && certificate.player.name, 470, 365);
        ctx.font =
          "normal 20px -apple-system, BlinkMacSystemFont, “regular”, sans-serif";
        ctx.textAlign = "center";
        ctx.fillStyle = "#4F4F4F";
        ctx.fillText(
          new Date(
            certificate ? certificate.created_at : ""
          ).toLocaleDateString(),
          475,
          632
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

export default CongratsCertificate;
