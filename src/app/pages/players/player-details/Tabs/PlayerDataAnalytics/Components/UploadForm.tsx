import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Group, Progress } from "@mantine/core";
import AppIcons from "~/@main/core/AppIcons";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import SubmitButton from "~/@main/components/SubmitButton";
import AppUtils from "~/@main/utils/AppUtils";
import { useUpdatePlayerMutation } from "~/app/store/user/userApi";
import { useParams } from "react-router";

const UploadForm = ({ setData }: { setData: any }) => {
  const { id: player_id } = useParams();
  const [opened, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [updatePlayer] = useUpdatePlayerMutation();

  const sendFile = (e: any) => {
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
        close();
      })
      .catch(() => {
        setLoading(false);
        AppUtils.showNotificationFun(
          "Error",
          "Wrong",
          "Please add a file contains a report for you"
        );
      });
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Upload You Report">
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
      </button>
    </>
  );
};

export default UploadForm;
