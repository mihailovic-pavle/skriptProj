function post(){

    const cookies = document.cookie.split('=')
    const token = cookies[cookies.length - 1]
    


        fetch('http://localhost:8002/admin/posts', {
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
                li.innerText = "Id: " + ele.id + "  Content(Name): " + ele.name + "| UserId: " + ele.userId + " Likes: " + ele.likes
                list.appendChild(li)
            });

            content.append(list)
        })

   
    
        document.getElementById('btnAddPost').addEventListener('click', e =>{
            e.preventDefault()
    
            const data = {
                name: document.getElementById('addPostName').value,
                userId: document.getElementById('addUserIdPost').value
            }
    
    
            fetch('http://localhost:8002/admin/posts', {
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

        document.getElementById('btnDeletePost').addEventListener('click', e =>{
            e.preventDefault()
    
            fetch(`http://localhost:8002/admin/posts/${document.getElementById('deletePost').value}`, {
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
        document.getElementById('btnUpdateLikes').addEventListener('click', e =>{
            e.preventDefault()
    
            const data = {
                likes: document.getElementById('brojLikova').value
            }
    
    
            fetch(`http://localhost:8002/admin/posts/${document.getElementById('postLikeUpdate').value}`, {
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