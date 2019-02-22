import React, { Component } from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const SubMenu = Menu.SubMenu;

  // const menu = (
  //   <Menu>
  //     <Menu.Item key="3"><Link to={'/naujas-vartotojas'}><Icon type="check" /> Kurti naują vartotoją</Link></Menu.Item>
  //     <Menu.Item key="3"><Link to={'/vartotojai'}><Icon type="team" /> Peržiūrėti sukurtus vartotojus </Link></Menu.Item>
  //     <Menu.Item key="1"><Link to={'/naujas-tipas'}><Icon type="check" /> Kurti dokumento tipą</Link></Menu.Item>
  //     <Menu.Item key="2"><Link to={'/visi-tipai'}>Dokumentų tipai</Link></Menu.Item>
  //     <Menu.Item key="2"><Link to={'/nauja-grupe'}><Icon type="check" /> Kurti vartotojų grupę </Link></Menu.Item>
  //     <Menu.Item key="2"><Link to={'/visos-grupes'}>Vartotojų grupės</Link></Menu.Item>
  //     <Menu.Item key="1"><Link to={'/visi-dokumentai'}><Icon type="file" /> Peržiūrėti sukurtus dokumentus</Link></Menu.Item>
  //   </Menu>
  // );

  const menu = (
    <Menu>
       <SubMenu title="Vartotojai">
        <Menu.Item>
          <Link to='/naujas-vartotojas'>Kurti vartotoją</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to='/vartotojai'>Peržiūrėti sukurtus vartotojus</Link>
        </Menu.Item>
      </SubMenu>
      <SubMenu title="Grupės">
        <Menu.Item>
          <Link to={'/nauja-grupe'}>Kurti vartotojų grupę</Link>
          </Menu.Item>
        <Menu.Item>
          <Link to={'/visos-grupes'}>Vartotojų grupės</Link>
        </Menu.Item>
      </SubMenu>
      <SubMenu title="Dokumentų tipai">
        <Menu.Item>
          <Link to={'/naujas-tipas'}>Kurti dokumento tipą</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to={'/visi-tipai'}>Dokumentų tipai</Link>
        </Menu.Item>
      </SubMenu>
      <Menu.Item><Link to={'/visi-dokumentai'}><Icon type="file" /> Peržiūrėti sukurtus dokumentus</Link></Menu.Item>
    </Menu>
  );
  

class AdminSubMenu extends Component {



  render() {
    return (
      <Dropdown overlay={menu}>
       <a className="ant-dropdown-link" href="#">
       Administratoriaus paskyra  <Icon type="down" />
        </a>
      </Dropdown>
    )
  }
}

export default AdminSubMenu
