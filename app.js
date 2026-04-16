function login() {
    fetch("http://localhost:4010/login")
      .then(res => res.json())
      .then(data => {
        console.log("Mock数据:", data);
  
        document.getElementById("result").innerText =
          "用户：" + data.data.username + " | Token：" + data.data.token;
      })
      .catch(err => {
        console.error("请求失败:", err);
      });
  }