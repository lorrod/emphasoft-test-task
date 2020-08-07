
//Проверяем авторизован ли пользователь
// если нет - перенаправляем на страницу авторизации
check_auth()
//
get_friends()

function friendAdd(name, surname, image_url) {

  let friend_name = document.createElement('p');
  friend_name.innerText = surname + " " + name;

  let div = document.createElement('div');
  div.className = 'friend';

  let img = document.createElement("img");
  img.src = image_url;
  img.style.objectFit = 'cover';
  img.setAttribute("alt", surname + " " + name)

  var friend_container = document.getElementById("friends");

  div.appendChild(friend_name)
  div.appendChild(img)
  friend_container.appendChild(div)

}

function get_one_friend () {
VK.Api.call('friends.get', {
	fields: 'photo_200_orig',
  count: '1',
  order: 'random',
  v:"5.73"
}, function(data){
	if(!data.error)
	{
		if(data.response.count > 0)
		{
			var friend = data.response.items[0];
			if(friend.photo_200_orig
        && friend.first_name.indexOf('DELETED') == -1
        && friend.deactivated == undefined
        && friend.photo_200_orig != "https://vk.com/images/camera_200.png?ava=1")
			{
        console.log("from get ONE")
        console.log(friend);
        friendAdd(friend.first_name, friend.last_name, friend.photo_200_orig);
        return true;
			}
		}
    return false;
	}
	else
	{
		if(data.error.error_code == 7)
		{
			isLogged = false;
			$('div#login-bar').show();
			$('div#logout-bar').hide();
		}
		else
		{
      var info = getElementById("server_info");
      info.innerText == data.error.error_msg
      info.innerText += "\nПерезагрузите страницу позднее."
		}
    return false
	}
});
}

function get_friends () {
VK.Api.call('friends.get', {
	fields: 'photo_200_orig',
  count: '5',
  order: 'random',
  v:"5.73"
}, function(data){
	if(!data.error)
	{
    console.log(data.length);
		if(data.response.count > 0)
		{
			for(i = 0; i < 5; i++)
			{
				var friend = data.response.items[i];
				if(friend.photo_200_orig
          && friend.first_name.indexOf('DELETED') == -1
          && friend.deactivated == undefined
          && friend.photo_200_orig != "https://vk.com/images/camera_200.png?ava=1")
				{
        console.log("from get friends")
        console.log(friend);
          friendAdd(friend.first_name, friend.last_name, friend.photo_200_orig);
				} else {
          add_another = get_one_friend();
          while (add_another) {
            add_another = get_one_friend();
          }
        }
			}
		}
	}
	else
	{
		if(data.error.error_code == 7)
		{
			isLogged = false;
			$('div#login-bar').show();
			$('div#logout-bar').hide();
		}
		else
		{
      var info = getElementById("server_info");
      info.innerText == data.error.error_msg
      info.innerText += "\nПерезагрузите страницу позднее."
		}
    return false
	}
});
}


function call_friends() {
  VK.Api.call('users.get', {user_ids: 6492, v:"5.73"}, function(r) {
  if(r.response) {
    alert('Привет, ' + r.response[0].first_name);
  }
});
}


function logout () 	{
    var k = VK.Auth.logout();
    window.location='/auth';
};


function check_auth () {
  VK.Auth.getLoginStatus(function(response){
	if(!response.session)
	{
    window.location='/auth';
    return
	} else {
    get_usrData()
    //в документации,что присутсвует поле user, но его не было при тестировании
    if (response.session.user) {
      greetingUsr(response.session.user)
    } else {
      get_usrData()
    }
  }
  });
}

function get_usrData () {
  VK.Api.call('users.get', {v:"5.73"}, function(response){
	if(!response.response)
	{
    var info = getElementById("server_info");
    info.innerText == response.error.error_msg
    info.innerText += "\nПерезагрузите страницу позднее."
	} else {
    var load_info = document.getElementById("load_info").innerText = '';
    console.log(response.response);
    greetingUsr(response.response[0])

  }
});
}


function greetingUsr(user_data){
    var user_greeting = document.getElementById('personal_info');
    user_greeting.innerText = 'Добро пожаловать, '+user_data.last_name+' '+user_data.first_name+'!';
    user_greeting.innerText += '\nНиже представлены 5 Ваших друзей';
    user_greeting.innerText += '\nПопробуйте угадать кто на фото!';
    var refresh_but = document.getElementById("again");
    refresh_but.style = "visibility: visible;"

}


function refresh() {
  location.reload()
}
