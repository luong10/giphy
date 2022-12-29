import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { Searchh } from "./Search";
import { Favourites } from "./Favourites";

import "../App.css";
import { MailOutlined, HeartOutlined, SearchOutlined } from "@ant-design/icons";

export const Home = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("one");
  const [count, setCount] = useState(Object.keys(localStorage).length);

  const componentsSwitch = (key) => {
    switch (key) {
      case "one":
        return <Searchh countGif={countGif} />;
      case "two":
        return <Favourites countGif={countGif} />;
      default:
        break;
    }
  };

  const countGif = (c) => {
    setCount(c);
  };

  return (
    <div className="home-ttotal">
      <div className="home">
        <div>
          <Menu
            mode="horizontal"
            defaultSelectedKeys={["one"]}
            selectedKeys={selectedMenuItem}
            onClick={(e) => setSelectedMenuItem(e.key)}
          >
            <Menu.Item key="one" icon={<SearchOutlined />}>
              Search
            </Menu.Item>

            <Menu.Item key="two" icon={<HeartOutlined />}>
              {`Favourites (${count})`}
            </Menu.Item>
          </Menu>
        </div>
        <div className="home-body">{componentsSwitch(selectedMenuItem)}</div>
      </div>
    </div>
    //   <header className="home-header">smile</header>
    // </div>
  );
};
