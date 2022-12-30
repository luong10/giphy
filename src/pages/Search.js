import React, { useState, useEffect } from "react";
import { Input, Row, Col, Image, Button, Skeleton, Card, message } from "antd";
import axios from "axios";
import { MailOutlined, HeartOutlined, SearchOutlined } from "@ant-design/icons";
import { getFID } from "web-vitals";

// import {API_KEY} from "../e"
const { Search } = Input;

const style = {
  padding: "8px 8px",
};

export const Searchh = (props) => {
  const [dataGif, setGif] = useState([]);
  const [keyWord, setKeyW] = useState("");
  const [offset, setOffset] = useState(0);

  const [localData, setLocalData] = useState();

  useEffect(() => {
    setLocalData(Object.keys(localStorage));
    senCount();
  }, [localData]);

  // localData.map((pre, index) => {
  //   const t = JSON.parse(localStorage.getItem(pre));
  //   console.log("checkkkkkkk", pre, t.favourites);
  // });

  const senCount = () => {
    props.countGif(Object.keys(localStorage).length);
  };

  async function fetchData(keyWord, offset) {
    // setCount(Object.keys(localStorage).length);
    // You can await here
    const mang = [];
    try {
      const { data } = await axios.get(
        `https://api.giphy.com/v1/gifs/search?api_key=n7tKrpaR1RSmLkip3No8nJP2ZTwmxLMu&q=${keyWord}&limit=8&offset=${offset}&rating=g&lang=en6`
      );

      data.data.map((post) => {
        mang.push({
          id: post.id,
          url: post.images.original.url,
        });
      });
    } catch (error) {
      console.log(error);
    } finally {
      setGif([...dataGif, ...mang]);

      // console.log("check:", gif);
    }
  }

  const onSearch = (value) => {
    try {
      fetchData(value, 0);
    } catch (error) {
      console.log(error);
    } finally {
      setKeyW(value);
      setOffset(8);
    }
  };

  // console.log("check:", dataGif);
  const handleMore = () => {
    try {
      fetchData(keyWord, offset + 8);
    } catch (error) {
      console.log(error);
    } finally {
      setOffset(offset + 8);
    }
  };

  // console.log("check local", localData);
  return (
    <div>
      <Search
        placeholder="input search text"
        onSearch={onSearch}
        onChange={() => setGif([])}
        enterButton
      />
      <Row>
        {dataGif &&
          dataGif.map((post, index) => (
            <Col span={6}>
              <div style={style}>
                <Image
                  style={{ width: 230, height: 200, position: "relative" }}
                  key={index}
                  src={post.url}
                  placeholder={true}
                />
                {/* {localData.length !== 0 ? (
                  localData.map((pre, index) => {
                    // const t = JSON.parse(localStorage.getItem(pre));
                    // console.log("check pre", pre);
                    if (pre === post.id) {
                      return (
                        <Button
                          // ghost={true}
                          onClick={() => {
                            localStorage.removeItem(pre);
                          }}
                          className="loves love"
                          shape="circle"
                          icon={<HeartOutlined />}
                        ></Button>
                      );
                    } else {
                      return (
                        <Button
                          ghost={true}
                          onClick={() => {
                            if (pre === post.id) localStorage.removeItem(pre);
                            else localStorage.setItem([post.id], post.url);
                          }}
                          className="loves"
                          shape="circle"
                          icon={<SearchOutlined />}
                        ></Button>
                      );
                    }
                  })
                ) : (
                  <Button
                    ghost={true}
                    onClick={() => {
                      localStorage.setItem([post.id], post.url);
                    }}
                    className="loves"
                    shape="circle"
                    icon={<MailOutlined />}
                  ></Button>
                )} */}

                <Button
                  // ghost={true}

                  onClick={() => {
                    localStorage.setItem([post.id], post.url);
                    localData &&
                      localData.map((pre, inddex) => {
                        if (pre === post.id) {
                          localStorage.removeItem(post.id);
                          // console.log("xoa o day");
                        }
                      });
                  }}
                  className={
                    localData.length !== 0
                      ? localData.map((pre, index) => {
                          if (pre === post.id) return "loves love";
                          else return "loves";
                        })
                      : "loves"
                  }
                  shape="circle"
                  icon={<HeartOutlined />}
                ></Button>
              </div>
            </Col>
          ))}
      </Row>
      <Button style={{ marginTop: 8 }} onClick={handleMore} shape="round">
        Load more
      </Button>
    </div>
  );
};
