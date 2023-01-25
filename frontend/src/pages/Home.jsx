import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Login from "../components/authentication/Login";
import Register from "../components/authentication/Register";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) {
      navigate("/chats");
    }
  }, [navigate]);
  return (
    <Container maxW={`xl`} centerContent>
      <Box
        d={`flex`}
        justifyContent={`center`}
        p={3}
        bg={`white`}
        width={`100%`}
        m={`40px 0 15px 0`}
        borderRadius={`lg`}
        borderWidth={`1px`}
      >
        <Text fontSize={`4xl`} color={`black`} textAlign={`center`}>
          Let's Chat
        </Text>
      </Box>
      <Box
        bg={`white`}
        color={`black`}
        width={`100%`}
        borderRadius={`lg`}
        borderWidth={`1px`}
      >
        <Tabs m={`20px`} variant="soft-rounded">
          <TabList mb={`1em`}>
            <Tab width={`50%`}>Login</Tab>
            <Tab width={`50%`}>Register</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Register />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Home;
