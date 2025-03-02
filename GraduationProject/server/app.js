var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const UserRouter = require("./routes/admin/UserRouter");
const JWT = require("./util/JWT");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

/*
  /adminapi/* - 后台使用
  /webapi/* - 前台使用
 */
app.use((req, res, next) => {
  // 若token有效, 则next
  // 若token过期, 返回401(login/signup界面放行)
  if (
    req.url === "/adminapi/user/login" ||
    req.url === "/adminapi/user/signup"
  ) {
    next();
    return;
  }

  const token = req.headers["authorization"].split(" ")[1];
  if (token) {
    var payload = JWT.verify(token);
    if (payload) {
      const newToken = JWT.generate(
        {
          _id: payload._id,
          account: payload.account,
        },
        "1d"
      );
      res.header("Authorization", newToken);
      next();
    } else {
      res.status(401).send({ errorCode: "-1", errorInfo: "token过期" });
    }
  }
});

app.use(UserRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
