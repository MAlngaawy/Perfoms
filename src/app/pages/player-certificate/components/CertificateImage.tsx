import { forwardRef, useEffect } from "react";
import { PlayerCertificate } from "~/app/store/types/parent-types";

type Props = {
  certificate: PlayerCertificate;
};

const CertificateImage = forwardRef(({ certificate }: Props, ref) => {
  useEffect(() => {
    //@ts-ignore
    const ctx = ref.current.getContext("2d");
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = "/assets/images/certificate.png";
    image.onload = () => {
      ctx.drawImage(image, 0, 0, 1200, 840);
      ctx.font = "600 48px 'Old English Text MT Regular'";
      ctx.textAlign = "center";
      ctx.fillStyle = "#000000";
      ctx.fillText(certificate.player.name, 600, 420);
      ctx.font =
        "normal 30px -apple-system, BlinkMacSystemFont, “regular”, sans-serif";
      ctx.textAlign = "center";
      ctx.fillStyle = "#000000";
      ctx.fillText(
        new Date(certificate.created_at).toLocaleDateString(),
        600,
        640
      );
    };
  }, [certificate, ref]);
  return (
    <div
      id={"" + 564654}
      className="flex flex-col bg-black justify-center items-center"
    >
      {/* @ts-ignore */}
      <canvas className="bg-black" ref={ref} width={1200} height={840} />
    </div>
  );
});

export default CertificateImage;
