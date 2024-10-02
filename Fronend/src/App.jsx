import { useEffect, useState } from "react";
import axios from "axios";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Box,
  Typography,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const API_URL = "http://localhost:3000/api/user";

function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [updateUser, setUpdateUser] = useState({ id: "", name: "", email: "" });
  const [open, setOpen] = useState(false); // State to handle dialog open/close

  // Fetch Users (READ)
  async function fetchUsers() {
    const response = await axios.get(API_URL);
    const content = response.data;
    setUsers(content.data);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle opening and closing of the dialog
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewUser({ name: "", email: "" }); // Reset inputs on close
  };

  // Add a user (CREATE)
  const addUser = () => {
    axios.post(API_URL, newUser)
      .then((response) => {
        setUsers([...users, response.data]);
        handleClose(); // Close dialog after adding user
        fetchUsers();
      })
      .catch((err) => console.error(err));
  };

  // Update a user (UPDATE)
  const updateUserById = (id) => {
    axios
      .put(`${API_URL}/${id}`, { name: updateUser.name, email: updateUser.email })
      .then((response) => {
        setUsers(users.map((user) => (user.id === id ? response.data : user)));
        setUpdateUser({ id: "", name: "", email: "" }); // Reset input
        fetchUsers();
      })
      .catch((err) => console.error(err));
  };

  // Delete a user (DELETE)
  const deleteUserById = (id) => {
    axios
      .delete(`${API_URL}/${id}`)
      .then(() => {
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch((err) => console.error(err));
  };

  return (
    <Container maxWidth="md" sx={{textAlign:'center'}}>
      <Typography variant="h4" gutterBottom align="center" sx={{ mt: 4 }}>
        CRUD Operations with Express & React
      </Typography>

      {/* Add User Button to Open Dialog */}
      <Box display="flex" justifyContent="center" alignItems="center" mb={3}>
        <Button variant="contained" color="primary" onClick={handleClickOpen} sx={{ width: "200px" }}>
          Add New User
        </Button>
      </Box>

      {/* Add User Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={addUser} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Display User Table */}
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell component="th" scope="row">
                  {user.name}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ mr: 1 }}
                    onClick={() => setUpdateUser({ id: user.id, name: user.name, email: user.email })}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => deleteUserById(user.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Update User Section */}
      {updateUser.id && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          mb={4}
          flexDirection="column"
          bgcolor="white" // Set the background color to white
          boxShadow={3} // Add a shadow effect
          borderRadius={2} // Rounded corners
          p={3} // Padding around the content
          maxWidth="sm"
          mx="auto" // Center horizontally
        >
          <Typography variant="h6" gutterBottom>
            Update User Information
          </Typography>
          <Box display="flex" mb={2}>
            <TextField
              label="Update Name"
              variant="outlined"
              value={updateUser.name}
              onChange={(e) => setUpdateUser({ ...updateUser, name: e.target.value })}
              sx={{ mr: 2, width: "300px" }}
            />
            <TextField
              label="Update Email"
              variant="outlined"
              value={updateUser.email}
              onChange={(e) => setUpdateUser({ ...updateUser, email: e.target.value })}
              sx={{ width: "300px" }}
            />
          </Box>
          <Button
            variant="contained"
            color="success"
            onClick={() => updateUserById(updateUser.id)}
          >
            Update User
          </Button>
        </Box>
      )}
    </Container>
  );
}

export default App;



