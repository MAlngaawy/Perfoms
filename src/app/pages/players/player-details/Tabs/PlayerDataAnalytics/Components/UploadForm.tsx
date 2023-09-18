import { useDisclosure } from "@mantine/hooks";
import { Group, Text } from "@mantine/core";
import AppIcons from "~/@main/core/AppIcons";
import { useState } from "react";
import axios from "axios";
import SubmitButton from "~/@main/components/SubmitButton";
import AppUtils from "~/@main/utils/AppUtils";
import { useUpdatePlayerMutation } from "~/app/store/user/userApi";
import { useParams } from "react-router";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import cn from "classnames";

type UploadFormProps = {
  setData: any;
  hasData: boolean;
};

const UploadForm = ({ setData, hasData }: UploadFormProps) => {
  const { id: player_id } = useParams();
  // const [opened, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [updatePlayer] = useUpdatePlayerMutation();

  const sendFile = () => {
    setLoading(true);
    const formData = new FormData();
    if (file) {
      formData.append("report", file);
    }
    axios
      .post("https://shehab0717.pythonanywhere.com/analyze", formData)
      .then((res) => {
        setLoading(false);
        setData(res.data);
        updatePlayer({
          player_id: player_id,
          body: {
            analytics: res.data,
          },
        });
        AppUtils.showNotificationFun(
          "Success",
          "Done",
          "Your Data has been analysed"
        );
        setFile(null);
      })
      .catch(() => {
        setLoading(false);
        setFile(null);
        AppUtils.showNotificationFun(
          "Error",
          "Wrong",
          "Please add a file contains a report for you"
        );
      });
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <Dropzone
        loading={loading}
        onDrop={(files) => setFile(files[0])}
        onReject={(files) => console.log("Not Supported file")}
        maxSize={3 * 1024 ** 2}
        multiple={false}
        accept={[MIME_TYPES.png, MIME_TYPES.jpeg, MIME_TYPES.pdf]}
        // className="w-full sm:w-auto"
      >
        <Group
          position="center"
          spacing="xl"
          className="p-2 flex flex-col"
          // sx={{
          //   padding: hasData ? "" : "",
          // }}
        >
          <Dropzone.Accept>
            <AppIcons
              icon="CheckBadgeIcon:solid"
              className={cn("text-scoreGreen", {
                "w-20": !hasData,
                "w-10": hasData,
              })}
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <div className="flex flex-col justify-center items-center gap-4">
              <AppIcons
                icon="XCircleIcon:solid"
                className={cn("text-scoreRed", {
                  "w-20": !hasData,
                  "w-10": hasData,
                })}
              />
              <Text className="bold" size="xl" align="center" inline>
                This File Type is Unsupported
              </Text>
            </div>
          </Dropzone.Reject>
          <Dropzone.Idle>
            {file ? (
              <div className="flex flex-col justify-center items-center gap-4">
                <AppIcons
                  icon="DocumentCheckIcon:solid"
                  className={cn("text-perfBlue", {
                    "w-20": !hasData,
                    "w-10": hasData,
                  })}
                />
                <Text size={"sm"} color="gray">
                  {file.name}
                </Text>
              </div>
            ) : (
              <AppIcons
                icon="CloudArrowUpIcon:solid"
                className={cn("text-perfBlue", {
                  "w-20": !hasData,
                  "w-10": hasData,
                })}
              />
            )}
          </Dropzone.Idle>

          <div>
            <Text
              className="hidden sm:block"
              size={hasData ? "sm" : "xl"}
              align="center"
              inline
            >
              Drag and Drop file or image here or click to select file
            </Text>
            <Text
              className="sm:hidden"
              size={hasData ? "sm" : "lg"}
              align="center"
              inline
            >
              click to select image or file
            </Text>
          </div>
        </Group>
      </Dropzone>
      {file && (
        <SubmitButton
          text="Send File"
          isLoading={loading}
          onClick={() => sendFile()}
          // className="bg-perfBlue text-white p-2 text-sm font-semibold rounded-md"
        />
      )}

      {/* <Modal opened={opened} onClose={close} title="Upload You Report">
        <form
          onSubmit={(e: any) => {
            e.preventDefault();
            sendFile(e);
          }}
        >
          <label className="p-2 rounded-md cursor-pointer text-white bg-green">
            <input
              className="hidden"
              accept=".png,.jpeg,.jpg,.pdf"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const acceptedTypes = [
                  "image/png",
                  "image/jpeg",
                  "image/jpg",
                  "application/pdf",
                ];
                const selectedFile = e.target.files && e.target.files[0];

                if (selectedFile && acceptedTypes.includes(selectedFile.type)) {
                  setFile(selectedFile);
                } else {
                  setFile(null);
                  AppUtils.showNotificationFun(
                    "Error",
                    "Wrong File Type",
                    "Please select a valid file with PNG, JPEG, JPG, or PDF format."
                  );
                }
              }}
              type="file"
            />
            Browse
          </label>
          <h2 className="font-semibold my-4 text-perfGray1">{file?.name}</h2>

          <SubmitButton disabled={!file} isLoading={loading} text="Send" />
        </form>
      </Modal>

      <button
        className="flex gap-2 justify-center items-center p-3 rounded-xl text-white bg-perfBlue text-xs transform hover:scale-105"
        onClick={open}
      >
        <AppIcons icon="ArrowUpTrayIcon:outline" className="w-4 h-4" />
        <h3>Upload File or Image</h3>
      </button> */}
    </div>
  );
};

export default UploadForm;
