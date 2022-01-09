function comment(){

    const cookies = document.cookie.split('=')
    const token = cookies[cookies.length - 1]
    


        fetch('http://localhost:8002/admin/comments', {
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
                li.innerText = "Id: " + ele.id + "  Content(Name): " + ele.name + "| UserId: " + ele.userId + " PostId " + ele.postId + " Likes: " + ele.likes
                list.appendChild(li)
            });

            content.append(list)
        })

   
    
        document.getElementById('btnAddComment').addEventListener('click', e =>{
            e.preventDefault()
    
            const data = {
                content: document.getElementById('addCommentName').value,
                userId: document.getElementById('addUserIdComment').value,
                postId: document.getElementById('addPostIdComment').value
            }
    
    
            fetch('http://localhost:8002/admin/comments', {
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

        document.getElementById('btnDeleteComment').addEventListener('click', e =>{
            e.preventDefault()
    
            fetch(`http://localhost:8002/admin/comments/${document.getElementById('deleteComment').value}`, {
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
        document.getElementById('btnUpdateLikesCmt').addEventListener('click', e =>{
            e.preventDefault()
    
            const data = {
                likes: document.getElementById('brojLikovaCmt').value
            }
    
    
            fetch(`http://localhost:8002/admin/comments/${document.getElementById('commentLikeUpdate').value}`, {
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