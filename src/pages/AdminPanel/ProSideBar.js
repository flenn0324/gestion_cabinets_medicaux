import { useState } from "react";
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Box, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";


const Item = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: "blue",
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Link to={to}>
        <Typography>{title}</Typography>
      </Link>
    </MenuItem>
  );
};

const ProSideBar = () => {

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");


  return (
    <Box
      sx={{
        "& .css-1l8icbj": {
          background: `#112244 !important`,
          padding: 0
        },
        "& .css-dip3t8": {
          background: `#112244 !important`,
        },
        "& a": {
          color: `white !important`,
        },
        "& a:hover": {
          color: `#4286f4 !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#4286f4 !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <Sidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: "#4286f4",
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography color="#4286f4">
                  Admin Panel
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/admin"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              color="#4286f4"
              sx={{ m: "15px 0 5px 20px" }}
            >
              Gestion
            </Typography>
            <Item
              title="Cliniques"
              to='/admin/cliniques'
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Médecins"
              to={'/admin/medecins'}
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default ProSideBar;