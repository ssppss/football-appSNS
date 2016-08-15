require("./lib/spa.min");// 引入spa类库
require("./lib/swiper-3.3.1.min");
require("./views/index");
require("./views/home");
require("./views/find");
require("./views/my");
require("./views/detail");
require("./views/guide");
require("./views/register");

SPA.config({
	indexView:"guide"
})
  