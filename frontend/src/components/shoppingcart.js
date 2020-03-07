import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Button from '@material-ui/core/Button';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import Typography from '@material-ui/core/Typography';
import Image from './burger.jpg';

const sample_menu_item1 = {
    name: "burger",
    description: "desc1",
    price: 5,
    sold_out: false,
    stock: 12
  };
  
  const sample_menu_item2 = {
    name: "fries",
    description: "desc2",
    price: 2,
    sold_out: false,
    stock: 20
  };

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  buttonDisplay:{
    display: 'inline-block',
    width: 20,
    height: 20,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));


const tileData = [
  {
    img: Image,
    title: 'Restaurant',
    author: 'Item From Restaurant',
  },
];
/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */

export default class ShoppingCart extends Component {
    
    constructor(props){
      super(props);
      
      this.state = {
        order_items: [],
        item_order_counts: []
      };
    }

    incrementItem = index => {
        let counts = [...this.state.item_order_counts];
        counts[index]++;
        this.setState({ item_order_counts: counts });
      };
    
      decreaseItem = index => {
        let counts = [...this.state.item_order_counts];
        counts[index]--;
        this.setState({ item_order_counts: counts });
      };

      componentDidMount() {
        let items = [];
        items.push(sample_menu_item1);
        items.push(sample_menu_item2);
        let counts = [];
        counts.push(0);
        counts.push(0);
        this.setState({ order_items: items, item_order_counts: counts });
      }
    

  render(){
   
  return (
      
    <div className={useStyles.root}>
       
      <GridList cellHeight={180} className={useStyles.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">My Shopping Cart</ListSubheader>
        
        </GridListTile>
        
        {tileData.map(tile => (
          <GridListTile key={tile.img}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
            
              title={tile.title}
              subtitle={<span>{tile.author}</span>}
              actionIcon={
                <IconButton aria-label={`info about ${tile.title}`} className={useStyles.icon}>
                  <InfoIcon />
                </IconButton>
              }
              
            />
           
          </GridListTile>
          
        ))}
        <AddCircleIcon></AddCircleIcon>
        <RemoveCircleIcon></RemoveCircleIcon>
      </GridList>
      
      
      <Button variant="contained" color="primary">Checkout</Button>
 
    </div>
  );
}
}
