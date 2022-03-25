import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useState } from "react";

enum GENDER {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

interface Client {
  cpf: string;
  name: string;
  address: string;
  birthdate: string;
  status: string;
  sex: GENDER;
}

function App() {
  const [cpf, setCpf] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [status, setStatus] = useState("");
  const [sex, setSex] = useState<GENDER>();
  const [clientList, setClientList] = useState<Client[]>(
    JSON.parse(localStorage.getItem("dadosPac") ?? "[]")
  );

  const handleUpdate = () => {
    if (!sex) return;

    const updatedClient = {
      cpf,
      name,
      address,
      birthdate,
      status,
      sex,
    };

    const updatedClientIndex = clientList.findIndex(
      (client) => client.cpf === cpf
    );

    const newClientList =
      updatedClientIndex === -1
        ? [...clientList, updatedClient]
        : [
            ...clientList.slice(0, updatedClientIndex),
            updatedClient,
            ...clientList.slice(updatedClientIndex + 1),
          ];

    localStorage.setItem("dadosPac", JSON.stringify(newClientList));
    setClientList(newClientList);
  };

  const renderForm = () => (
    <form action="javascript:void(0)">
      <Grid container spacing={2}>
        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            type="text"
            name="cpf"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            label="CPF"
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Nome"
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            label="Endereço"
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            name="birthdate"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            label="Data de nascimento"
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            label="Status"
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Sexo</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="FEMALE"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="FEMALE"
                control={<Radio />}
                label="Feminino"
                checked={sex === GENDER.FEMALE}
              />
              <FormControlLabel
                value="MALE"
                control={<Radio />}
                label="Masculino"
                checked={sex === GENDER.MALE}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button onClick={handleUpdate} variant="contained">
            Salvar
          </Button>
        </Grid>
      </Grid>
    </form>
  );

  const handleClientEditButton = (cpf: string) => {
    const editedClient = clientList.find((client) => client.cpf === cpf);
    if (!editedClient) return;
    setCpf(editedClient.cpf);
    setName(editedClient.name);
    setAddress(editedClient.address);
    setBirthdate(editedClient.birthdate);
    setStatus(editedClient.status);
    setSex(editedClient.sex);
  };

  const renderClientList = () => (
    <div>
      {clientList.map((client) => (
        <div key={client.cpf} style={{ marginBottom: 20 }}>
          <div style={{ display: "flex" }}>
            <div style={{ fontWeight: "bold", width: 90 }}>cpf</div>
            <div>{client.cpf}</div>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ fontWeight: "bold", width: 90 }}>name</div>
            <div>{client.name}</div>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ fontWeight: "bold", width: 90 }}>address</div>
            <div>{client.address}</div>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ fontWeight: "bold", width: 90 }}>birthdate</div>
            <div>{client.birthdate}</div>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ fontWeight: "bold", width: 90 }}>status</div>
            <div>{client.status}</div>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ fontWeight: "bold", width: 90 }}>sex</div>
            <div>{client.sex}</div>
          </div>
          <Button onClick={() => handleClientEditButton(client.cpf)}>
            Editar
          </Button>
        </div>
      ))}
    </div>
  );

  return (
    <Container maxWidth="md">
      {renderClientList()}
      {renderForm()}
    </Container>
  );
}

export default App;
