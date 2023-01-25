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
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profile, setProfile] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleClick = () => {
    setShow(!show);
  };

  const uploadImage = async (image) => {
    setLoading(true);
    if (image === undefined) {
      toast({
        title: "Please select an image!",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    if (
      image.type === "image/jpeg" ||
      image.type === "image/png" ||
      image.type === "image/jpg"
    ) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "mern-chat");
      try {
        const resp = await fetch(
          `https://api.cloudinary.com/v1_1/mern-chat/image/upload`,
          {
            method: "post",
            body: formData,
          }
        );
        const data = await resp.json();
        setProfile(data.url.toString());
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    } else {
      toast({
        title: "Please select an image!",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmPassword) {
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
    if (password !== confirmPassword) {
      toast({
        title: "Password do not match!",
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
        "/api/user",
        {
          name,
          email,
          password,
          profile,
        },
        config
      );
      toast({
        title: "Registraion successful!",
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
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter your name..."
          autoComplete="off"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter your email..."
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
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
          />
          <InputRightElement width={`4.5rem`}>
            <Button
              p={`0 10px`}
              h={`1.75rem`}
              size={`small`}
              onClick={handleClick}
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Confirm Passowrd</FormLabel>
        <InputGroup>
          <Input
            type={show ? `text` : `password`}
            placeholder="Confirm your password..."
            autoComplete="off"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <InputRightElement width={`4.5rem`}>
            <Button
              p={`0 10px`}
              h={`1.75rem`}
              size={`small`}
              onClick={handleClick}
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="profile" isRequired>
        <FormLabel>Profile Picture</FormLabel>
        <Input
          type={`file`}
          p={`1.5`}
          accept={`image/*`}
          onChange={(e) => uploadImage(e.target.files[0])}
        />
      </FormControl>
      <Button
        colorScheme={`blue`}
        width={`100%`}
        mt={`25px`}
        onClick={handleSubmit}
        isLoading={loading}
      >
        Register
      </Button>
    </VStack>
  );
};

export default Register;
