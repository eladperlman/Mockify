import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { IAddPlaylistModal } from '../../global/interfaces';

const errorMsg = 'Invalid name!';

const AddPlaylistModal = ({
  open,
  handleSave,
  error,
  onClose,
}: IAddPlaylistModal) => {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    handleSave(name);
    setName('');
  };

  return (
    <Dialog fullWidth={true} open={open} onClose={onClose}>
      <DialogTitle>Edit playlist name</DialogTitle>
      <DialogContent>
        <DialogContentText>Choose the name for your playlist</DialogContentText>
        <TextField
          error={error}
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
          value={name}
          onChange={(e) => setName(e.target.value)}
          helperText={error ? errorMsg : ''}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            onClose();
            setName('');
          }}
        >
          Close
        </Button>
        <Button onClick={handleSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPlaylistModal;
