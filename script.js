<script src="https://accounts.google.com/gsi/client" async defer></script>
  <script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js"></script>
  <script>
    function showSection(id) {
      document.querySelectorAll('.login-section, .cabinet-section, .chat-section')
        .forEach(el => el.classList.add('hidden'));
      document.getElementById(id).classList.remove('hidden');
    }

    function handleCredentialResponse(response) {
      const jwt = response.credential;
      const payload = JSON.parse(atob(jwt.split('.')[1]));
      localStorage.setItem("user", JSON.stringify(payload));
      localStorage.setItem("username", payload.name);
      initApp();
    }

    window.fbAsyncInit = function () {
      FB.init({ appId: 'ВАШ_FACEBOOK_APP_ID', cookie: true, xfbml: true, version: 'v19.0' });
    };

    document.getElementById("facebook-login").onclick = function () {
      FB.login(function (response) {
        if (response.authResponse) {
          FB.api('/me', { fields: 'name,email,picture' }, function (profile) {
            localStorage.setItem("user", JSON.stringify(profile));
            localStorage.setItem("username", profile.name);
            initApp();
          });
        } else {
          alert("Ошибка входа через Facebook");
        }
      }, { scope: 'public_profile,email' });
    };

    document.getElementById("apple-login").onclick = function () {
      const clientId = 'ВАШ_APPLE_SERVICE_ID';
      const redirectUri = encodeURIComponent(window.location.href);
      const state = Math.random().toString(36).substring(7);
      const nonce = Math.random().toString(36).substring(7);
      const url = `https://appleid.apple.com/auth/authorize?response_type=code%20id_token&client_id=${clientId}&redirect_uri=${redirectUri}&scope=name%20email&response_mode=fragment&state=${state}&nonce=${nonce}`;
      window.location.href = url;
    };

    function logout() {
      localStorage.clear();
      showSection('login');
    }

    function initApp() {
      const username = localStorage.getItem("username") || 'Гость';
      document.getElementById("username").textContent = `Здравствуйте, ${username}!`;
      showSection('cabinet');
    }

    window.onload = function () {
      if (localStorage.getItem("user")) {
        initApp();
      } else {
        showSection('login');
      }
    }
  </script>
