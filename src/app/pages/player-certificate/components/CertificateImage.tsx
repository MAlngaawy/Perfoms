import { forwardRef, useEffect } from "react";
import { PlayerCertificate } from "~/app/store/types/parent-types";
import useWindowSize from "../../../../@main/hooks/useWindowSize";

type Props = {
  certificate: Partial<PlayerCertificate>;
  forPrint?: boolean;
};

const CertificateImage = forwardRef(({ certificate, forPrint }: Props, ref) => {
  let myFont = new FontFace("old-english", "url(/assets/fonts/OLD.ttf)");
  const screen = useWindowSize();

  let screenWidth = screen.width - 50;
  let canvasWidth = 880;
  let canvasHeight = 550;
  let namePosition = {
    x: 450,
    y: 290,
    fontSize: 40,
    letterSpacing: 10,
  };
  let datePosition = {
    x: 490,
    y: 450,
    fontSize: 20,
  };
  if (forPrint === true) {
    screenWidth = 2000;
  }
  if (screenWidth < 1200 && !forPrint) {
    canvasWidth = screenWidth;
    canvasHeight = screenWidth * 0.625;
    namePosition.x = screenWidth * 0.511363636;
    namePosition.y = screenWidth * 0.329545455;
    namePosition.fontSize = screenWidth * 0.045;
    namePosition.letterSpacing = screenWidth * 0.011363636;
    datePosition.x = screenWidth * 0.556818182;
    datePosition.y = screenWidth * 0.511363636;
    datePosition.fontSize = screenWidth * 0.022727273;
  }

  useEffect(() => {
    myFont.load().then((font) => {
      document.fonts.add(font);

      //@ts-ignore
      const ctx = ref.current.getContext("2d");
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.src = "/assets/images/performance_certificate2.png";
      image.onload = () => {
        ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);
        ctx.letterSpacing = `${namePosition.letterSpacing}px`;
        ctx.font = `${namePosition.fontSize}px old-english`;
        ctx.textAlign = "center";
        ctx.fillStyle = "#000000";
        ctx.fillText(
          certificate && certificate?.player?.name,
          namePosition.x,
          namePosition.y
        );
        ctx.font = `normal ${datePosition.fontSize}px -apple-system, BlinkMacSystemFont, “regular”, sans-serif`;
        ctx.textAlign = "center";
        ctx.fillStyle = "#4F4F4F";
        ctx.fillText(
          new Date(
            (certificate && certificate && certificate?.created_at) || ""
          ).toLocaleDateString(),
          datePosition.x,
          datePosition.y
        );
      };
    });
  }, [certificate, ref, screenWidth]);
  return (
    <div
      id={"" + 564654}
      className="flex flex-col bg-black justify-center items-center"
    >
      <canvas
        className="bg-black"
        //@ts-ignore
        ref={ref}
        width={canvasWidth}
        height={canvasHeight}
      />
    </div>
  );
});

export default CertificateImage;
