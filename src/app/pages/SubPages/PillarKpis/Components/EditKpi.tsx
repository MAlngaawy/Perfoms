import { useState, ReactNode, useEffect } from "react";
import { kpi } from "~/app/store/types/supervisor-types";
import { useUserQuery } from "~/app/store/user/userApi";
import { useSuperKpisQuery } from "~/app/store/supervisor/supervisorMainApi";
import { useAdminKpisQuery } from "~/app/store/clubManager/clubManagerApi";
import { useParams } from "react-router-dom";
import EditItem from "~/@main/components/shared/EditItem";
import { axiosInstance } from "~/app/configs/dataService";
import AppUtils from "~/@main/utils/AppUtils";
import { Group, Input, Modal } from "@mantine/core";
import AvatarInput from "~/@main/components/shared/AvatarInput";
import SubmitButton from "~/@main/components/SubmitButton";
import AppIcons from "~/@main/core/AppIcons";

type Props = {
  kpiData: kpi;
};

const EditKpi = ({ kpiData }: Props) => {
  const { data: user } = useUserQuery({});
  const [opened, setOpened] = useState(false);
  const [userAvatar, setUserAvatar] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { pillar_id } = useParams();
  const [url, setUrl] = useState<string>("");
  const { refetch: superRefetchKpis } = useSuperKpisQuery(
    { pillar_id },
    { skip: !pillar_id }
  );
  const { refetch: adminRefetchKpis } = useAdminKpisQuery(
    { pillar_id },
    { skip: !pillar_id }
  );

  useEffect(() => {
    if (user?.user_type === "Supervisor") {
      setUrl(`supervisor/kpis/${kpiData.id}/update/`);
    } else {
      setUrl(`club-manager/sports/kpis/${kpiData.id}/update/`);
    }
  }, [user]);

  const refetchFun = () => {
    if (user?.user_type === "Supervisor") {
      superRefetchKpis();
    } else {
      adminRefetchKpis();
    }
  };

  const onSubmitFunction = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (userAvatar) {
      const image = await AppUtils.resizeImage(userAvatar);
      formData.append("icon", image as string);
    } else {
      formData.delete("icon");
    }

    setIsLoading(true);
    axiosInstance
      .patch(url, formData)
      .then((res) => {
        setIsLoading(false);
        setOpened(false);
        refetchFun();
        setUserAvatar(null);
        AppUtils.showNotificationFun("Success", "Done", "Successfully Updated");
      })
      .catch((err) => {
        setIsLoading(false);
        AppUtils.showNotificationFun("Error", "Sorry", "Can't Update Now");
      });
    setOpened(false);
  };

  return (
    <div>
      <Modal
        opened={opened}
        onClose={() => {
          setOpened(false);
        }}
        title={`Edit ${kpiData.name}`}
      >
        <form className="flex flex-col gap-4" onSubmit={onSubmitFunction}>
          {/* Image Upload */}
          <AvatarInput
            userAvatar={userAvatar}
            setUserAvatar={setUserAvatar}
            inputAlt="Icon"
            currentImage={kpiData.icon || kpiData.icon_url}
          />

          <Input.Wrapper id="name" label="Kpi Name" withAsterisk>
            <Input
              defaultValue={kpiData.name}
              name={"name"}
              placeholder="Name"
              sx={{
                ".mantine-Input-input	": {
                  border: 0,
                  padding: 0,
                  borderBottom: 1,
                  borderStyle: "solid",
                  borderRadius: 0,
                  minHeight: 20,
                },
              }}
              className="border-b"
              id="name"
            />
          </Input.Wrapper>

          <Input.Wrapper id="description" label="Kpi Description">
            <Input
              defaultValue={kpiData.description}
              name={"description"}
              placeholder="Description"
              sx={{
                ".mantine-Input-input	": {
                  border: 0,
                  padding: 0,
                  borderBottom: 1,
                  borderStyle: "solid",
                  borderRadius: 0,
                  minHeight: 20,
                },
              }}
              className="border-b"
              id="description"
            />
          </Input.Wrapper>

          <SubmitButton isLoading={isLoading} text="Edit" />
        </form>
      </Modal>

      <Group position="center">
        <button
          className="transform hover:scale-150"
          onClick={() => setOpened(true)}
        >
          <AppIcons
            className="w-4 h-4 text-perfGray3"
            icon="PencilSquareIcon:outline"
          />
        </button>
      </Group>
    </div>
  );
};

export default EditKpi;
