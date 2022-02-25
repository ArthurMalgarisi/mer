import * as React from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment'
import { useSelector, useDispatch } from 'react-redux';
import {changeVisibleDetailsDialog, editStorageList, addProduct } from '../action'
import { STORAGE_CHANGE_CHILD_VALUE, STORAGE_CHANGE_VALUE } from "../../../constants/actionTypes";
import { getReducer } from '../../../utils';
import productDetails from '../reducer'


function DetailsDialog() {
  const dispatch = useDispatch()

  const product= useSelector( state => state.storage.productDetails)
  const show= useSelector( state => state.storage.showDetails)
  const productsList = useSelector( state => state.storage.productsList)
  const edit = useSelector( state => state.storage.edit)

  const handleClose = () => {
    dispatch(changeVisibleDetailsDialog(false));
  };

  const handleAddProduct = () => {
  dispatch(addProduct(product))
  }

  const editProduct = () => {
    dispatch(editStorageList(product))
  }

  const handleChangeValue = (value, property ) => {
    dispatch({ type: STORAGE_CHANGE_CHILD_VALUE, key: 'productDetails',property: property , payload: property === 'price' ? moneyMask(value) : value })
  }

  const moneyMask = (value) => {
    value = value.replace('.', '').replace(',', '').replace(/\D/g, '')
  
    const options = { minimumFractionDigits: 2 }
    const result = new Intl.NumberFormat('pt-BR', options).format(
      parseFloat(value) / 100
    )
  
    return 'R$ ' + result
  }

  console.log(product)

  return (
    <Dialog onClose={handleClose} open={show}  maxWidth= 'xs'>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'center'}} variant='h4'>Produto</DialogTitle>
        {product && <Grid container key={product.key} sx={{ p:1, mt: 1, display: "flex", justifyContent: 'space-evenly'  }}>
          <Grid item sx={{ borderRadius: 1}}>
            <TextField  fullWidth label="Produto" value={product.name} onChange={event => handleChangeValue( event.target.value, "name" ) } sx={{ mb: 1}} />
            <TextField  fullWidth label="Preço" value={product.price} onChange={event => handleChangeValue( event.target.value, "price" ) } sx={{ mb: 1}} />           
            <TextField    fullWidth label="Quantidade" value={product.amount} type="number" onChange={event => handleChangeValue( event.target.value, "amount" ) } sx={{ mb: 1}}/>
          </Grid>
          <Grid item  sx={{ borderRadius: 1, m: 1}}>
            <Button fullWidth size='large' sx={{ width: 130, borderRadius: 2 }} variant='contained' onClick={edit ? editProduct : handleAddProduct} >Salvar</Button>
          </Grid>
        </Grid>
       }
    </Dialog>
  )
};

DetailsDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default DetailsDialog;