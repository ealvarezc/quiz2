// GET /login   -- Formulario de login
exports.new = function(req, res){
  var errors = req.session.errors || {};
  req.session.errors = {};

  res.render('sessions/new', { errors: errors });
};

// POST /login   -- Crea la sesion
exports.create = function(req, res){
  var login = req.body.login;
  var password = req.body.password;

  var userController = require('./user_controller');
  userController.autenticar(login, password, function(error, user){

    if(error){  // si hay error retorna mensaje de error de sesion
      req.session.errors = [{"message": 'Se ha producido un error: ' + error}];
      res.redirect("/login");
      return;
    }

    // Crea req.session.user y guarda campos id y username
    // La sesion se define por la existencia de req.session.user
    req.session.user = { id: user.id, username: user.username };

    // redirecciona a path anterior a login
    res.redirect(req.session.redir.toString());
  });
};

// DELETE /logout  --Destruye sesion
exports.destroy = function(req, res){
  delete req.session.user;
  // Redirecciona a path anterior a login
  res.redirect(req.session.redir.toString());
};
