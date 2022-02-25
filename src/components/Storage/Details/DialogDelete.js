import * as React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { Typography } from '@mui/material';

function DialogDelete(props) {
  const { onClose, deleteProduct, dele } = props;

  return (
    <Dialog onClose={onClose} open={dele}  maxWidth= 'xs'>
        <Grid container sx={{ p:1, mt: 1, display: "flex", justifyContent: 'space-evenly'  }}>
          <Grid item sx={{ borderRadius: 1}}> 
            <Typography variant="h6">Você realmente deseja deleter esse produto?</Typography>
          </Grid>
            
          <Grid item  xs={12} sx={{ borderRadius: 1, m: 1, borderRadius: 1, display: "flex", justifyContent: 'space-evenly'}}>
            <Button  fullWidth size='medium' sx={{ width: 130, borderRadius: 2 }} color="error" variant='contained' onClick={onClose}>Não</Button> 
            <Button fullWidth size='medium' sx={{ width: 130, borderRadius: 2 }}  color="success" variant='contained' onClick={() => deleteProduct() }>Sim</Button>
          </Grid>
        </Grid>
    </Dialog>
  );
}

DialogDelete.propTypes = {
  onClose: PropTypes.func.isRequired,
  dele: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default DialogDelete;