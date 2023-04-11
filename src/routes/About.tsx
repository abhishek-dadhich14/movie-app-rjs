import { Box, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { initData } from "../redux/reducer";
import { Data } from "../types";

const About = () => {
  const { id } = useParams();
  const [data, setData] = useState<Data>(initData.data[0]);
  useEffect(() => {
    axios
      .get(`https://www.omdbapi.com/?apikey=bafbb8c8&i=${id}&plot=full`)
      .then((res) => {
        console.log(res);
        setData(res.data);
      })

      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Box fontSize={30} fontWeight={"bold"} width={"70%"} margin={"auto"}>
      <img src={data.Poster} alt="" />
      <Text>Title : {data.Title}</Text>
      <Text>Plot : {data.Plot}</Text>
      <Text>Year : {data.Year}</Text>
    </Box>
  );
};

export default About;
