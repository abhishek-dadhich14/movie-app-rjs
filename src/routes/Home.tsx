import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Text, Input, Button } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import { ADD_DATA } from "./../redux/action";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { initState } from "../redux/reducer";
const Home = () => {
  const [text, setText] = useState<string>("");
  const data = useSelector((store: initState) => store.data);
  const [checkRandom, setCheckRandom] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [load, setLoad] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (text) {
      getData();
    }
  }, [page]);
  const handleSubmit = (): void => {
    setError(false);

    setLoad(true);
    getData();
  };

  const getData = () => {
    axios
      .get(`https://www.omdbapi.com/?apikey=bafbb8c8&s=${text}&page=${page}`)
      .then((res) => {
        setLoad(false);
        setLoading(false);
        if (res.data.Response == "False") {
          setError(true);
          setErrorMsg("Please enter a valid movie/series name");
        } else {
          dispatch({ type: ADD_DATA, payload: res.data.Search });
        }
      })

      .catch((err) => {
        setLoad(false);
        setError(true);
        setLoading(true);
        console.log(err);
        setErrorMsg("Please enter a valid search");
      });
  };

  const handleText = (val: string): void => {
    setCheckRandom(false);
    setError(false);

    setText(val);
  };
  return (
    <Box width={"80%"} margin={"auto"}>
      <Box width={"50%"} margin={"auto"} marginTop={2}>
        <Input
          borderColor={"black"}
          value={text}
          placeholder="Search"
          onChange={(e): void => {
            handleText(e.target.value);
          }}
        />
        {error && <Text>{errorMsg}</Text>}

        <Button
          colorScheme={"teal"}
          marginTop={1}
          marginBottom={3}
          disabled={text.length == 0}
          onClick={handleSubmit}
        >
          {(load && <Spinner />) || <Text>Submit</Text>}
        </Button>
      </Box>
      <Box>
        {data[0].Title &&
          data.map((el, i) => {
            return (
              <Box
                width={"50%"}
                fontWeight={"bold"}
                display={"flex"}
                justifyContent={"space-around"}
                margin={"auto"}
                gap={10}
                cursor={"pointer"}
                key={i}
                onClick={() => {
                  navigate(`/about/${el.imdbID}`);
                }}
              >
                <Box width={"50%"}>
                  <img
                    style={{ width: "100%", height: "80%" }}
                    src={el.Poster}
                    alt=""
                  />
                </Box>
                <Box>
                  <Text marginBottom={3}>Title : {el.Title}</Text>

                  <Text marginBottom={3}> Type : {el.Type}</Text>
                  <Text marginBottom={3}>Imdb ID : {el.imdbID}</Text>
                  <Text marginBottom={3}>Year : {el.Year}</Text>
                </Box>
              </Box>
            );
          })}
      </Box>
      {data[0].Title && (
        <Box width={"50%"} margin={"auto"}>
          <Button
            colorScheme={"red"}
            isDisabled={page == 1}
            onClick={() => {
              setPage(page - 1);
            }}
          >
            Prev
          </Button>
          <Button>{page}</Button>
          <Button
            colorScheme={"teal"}
            isDisabled={data.length < 10}
            onClick={() => {
              setPage(page + 1);
            }}
          >
            Next
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Home;
