import { Button, Group, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

type Props = {};

const DaySessions = (props: Props) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Authentication">
        {/* Modal content */}
      </Modal>

      <Group position="center">
        <div onClick={open}>Sessions</div>
      </Group>
    </>
  );
};

export default DaySessions;
