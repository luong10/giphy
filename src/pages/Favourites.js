import React, { useState, useEffect } from "react";
import { Input, Row, Col, Image, Button, Skeleton, Card } from "antd";
import axios from "axios";
import { MailOutlined, HeartOutlined, SearchOutlined } from "@ant-design/icons";
import { getFID } from "web-vitals";

const style = {
  padding: "8px 8px",
  // position: "absolute",
  //   width: 200,
  //   height: 180,
};

export const Favourites = (props) => {
  const [dataGif, setDataGif] = useState();

  useEffect(() => {
    setDataGif(Object.keys(localStorage));
    senCount();
  }, [dataGif]);

  const senCount = () => {
    props.countGif(Object.keys(localStorage).length);
  };

  return (
    <Row>
      {dataGif &&
        dataGif.map((url, index) => (
          <Col span={6}>
            <div style={style}>
              <Image
                style={{ width: 230, height: 200, position: "relative" }}
                key={index}
                placeholder={true}
                src={localStorage.getItem(url)}
              />
              <Button
                // ghost={ghostt}
                onClick={() => localStorage.removeItem(url)}
                className="love"
                shape="circle"
                icon={<HeartOutlined />}
              ></Button>
            </div>
          </Col>
        ))}
    </Row>
  );
};
