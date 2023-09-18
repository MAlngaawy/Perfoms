import React, { forwardRef, useEffect, useState } from "react";
import { Avatar, Modal, Select, Text } from "@mantine/core";
import { Group } from "@mantine/core";
import { Button } from "../../Button";
import { useDisclosure, useSetState } from "@mantine/hooks";
import AppIcons from "~/@main/core/AppIcons/AppIcons";
import {
  useAssignParentToPlayerMutation,
  useUserQuery,
} from "~/app/store/user/userApi";
import {
  useAdminClubParentsQuery,
  useAdminParentsQuery,
} from "~/app/store/clubManager/clubManagerApi";
import { User } from "~/app/store/types/user-types";
import { CoachPlayerInfo } from "~/app/store/types/coach-types";
import { Controller, useForm } from "react-hook-form";
import { ChoosePlayerInput } from "~/app/pages/SubPages/SingleTeam/Components/AddPLayerToTeam";
import SubmitButton from "../../SubmitButton";
import { PlayerCoach } from "~/app/store/types/parent-types";
import AppUtils from "~/@main/utils/AppUtils";

type Props = {
  player: CoachPlayerInfo | User;
};

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  image: string;
  label: string;
  id: string;
}

function AssignParentToPlayerForm({ player }: Props) {
  const [opened, { open, close }] = useDisclosure(false);
  const { data: user } = useUserQuery({});
  const clubId = user?.club;
  const [selectedParent, setSelectedParent] =
    useState<User | PlayerCoach | null>(null);
  const [clubParents, setClubParents] = useState<
    { image: string; label: string; value: string }[]
  >([]);

  const { data: parentsInTheClub } = useAdminParentsQuery(
    { club_id: clubId },
    { skip: !clubId }
  );

  useEffect(() => {
    const playerParent = parentsInTheClub?.results.find(
      (parent) =>
        //@ts-ignore
        parent.first_name + " " + parent.last_name === player.parent_name
    );
    if (playerParent !== undefined) {
      setSelectedParent(playerParent);
    }
  }, [parentsInTheClub]);

  const [formattedParents, setFormattedParents] = useState<any>();
  useEffect(() => {
    const test =
      parentsInTheClub && parentsInTheClub.results.length > 0
        ? parentsInTheClub.results?.map((parent: any) => {
            return {
              label: parent.first_name + " " + parent.last_name,
              value: JSON.stringify(parent.id),
              image: parent.avatar,
            };
          })
        : [];

    setFormattedParents(test);
  }, [parentsInTheClub]);

  const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
    ({ image, label, id, ...others }: ItemProps, ref) => (
      <div ref={ref} {...others}>
        <Group noWrap>
          <Avatar radius={"xl"} size="sm" src={image} />
          <div>
            <Text size="sm">{label}</Text>
          </div>
        </Group>
      </div>
    )
  );

  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    defaultValues: {
      parentId: JSON.stringify(selectedParent?.id),
    },
  });

  const [AsssignParentToPlayer] = useAssignParentToPlayerMutation();

  const onSubmit = (data: any) => {
    console.log("datadatadatadata", data);

    AsssignParentToPlayer({
      parent: data.parentId,
      player: player?.id || 0,
    }).then((res: any) => {
      console.log("resresresresresres", res.data);

      if (!res.data.errors) {
        close();
        // reset({ parentId: null });
        AppUtils.showNotificationFun("Success", "Done", res.data.message);
      } else {
        AppUtils.showNotificationFun("Error", "Sorry", res.data.message);
      }
    });
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Assign Parent To Player">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="parentId"
            defaultValue={JSON.stringify(selectedParent?.id)}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Choose Player"
                autoFocus={true}
                searchable
                itemComponent={SelectItem}
                maxDropdownHeight={400}
                nothingFound="No options"
                data={formattedParents || []}
                filter={(value, item) =>
                  item.label
                    ?.toLowerCase()
                    .includes(value.toLowerCase().trim()) || false
                }
              />
            )}
          />
          <SubmitButton isLoading={false} text="Assign Parent" />
        </form>
      </Modal>

      <Group position="center">
        <AppIcons
          onClick={() => open()}
          icon="LinkIcon:outline"
          className="w-4 h-4 text-perfGray hover:text-perfBlue cursor-pointer"
        />
      </Group>
    </>
  );
}

export default AssignParentToPlayerForm;
