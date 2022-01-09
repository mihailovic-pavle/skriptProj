function init(){

    const cookies = document.cookie.split('=')
    const token = cookies[cookies.length - 1]
    
    document.getElementById('btnUsers').addEventListener('click', e =>{

        document.cookie = `token${token};SameSite=Lax`
        window.location.href = `/admin/users`

    })

    document.getElementById('btnPosts').addEventListener('click', e =>{

        document.cookie = `token${token};SameSite=Lax`
        window.location.href = `/admin/posts`

    })
    
    document.getElementById('btnComments').addEventListener('click', e =>{

        document.cookie = `token${token};SameSite=Lax`
        window.location.href = `/admin/comments`

    })
  

}
