fetch('https://v2.api.noroff.dev/rainy-days')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error('Error fetching product:', error));


  const imageUrl = 'https://v2.api.noroff.dev/rainy-days';

  const imgElement = document.createElement('img');
  imgElement.src = imageUrl;
  imgElement.alt = 'An orange and grey jacket with a hood';
  document.body.appendChild(imgElement);
  

  fetch('https://v2.api.noroff.dev/rainy-days')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error fetching product:', error));

  /*
  async function registerUser() {
    const url = 'https://v2.api.noroff.dev/auth/register'; // Replace with actual API registration endpoint
    const userData = {
        username: 'ReuelSantos', // Replace with your desired username
        email: 'reusan04123@stud.noroff.no', // Replace with your email
        password: 'WebDev67' // Choose a strong password
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Registration successful:', data);
        return data;
    } catch (error) {
        console.error('Error registering user:', error);
    }
}

// Call the function
registerUser();

*/

fetch('https://v2.api.noroff.dev/auth/register', {  
  method: 'POST',  
  headers: {  
      'Content-Type': 'application/json'  
  },  
  body: JSON.stringify({
    
      "name": "reuelsantos", // Required
      "email": "reusan04123@stud.noroff.no", // Required
      "password": "WebDev67", // Required
      
    
  })  
})  
.then(response => response.json())  
.then(data => console.log('Registration Successful:', data))  
.catch(error => console.error('Error:', error));

