import { Text, Box, Center, Image, Flex } from "@chakra-ui/react";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../../../commonStyles";
import { useState } from "react";

interface MenuItemProps {
  label: string;
  imageUrl: string;
  onClick: () => void;
  index: number
  selectedIndex: number
}

const MenuItem: React.FC<MenuItemProps> = ({ label, imageUrl, index, selectedIndex, onClick }) => {

  return (
    <Box
      p={3}
      backgroundColor={index === selectedIndex ? SECONDARY_COLOR : PRIMARY_COLOR}
      style={{
        cursor: 'pointer'
      }}
      onClick={onClick}
    >
      <Flex marginLeft={5}>
        <Center>
          <Center width={7} marginRight={3}>
            <Image src={imageUrl} />
          </Center>
          <Text fontSize='15'>
            {label}
          </Text>
        </Center>
      </Flex>

    </Box >
  );
}

interface MenuProps {
  currentMenuIndex: number;
  setCurrentMenuIndex: React.Dispatch<React.SetStateAction<number>>;
}

const UserProfileMenu: React.FC<MenuProps> =
  ({ currentMenuIndex, setCurrentMenuIndex }) => {
    return (
      <Box width='20vw' height={'100vh'} pb={10} pt={10} mt={10}>
        <MenuItem
          index={0}
          selectedIndex={currentMenuIndex}
          label='Home'
          imageUrl='src\assets\images\user.png'
          onClick={() => { setCurrentMenuIndex(0) }} />
        <MenuItem
          index={1}
          selectedIndex={currentMenuIndex}
          label='Personal Info'
          imageUrl='src\assets\images\personal_info.png'
          onClick={() => { setCurrentMenuIndex(1) }} />
        <MenuItem
          index={2}
          selectedIndex={currentMenuIndex}
          label='Security'
          imageUrl='src\assets\images\security.png'
          onClick={() => { setCurrentMenuIndex(2) }} />
      </Box>
    );
  }

export default UserProfileMenu;