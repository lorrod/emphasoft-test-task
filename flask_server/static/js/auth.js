

check_auth()


function vk_auth() {
  var c = VK.Auth.login(function(response) {
    if (response.session) {
        console.log(response.session);
        window.location='/cabinet';
    } else {
        // Пользователь нажал кнопку Отмена в окне авторизации
    }
},VK.access.FRIENDS);
}




function check_auth () {
  VK.Auth.getLoginStatus(function(response){
  if(response.session)
  {
    window.location='/cabinet';
  }
  });
}
