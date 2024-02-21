import { Typography, Box,Button } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const HeadContent = ({ title, subtitle }) => {
  const goBack = () => {
    window.history.back();
  };
  return (
    <div>
      <Button onClick={goBack} color="primary" aria-label="go back">
          <ArrowBackIcon />
      </Button>
      <Box m="30px">
        <Typography
          variant="h4"
          color="#112244"
          fontWeight="bold"
          sx={{ m: "0 0 5px 0" }}
        >
          {title}
        </Typography>
        <Typography variant="h6" color="grey">
          {subtitle}
        </Typography>
      </Box>
    </div>
  );
};

export default HeadContent;