document.getElementById('loginForm').addEventListener('submit',
    function (event){
        event.preventDefault();

    const email = document.getElementById('email').value
    const password = document.getElementById('password').value


    axios.post('http://localhost:3000/user/login', {
        email: email,
        password: password
    })
        .then(res => {
            const token=res.data.token
            localStorage.setItem('token', token);
            console.log(token)
            window.location.href='./mainPage.html'
        })
        .catch(error => {
            console.log(error);
            alert(error.response.data.message)
        });

    }
)