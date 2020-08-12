var hbs = require("hbs");

hbs.registerHelper("ifPublicRoute", function(type, isAuth, options) {
  //console.log(options)
  if (type === "login" || type === "register" || (type === "home" && !isAuth)) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});