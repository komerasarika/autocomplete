class Autocomplete {
  constructor(rootEl, options = {}) {
    Object.assign(this, { rootEl, numOfResults: 10, data: [], options });
    this.init();
  }

  init() {
    // Build query input
    this.inputEl = this.createQueryInputEl();
    this.rootEl.appendChild(this.inputEl)

    // Build results dropdown
    this.listEl = document.createElement('ul');
    Object.assign(this.listEl, { className: 'results' });
    this.rootEl.appendChild(this.listEl);
  }

  createQueryInputEl() {
    const inputEl = document.createElement('input');
    Object.assign(inputEl, {
      type: 'search',
      id: this.options.inputId,
      name: 'query',
      autocomplete: 'off'
    });
    inputEl.addEventListener('input', event => 
    {
      let selectedInput = 0
        if(event.target.id !== 'state-input') {
          selectedInput = 1
        }
        this.selectedInput = selectedInput
      document.querySelectorAll('ul')[selectedInput].style.display = 'block'
      this.onQueryChange(event.target.value)});

      // for accesssing key up and down
      inputEl.addEventListener("keydown", (e) => {
        let selectedInput = 0
        if(e.target.id !== 'state-input') {
          selectedInput = 1
        }
        var x = document.querySelectorAll('ul')[selectedInput];
        if (x) x = x.getElementsByTagName("li");
        if (e.keyCode == 40) {  //keydown
          this.options.currentFocus++;
          addActive(x,this.options.currentFocus);
        } else if (e.keyCode == 38) { //up
          
          this.options.currentFocus--;
          addActive(x,this.options.currentFocus);
        } else if (e.keyCode == 13) {
         // enter 
          e.preventDefault();
          if (this.options.currentFocus > -1) {
            if (x) x[this.options.currentFocus].click();
          }
        }
    });
    
    function addActive(x,currentFocus) {
      if (!x) return false;
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      x[currentFocus].classList.add("active");
    }
    function removeActive(x) {
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("active");
      }
    }
    
    return inputEl;
  }

  createResultsEl(results) {
    const fragment = document.createDocumentFragment();
    results.forEach((result) => {
      const el = document.createElement('li');
      Object.assign(el, {
        className: 'result',
        textContent: result.text,
      });

      // Pass the value to the onSelect callback
      el.addEventListener('click', (event) => {
        const { onSelect } = this.options;
  
        if (typeof onSelect === 'function') onSelect(result.value);
        
        document.querySelectorAll('ul')[this.selectedInput].style.display = 'none'
      });

      fragment.appendChild(el);
    })
    return fragment;
  }


   onQueryChange(query) {
    if(query != '' && this.rootEl.className == 'user') {
       fetch(`https://api.github.com/search/users?q=${query}&per_page=10`)
        .then(response => response.json())
        .then(payload => {
        
        const formattedItems = payload.items.map((item) => ({
           text: item.login,
           value: item.id
        }))
        // Get data for the dropdown
        let results = this.getResults(query,formattedItems) || [];
        results = results.slice(0, this.options.numOfResults);

        this.updateDropdown(results);
      })
       .catch(error => console.error(error))
       

    }
    
    // Get data for the dropdown
    let results = this.getResults(query, this.options.data) || [];
    results = results.slice(0, this.options.numOfResults);

    this.updateDropdown(results);
  }


  getResults(query, data) {
    if (!query) return [];

    // Filter for matching strings
    let results = data && data.filter((item) => {
      return item.text.toLowerCase().includes(query.toLowerCase());
    });

    return results;
  }

  updateDropdown(results) {
    this.listEl.innerHTML = '';
    this.listEl.appendChild(this.createResultsEl(results));
  }
};

export default Autocomplete;