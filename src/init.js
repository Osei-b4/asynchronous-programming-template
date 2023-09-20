// Get posts projcet 
//dom 
const dom = {
    input: document.getElementById('input'),
    btn: document.getElementById('btn'),
    root:document.getElementById('root'),
    err:document.querySelector('.error'),

};

//api 
const getPokemonById = async (id) => {
    try { 
    const res  = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!res.ok) {
    throw new Error(
        `failed to fetch pokemon with status : ${res.status}`,
    ); 
}
   const pokemon = await res.json();
   console.log(pokemon);
   return pokemon;
} catch (err) {
    console.error(err)
    }
};

//components 
const createPokemon = (pokemonData) => {
//container 
const container = document.createElement('div');
container.className = 'pokemon-container';
container.id = pokemonData.id;


//name 
 const name = document.createElement('h2');
 name.innerText = pokemonData.name; 

 //img 
 const img = document.createElement('img');
 img.src = pokemonData.sprites.front_default;
 img.alt = pokemonData.name;

 container.append(name , img);
 return container

}; 




//Handler
const getPokemonHandler = async (e) =>{
    e.preventDefault();  
    
    const id = dom.input.value;
    
    if(id < 0 || id > 1200) {
       dom.err.innerText =  'No valid id';
       dom.err.classList.add('err');
       return; 
    };

    // if error
    dom.err.innerHTML = ''; 
    dom.err.classList.remove('err'); 
    const pokemonData = await getPokemonById(id); 
    const pokemonDom = createPokemon(pokemonData); 
    dom.root.innerHTML = '';
    dom.root.append(pokemonDom);
   
};



// listeners
const getPokemonListener = () => {
dom.btn.addEventListener('click', (e) =>
getPokemonHandler(e)
);
};

getPokemonListener();


