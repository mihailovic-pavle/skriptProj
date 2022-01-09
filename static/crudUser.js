function user(){

    const cookies = document.cookie.split('=')
    const token = cookies[cookies.length - 1]
    


        fetch('http://localhost:8002/admin/users', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).then(res=>res.json())
        .then(el =>{

            
            
            const content = document.getElementById("content")
            
            
            const list = document.createElement("ul");
            el.forEach(ele => {
                const li = document.createElement("li")
                li.innerText = "Id: " + ele.id + " Email: " + ele.email + " Password: " + ele.password + " Username: " + ele.name
                list.appendChild(li)
            });

            content.append(list)
        })

   
    
        document.getElementById('btnAddUser').addEventListener('click', e =>{
            e.preventDefault()
    
            const data = {
                email: document.getElementById('addEmail').value,
                password: document.getElementById('addPass').value,
                name: document.getElementById('addName').value
            }
    
    
            fetch('http://localhost:8002/admin/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }).then(res=>res.json())
            .then(el =>{
                if(el.msg){
                    alert(el.msg)
                }else{
                    document.cookie = `jwt=${el.jwt};SameSite=Lax`;
                    
                }
            })
    
        })

        document.getElementById('btnDeleteUser').addEventListener('click', e =>{
            e.preventDefault()
    
            fetch(`http://localhost:8002/admin/users/${document.getElementById('deleteUser').value}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                
            }).then(res=>res.json())
            .then(el =>{
                if(el.msg){
                    alert(el.msg)
                }else{
                    document.cookie = `jwt=${el.jwt};SameSite=Lax`;
                    
                }
            })
    
        })
        document.getElementById('btnChangeRoleId').addEventListener('click', e =>{
            e.preventDefault()
    
            const data = {
                roleId: document.getElementById('noviRoleId').value
            }
    
    
            fetch(`http://localhost:8002/admin/users/${document.getElementById('userIdUpdate').value}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }).then(res=>res.json())
            .then(el =>{
                if(el.msg){
                    alert(el.msg)
                }else{
                    document.cookie = `jwt=${el.jwt};SameSite=Lax`;
                    
                }
            })
    
        })
}