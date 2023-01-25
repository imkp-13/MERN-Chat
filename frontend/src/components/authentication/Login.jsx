import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleClick = () => {
    setShow(!show);
  };

  const handleSubmit = async () => {
    setLoading(false);
    if (!email || !password) {
      toast({
        title: "Please fill all the fields!",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user/login",
        {
          email,
          password,
        },
        config
      );
      toast({
        title: "Login successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chat");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <VStack spacing={`5px`}>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter your email..."
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Passowrd</FormLabel>
        <InputGroup>
          <Input
            type={show ? `text` : `password`}
            placeholder="Enter your password..."
            autoComplete="off"
            onChange={(e) => setPassowrd(e.target.value)}
            value={password}
          />
          <InputRightElement width={`4.5rem`}>
            <Button
              p={`0 10px`}
              h={`1.75rem`}
              size={`small`}
              onClick={handleClick}
              isLoading={loading}
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button colorScheme={`blue`} width={`100%`} onClick={handleSubmit}>
        Login
      </Button>
      <Button
        variant={`solid`}
        colorScheme={`red`}
        width={`100%`}
        onClick={() => {
          setEmail("guest@example.com");
          setPassowrd("123456");
        }}
      >
        Get Guest User Credential
      </Button>
    </VStack>
  );
};

export default Login;
