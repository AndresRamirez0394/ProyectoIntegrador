import Feed from "./components/Feed";
import Rightbar from "./components/Rightbar";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

function App() {
  return (
    <Box>
      <Navbar/>
    <Stack direction="row" spacing={5} justifyContent="space-between">



      <Sidebar/>
      <Feed/>
      <Rightbar/>
   
    </Stack>
    </Box>
  );
}

export default App;
