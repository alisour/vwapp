const path = require('path');
const bodyparser = require('body-parser');
const fs = require('fs');
const DATE_FORMATER = require('dateformat');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const express = require('express');
const app = express();
const mysql = require('mysql');
const server = require('http').Server(app)

const port = process.env.PORT;
//middleware
app.use(cookieParser());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
// check if client sent cookie
app.use(function (req, res, next) {

    var cookie = req.cookies.secret;
    if (cookie === undefined) {
        // no: set a new cookie
        var secretCookie = 'my-little-secret';
        let buff = new Buffer.from(secretCookie);
        secretCookie = buff.toString('base64')

        res.cookie('secret', secretCookie, { maxAge: 900000, httpOnly: true });
    } else {
        // yes, cookie was already present 

    }

    next(); // <-- important!
})

//render html with sent data
app.set("view engine", "ejs");

//assets directory route
app.use(express.static(path.join(__dirname + '/frontend')));
app.use(express.static(path.join(__dirname)));

//important for ejs
app.set("views", path.join(__dirname, "frontend/views"));


//create db connection Enter your mysql credentials
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
});

//connect DB
db.connect((err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log('DB is connected!');
    }
})

//create DB and table -USE THIS IF THIS IS YOUR FIRST TIME RUNNING THIS APP-
app.get('/createDB', (req, res) => {
    let sql = 'CREATE DATABASE sample';
    let sql_2 = 'USE sample';
    let sql_3 = 'CREATE TABLE sample_posts(id int AUTO_INCREMENT, title VARCHAR(50), body VARCHAR(50), PRIMARY KEY(id))'

    let post = { title: 'root', body: 'toor' };
    let sql_4 = 'INSERT INTO sample_posts SET ?';

    let sql_5 = 'CREATE TABLE blog(id int AUTO_INCREMENT, owner VARCHAR(255), date DATETIME, entry VARCHAR(255), PRIMARY KEY(id))'

    let sql_6 = 'CREATE TABLE xssStored(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))'

    let sql_7 = 'CREATE TABLE movie (id int AUTO_INCREMENT, title VARCHAR(255), release_date VARCHAR(255), main_character VARCHAR(255), movie_genre VARCHAR(255), imdb_link VARCHAR(255), PRIMARY KEY(id));'

    let sql_8 = 'INSERT INTO `movie` (`title`, `release_date`, `main_character`, `movie_genre`, `imdb_link`) VALUES ? '

    var movie = [
        ['Iron Man', '2008', 'Tony Stark', 'action', 'http://www.imdb.com/title/tt0371746'],
        ['World War Z', '2013', 'Gerry Lane', 'horror', 'http://www.imdb.com/title/tt0816711'],
        ['Terminator Salvation', '2009', 'John Connor', 'sci-fi', 'http://www.imdb.com/title/tt0438488'],
        ['The Dark Knight Rises', '2012', 'Bruce Wayne', 'action', 'http://www.imdb.com/title/tt1345836'],
        ['The Fast And The Furious', '2001', 'Brian O\'Connor', 'action', 'http://www.imdb.com/title/tt0232500']
    ];

    //create database
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(result);
        }
    })

    //table add sample_posts
    db.query(sql_2, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            db.query(sql_3, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(result)
                }
            })
        }
    })

    //create root/root in sample_posts
    db.query(sql_2, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result)
            db.query(sql_4, post, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(result)
                }
            })
        }
    })
    //add blog table
    db.query(sql_2, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result)
            db.query(sql_5, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(result)
                }
            })
        }
    })

    //add xss_stored table
    db.query(sql_2, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result)
            db.query(sql_6, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(result)
                }
            })
        }
    })

    //add movies table
    db.query(sql_2, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result)
            db.query(sql_7, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(result)
                }
            })
        }
    })

    //add movie details
    db.query(sql_2, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result)
            db.query(sql_8, [movie], (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(result)
                }
            })
        }
    })



    res.send('DB created!');
})

//inster post1 into DB
app.get('/insertPost1', (req, res) => {
    let post = { title: 'root', body: 'root' };
    let sql_4 = 'INSERT INTO posts SET ?';
    let query = db.query(sql_4, post, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send('Data Has Been Posted..!');
        }
    });
})

//insert post2 into DB
app.get('/insertPost2', (req, res) => {
    let post = { title: 'Post Two', body: 'This Is Post Two' };
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send('Data Has Been Posted..!');
        }
    });
})

//select posts from DB
app.get('/getPosts', (req, res) => {
    let sql = 'SELECT * FROM posts';
    let query = db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send('Posts Fetched..!');
        }
    });
})

//select one post from DB
app.get('/getPost/:id', (req, res) => {
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send('Post Fetched..!');
        }
    });
})

//update post from DB
app.get('/updatePost/:id', (req, res) => {
    let newTitle = 'Updated Title';
    let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send('Post Updated..!');
        }
    });
})


//delete post from DB
app.get('/deletePost/:id', (req, res) => {
    let newTitle = 'Updated Title';
    let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send('Post Deleted..!');
        }
    });
})

//html pages
app.get('/', function (req, res) {
    res.render('index')
});
//get html injection - reflected page
app.get('/htmlInjectionReflectedGet', function (req, res) {
    res.render('htmlInjectionReflectedGet')
});
//get html injection - stored page
app.get('/htmlInjectionStoredBlog', function (req, res) {
    let sql = 'USE sample'
    let sql_2 = 'SELECT * FROM blog LIMIT 0, 50'


    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result)
            db.query(sql_2, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(result)

                    res.render("htmlInjectionStoredBlog", { message: result });
                }
            })
        }

    })
});
//get broken authentication weak password page
app.get('/brokenAuthenticationWeakPassword', function (req, res) {
    res.render('brokenAuthenticationWeakPassword')
});
//get csrf page
app.get('/crossSiteRequestForgery', function (req, res) {
    res.render('crossSiteRequestForgery', { message: '' })
});
//get session management administrative portals page
app.get('/sessionManagementAdministrativePortals', function (req, res) {
    res.render('sessionManagementAdministrativePortals', { message: req.query.admin })
});
//get cross site script reflected page
app.get('/crossSiteScriptingReflectedGet', function (req, res) {
    res.render('crossSiteScriptingReflectedGet', { message: req.body.firstname })
});
//get unvalidated directs forwards page
app.get('/unvalidatedDirectsForwards1', function (req, res) {
    res.render('unvalidatedDirectsForwards1', { link: '' })
});
//get directory traversal - directories
app.get('/directoryTraversalDirectories', function (req, res) {
    let dirName = path.join(__dirname + '/frontend/' + req.query.document)
    let pathName = req.query.document;
    let fileName = [];

    fileName = fs.readdirSync(dirName);

    res.render('directoryTraversalDirectories', { pathName: pathName, fileName: fileName })
})
//get xss stored
app.get('/crossSiteScriptingStored', function (req, res) {
    let sql = 'USE sample'
    let sql_2 = 'SELECT * FROM xssStored LIMIT 0, 50'


    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result)
            db.query(sql_2, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(result)

                    res.render("crossSiteScriptingStored", { message: result });
                }
            })
        }

    })
});
//get base64 encoding (secret)
app.get('/base64EncodingSecret', function (req, res, next) {
    res.render('base64EncodingSecret');
})
//get sql injection search
app.get('/sqlInjectionSearch', function (req, res) {

    res.render('sqlInjectionSearch', { message: '' });
})
//get sql injection - stored page
app.get('/sqlInjectionStoredBlog', function (req, res) {
    let sql = 'USE sample'
    let sql_2 = 'SELECT * FROM blog LIMIT 0, 50'


    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result)
            db.query(sql_2, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(result)

                    res.render("sqlInjectionStoredBlog", { message: result });
                }
            })
        }

    })
});
//AFTER THIS PART IS
//APP.POST
//post xss reflected
app.post('/crossSiteScriptingReflectedGet', function (req, res) {
    res.render('crossSiteScriptingReflectedGet', { message: req.body.firstname })
})
//post csrf
app.post('/crossSiteRequestForgery', function (req, res) {
    console.log(req.body.firstname + ' ' + req.body.lastname)
    let user = '"root"';
    if (req.body.firstname != req.body.lastname) {//error
        res.render('crossSiteRequestForgery', { message: 'Invalid input!' })
    } else {//not error
        let sql = 'USE sample'
        let sql_2 = `UPDATE sample_posts SET body = '${req.body.firstname}' WHERE title = ${user}`;

        db.query(sql, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                console.log(result)
                db.query(sql_2, (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(result);
                    }
                })
            }

        })
        res.render('crossSiteRequestForgery', { message: 'Password changed!' })
    }
});
//post html injection blog
app.post('/htmlInjectionStoredBlog', function (req, res) {
    let user = 'root'
    let date = DATE_FORMATER(new Date(), "yyyy-mm-dd HH:MM:ss");
    let entry = req.body.entry
    let sql = 'USE sample'
    let sql_2 = `INSERT INTO blog SET ?`;
    let sql_3 = 'SELECT * FROM blog LIMIT 0, 50'
    let post = { owner: user, date: date, entry: entry };


    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result)
            db.query(sql_2, post, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(result);

                    db.query(sql_3, (err, result) => {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log(result)

                            res.render("htmlInjectionStoredBlog", { message: result });
                        }
                    })

                }
            })
        }
    })
})
//post xss stored
app.post('/crossSiteScriptingStored', function (req, res) {
    let user = 'root'
    let entry = req.body.entry
    let sql = 'USE sample'
    let sql_2 = `INSERT INTO xssStored SET ?`;
    let sql_3 = 'SELECT * FROM xssStored LIMIT 0, 50'
    let post = { title: user, body: entry };

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result)
            db.query(sql_2, post, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(result);

                    db.query(sql_3, (err, result) => {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log(result)

                            res.render("crossSiteScriptingStored", { message: result });
                        }
                    })

                }
            })
        }
    })
})
//sql injection search (get)
app.post('/sqlInjectionSearch', function (req, res) {
    let title = req.body.entry
    let sql = 'USE sample'
    let sql_2 = `SELECT * FROM movie WHERE title LIKE ${'\"%' + title + '%\"'}`

    let query = db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);

            db.query(sql_2, (err, result) => {
                if (err) {
                    console.log(err)
                    res.render('sqlInjectionSearch', { error: err, message: undefined });

                } else {
                    console.log(result)
                    res.render('sqlInjectionSearch', { message: result });

                }
            })
        }
    })


})
//post sql injection blog
app.post('/sqlInjectionStoredBlog', function (req, res) {
    let user = 'root'
    let date = DATE_FORMATER(new Date(), "yyyy-mm-dd HH:MM:ss");
    let entry = req.body.entry
    let sql = 'USE sample'
    let sql_2 = `INSERT INTO blog (date, entry, owner) VALUES ( ${'\"' + date + '\"'}, ${'\"' + entry + '\"'}, ${'\"' + user + '\"'})`;
    let sql_3 = 'SELECT * FROM blog LIMIT 0, 50'


    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result)
            db.query(sql_2, (err, result) => {
                if (err) {
                    console.log(err)

                    res.render("sqlInjectionStoredBlog", { message: undefined, error: err });
                } else {
                    console.log(result);

                    db.query(sql_3, (err, result) => {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log(result)

                            res.render("sqlInjectionStoredBlog", { message: result });
                        }
                    })

                }
            })
        }
    })
})
//post unvalidated Directs Forwards
app.post('/unvalidatedDirectsForwards1', function (req, res) {
    res.render('unvalidatedDirectsForwards1', { link: req.body.inputLink });
})
//LISTEN SERVER
server.listen(port, () => {
    console.log('Server is running at ', port);
});