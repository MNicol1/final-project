import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const linkSx = {
    "&:hover": {
      backgroundColor: "#f8d6fe",
    },
  };

  return (
    <div>
      <Button
        disableRipple
        sx={{
          textTransform: "none",
          fontSize: { xs: "20px", sm: "19px" },
          // Apply hover styles only for screens larger than 600px
          "@media (min-width: 900px)": {
            "&:hover": {
              color: "#f8d6fe",
            },
          },
        }}
        id="basic-button"
        color="inherit"
        fontFamily="inherit"
        aria-controls={open ? "positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        By Genre{" "}
        <span>
          {open ? (
            <FaAngleUp style={{ paddingTop: "9px" }} />
          ) : (
            <FaAngleDown style={{ paddingTop: "9px" }} />
          )}
        </span>
      </Button>
      <Menu
        sx={{ maxHeight: 275 }}
        //  elevation={0}

        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        id="positioned-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          sx={linkSx}
          component={Link}
          onClick={handleClose}
          to="?genre="
        >
          All
        </MenuItem>
        <MenuItem
          sx={linkSx}
          component={Link}
          onClick={handleClose}
          to="?genre=pop"
        >
          Pop
        </MenuItem>
        <MenuItem
          sx={linkSx}
          component={Link}
          onClick={handleClose}
          to="?genre=classical"
        >
          Classical
        </MenuItem>
        <MenuItem
          sx={linkSx}
          component={Link}
          onClick={handleClose}
          to="?genre=jazz"
        >
          Jazz
        </MenuItem>

        <MenuItem
          sx={linkSx}
          component={Link}
          onClick={handleClose}
          to="?genre=hiphop"
        >
          Hiphop
        </MenuItem>

        <MenuItem
          sx={linkSx}
          component={Link}
          onClick={handleClose}
          to="?genre=ambient"
        >
          Ambient
        </MenuItem>

        <MenuItem
          sx={linkSx}
          component={Link}
          onClick={handleClose}
          to="?genre=house"
        >
          House
        </MenuItem>
        <MenuItem
          sx={linkSx}
          component={Link}
          onClick={handleClose}
          to="?genre=folk"
        >
          Folk
        </MenuItem>
        <MenuItem
          sx={linkSx}
          component={Link}
          onClick={handleClose}
          to="?genre=country"
        >
          Country
        </MenuItem>
        <MenuItem
          sx={linkSx}
          component={Link}
          onClick={handleClose}
          to="?genre=electronic"
        >
          Electronic
        </MenuItem>
        <MenuItem
          sx={linkSx}
          component={Link}
          onClick={handleClose}
          to="?genre=indie"
        >
          Indie
        </MenuItem>
        <MenuItem
          sx={linkSx}
          component={Link}
          onClick={handleClose}
          to="?genre=chillout"
        >
          Chillout
        </MenuItem>
        <MenuItem
          sx={linkSx}
          component={Link}
          onClick={handleClose}
          to="?genre=80s"
        >
          80s
        </MenuItem>
        <MenuItem
          sx={linkSx}
          component={Link}
          onClick={handleClose}
          to="?genre=90s"
        >
          90s
        </MenuItem>
      </Menu>
    </div>
  );
}
