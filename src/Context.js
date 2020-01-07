import React, {useState, useEffect} from "react" //could look into saving this state into local storage


const Context = React.createContext()

function ContextProvider({children}){
    const [allPhotos, setAllPhotos] = useState([])
    const [cartItems, setCartItems] = useState([])

    const url = "https://raw.githubusercontent.com/bobziroll/scrimba-react-bootcamp-images/master/images.json"
    useEffect(()=> {
        fetch(url) //native fetch api provided by react, pulls data from url
            .then(res => res.json())
            .then(data => setAllPhotos(data))
    }, []) //if array is empty, function runs once, if array populated, it runs once AND runs when component in array is changed or loaded

    function toggleFavorite(id){
        const updatedArr = allPhotos.map((photo)=>{
            if (photo.id === id){
                return{
                    ...photo,
                    isFavorite: !photo.isFavorite
                }
            } 
            return photo
        })

        setAllPhotos(updatedArr) //update state
    }

    function addItem(newItem){
        setCartItems(prevItems => [...prevItems, newItem])
        
    }

    function removeFromCart(id) {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id)) //returns new array of items including all of the items EXCEPT the id the image being clicked on
    }

    function emptyCart() {
        setCartItems([])
    }

    return(
        <Context.Provider value={{allPhotos, toggleFavorite, addItem, cartItems, removeFromCart, emptyCart}}>
            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}