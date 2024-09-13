import { Container, Grid2 } from "@mui/material";
import "./App.css";
import InputForm from "./components/InputForm";
import TableData from "./components/TableData";
function App() {
  return (
    <>
      <Container maxWidth="md">
        <Grid2 size={12} container spacing={2} sx={{ width: "100%" }}>
          <Grid2
            size={{ lg: 6, md: 6, sm: 6, xs: 12 }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "0 auto",
            }}
          >
            <InputForm />
          </Grid2>
          <Grid2 size={12}>
            <TableData />
          </Grid2>
        </Grid2>
      </Container>
    </>
  );
}

export default App;
