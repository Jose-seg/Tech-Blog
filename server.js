const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const signupRoutes = require('./controllers/signupRoutes')
const loginRoutes = require('./controllers/loginRoutes')
const dashboardRoutes = require('./controllers/dashboardRoutes')
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: process.env.SESS_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

app.use(session(sess));

const hbs = exphbs.create({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(loginRoutes);
app.use(signupRoutes);
app.use(dashboardRoutes)
app.use(routes)

app.get('/', (req, res) => {
    res.render('homepage');
  });

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now Listening'));
});