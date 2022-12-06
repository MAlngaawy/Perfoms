import React, { useState } from "react";
import { Modal, Button, Group, Input } from "@mantine/core";
import AppIcons from "~/@main/core/AppIcons";

type Props = {};

const UploadForm = (props: Props) => {
  const [opened, setOpened] = useState(false);

  const upload = (e: any) => {
    e.preventDefault();
  };

  return (
    <div>
      <div
        onClick={() => setOpened(true)}
        className="z-50 flex flex-col items-center justify-center transform transition-all hover:scale-105  fixed right-10 bottom-10 opacity-70 hover:opacity-100 w-10 h-10 rounded-full cursor-pointer bg-perfBlue text-white"
      >
        <AppIcons
          className="w-6 h-6 text-white"
          icon="ArrowUpTrayIcon:outline"
        />
        <span></span>
      </div>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Upload Media"
      >
        <form onSubmit={upload}>
          <Input
            type="text"
            name="youtubeLink"
            className="p-4 rounded-lg border border-perfBlue text-perfBlue"
          />
        </form>
      </Modal>
    </div>
  );
};

export default UploadForm;
