import React from "react";
import "./Header.css";

function Header(props) {
  return <header className={props.className}>{props.children}</header>;
}

export default Header;