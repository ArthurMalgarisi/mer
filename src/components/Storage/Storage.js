import React, {  useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { Div } from '../../components'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import DetailsDialog from "./Details/DetailsDialog"
import EditIcon from '@mui/icons-material/Edit';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogDelete from './Details/DialogDelete'
import {addAmount, changeVisibleDetailsDialog, deleteStorage, loadStorageList, removeAmount} from './action'
import {STORAGE_CHANGE_VALUE} from '../../constants/actionTypes'
import IconButton from '@mui/material/IconButton';

const Storage = () => {

    const dispatch = useDispatch()

    const products= useSelector( state => state.storage.productsList)

    const handleOpen = (data) => {
        dispatch(changeVisibleDetailsDialog(true, data));
    };

    const [dele, setDele] = useState(false); 
    const [ prodKey, setProdKey ] = useState('');

    useEffect(() => {
        if(!products){
            dispatch(loadStorageList())
        }
    }, [])

    const handleDele = (key) => {
        setDele(true);
        setProdKey(key);
    };

    const handleDelete = () => {
        setDele(false);
        setProdKey('');
    };

    const deleteProduct = () => {
        dispatch(deleteStorage(prodKey))
        handleDelete()
    }

    const handleAddAmount = (product) => {
        const newData = {...product, amount: product.amount + 1}
        dispatch(addAmount(newData))
    }
    const handleRemoveAmount = (product) => {
        const newData = {...product, amount: product.amount - 1}
        dispatch(removeAmount(newData))
    }

    const userData = useSelector( state => state.appReducer.user )
    const isAdm = userData.accessControl?.adm

    const moneyMask = (value) => {
        const strValue = String (value)
        value = strValue.replace('.', '').replace(',', '').replace(/\D/g, '')
      
        const options = { minimumFractionDigits: 2 }
        const result = new Intl.NumberFormat('pt-BR', options).format(
          parseFloat(value) / 100
        )
      
        return 'R$ ' + result
      }

    return (
        <Div sx={{ width: '100%', display: "flex", justifyContent: 'center' }}>
        <Grid container direction='column' sx={{ width: '80%' }} >
            <Grid container item  sx={{  backgroundColor: '#fff', border: 2, borderRadius: 1, mb: 1, mt: 2}}>
                <Grid item xs= {3} sx={{ display: "flex", alignItems: 'center', justifyContent: 'center'}} >
                    <Typography>
                       Produto
                    </Typography>
                </Grid>
                <Grid item xs={3} sx={{ display: "flex", alignItems: 'center', justifyContent: 'center'}}>
                    <Typography>
                        Preço
                    </Typography>
                </Grid> 
                <Grid item xs={2} sx={{ display: "flex", alignItems: 'center', justifyContent: 'center'}}>
                    <Typography>
                        Quantidade
                    </Typography>
                </Grid> 
                <Grid item xs={2} sx={{ display: "flex", alignItems: 'center', justifyContent: 'center'}}>
                    <Typography>
                        Editar
                    </Typography>
                </Grid> 
                <Grid item xs={2} sx={{ display: "flex", alignItems: 'center', justifyContent: 'center'}}>
                    <Typography>
                        Excluir
                    </Typography>
                </Grid> 
            </Grid>

            <Grid container item direction='column'  sx={{  backgroundColor: '#fff', border: 2, borderRadius: 1}}>
                { products && products.map(product => (
                    <Grid container item key={product.key} >
                    <Grid item xs= {3} sx={{ display: "flex", alignItems: 'center', justifyContent: 'center'}} >
                        <Typography>
                            {product.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={3} sx={{ display: "flex", alignItems: 'center', justifyContent: 'center'}}>
                        <Typography>
                          { moneyMask(product.price)}
                        </Typography>
                    </Grid> 
                    <Grid item xs={2} sx={{ display: "flex", alignItems: 'center', justifyContent: 'space-around'}}>
                        <IconButton onClick={() => handleRemoveAmount(product)} disabled={ product.amount === 0 }>
                            <RemoveIcon/>
                        </IconButton>
                        <Typography >
                            {product.amount}
                        </Typography>
                        <IconButton onClick={() => handleAddAmount(product)}>
                            <AddIcon  />
                        </IconButton>
                    </Grid> 
                    <Grid item xs={2} sx={{ display: "flex", alignItems: 'center', justifyContent: 'center'}} >
                        <IconButton onClick={() => handleOpen(product) }>
                            <EditIcon/>
                        </IconButton>
                    </Grid>
                    <Grid item xs={2} sx={{ display: "flex", alignItems: 'center', justifyContent: 'center'}} >
                        <IconButton disabled={ isAdm === false } onClick={() => handleDele(product.key) }>
                            <DeleteIcon/>
                        </IconButton>
                    </Grid>
                </Grid>
                ))}
            </Grid> 
        </Grid>
        <DetailsDialog/>
        <DialogDelete
            dele={dele}
            onClose={handleDelete}
            deleteProduct={deleteProduct}
        />
        { isAdm &&  <Fab color='secondary' arial-label="add" sx={{ position: 'fixed', right: 25, bottom: 25}} onClick={() => handleOpen() }>
            <AddIcon />
        </Fab>}
        
            
        </Div>
    )
} 

export default Storage;