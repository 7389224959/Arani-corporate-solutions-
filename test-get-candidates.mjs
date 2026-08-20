fetch('http://localhost:3000/api/candidates')
  .then(res => res.json())
  .then(data => {
    console.log('Got candidates length:', data.length);
    console.log('Sample candidate:', data[0]);
  })
  .catch(console.error);
