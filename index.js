import Autocomplete from './Autocomplete';
import states from './states';
import './main.css';


// US States
const data = states.map(state => ({
  text: state.name,
  value: state.abbreviation
}));

new Autocomplete(document.getElementById('state'), {
  data,
  onSelect: (stateCode) => {
    document.getElementById('displayState').innerHTML = stateCode
  },
  inputId: 'state-input',
  currentFocus: -1
});

// Github Users
 new Autocomplete(document.getElementById('gh-user'), {
  onSelect: (data) => {
    document.getElementById('displayUser').innerHTML = data
   },
     inputId: 'gh-user-input',
     currentFocus: -1
 });
