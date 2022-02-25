import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import  Grid  from '@mui/material/Grid';
import Switch from '@mui/material/Switch';
import { useSelector, useDispatch } from 'react-redux';
import {changeVisibleDetailsDialog, editUsersList, deleteUsers } from '../action'
import {USERS_CHANGE_CHILD_VALUE, USERS_CHANGE_VALUE, USERS_CHANGE_USERDATA_CHILD_VALUE} from '../../../constants/actionTypes'

function DetailsDialogUser(props) {

  const dispatch = useDispatch()
  const { onClose, deleteProduct, open } = props;

  const primary= useSelector( state => state.users.userData)
  const show= useSelector( state => state.users.showDetails)
  const products= useSelector( state => state.users.userList)
  const edit = useSelector( state => state.users.edit)
 console.log(primary)

  const [checked, setChecked] = React.useState(false)
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  
  const handleClose = () => {
    dispatch(changeVisibleDetailsDialog(false));
  };

  const userDelete = () => {
    dispatch(deleteUsers(primary))
  }

  const editUser = () => {
    console.log("test", primary)
    dispatch(editUsersList(primary))
  }

  const handleChangeValue = (value, key, property ) => {
    dispatch({ type: USERS_CHANGE_USERDATA_CHILD_VALUE, key: key, property: property , payload: value })
  }

  return (
    <Dialog onClose={handleClose} open={show} maxWidth= 'xs' >
      {primary && <Grid container sx={{ p:1}}>
        <Grid container item xs={6} direction="column" key={primary.uid} sx={{  display: 'grid', border: 1, borderRadius: 1}}>
          <Grid item sx={{ m: 0.5, mb:1, justifyContent: 'start'}}>
            <Typography>
              {primary.profile.name}
            </Typography>
          </Grid>
          <Grid item sx={{ m: 0.5, mb: 1, justifyContent: 'start'}}>
            <Typography>
              {primary.profile.email}
            </Typography>
          </Grid>
          <Grid item sx={{ m: 0.5, mb: 1, justifyContent: 'start'}}>
            <Typography>
              {primary.profile.phone}
            </Typography>
          </Grid>
        </Grid>
          <Grid item xs={6} sx={{ justifyContent:'center', display:'flex', alignItems: 'center' }}>
            <Avatar sx={{ width: 100, height: 100}} alt='pessoa' src="" />
          </Grid>
        
        <Grid xs={12} item sx={{ borderRadius: 1, m: 1, display: "flex", justifyContent: 'space-evenly',}}>
          <Button sx={{ width: 130, borderRadius: 2 }} variant='contained' disabled= { primary.accessControl.situation === 'Aprovado'} 
                  onClick={() => handleChangeValue( 'Aprovado', 'accessControl', 'situation')}>Aprovar</Button>      
          <Button sx={{ width: 130, borderRadius: 2 }} variant="contained" onClick={() => userDelete()} >Excluir</Button>      
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-evenly'}}>
          <Typography variant='h6'>
            Administrador
          </Typography>
          <Switch checked={primary.accessControl.adm} onChange={event => handleChangeValue(event.target.checked,"accessControl", "adm")} disabled= {primary.accessControl.situation === 'Pendente' }/> 
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-evenly'}} >
          <Button onClick={editUser} variant='contained' sx={{width: 130, borderRadius: 2}}>Salvar</Button>
        </Grid>
      </Grid>}
    </Dialog>
  );
}

DetailsDialogUser.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default DetailsDialogUser

