### VULNERABLE WEB APPLICATION (VWAPP)

I tried to imitate OWASP's bwapp. And this got out. Education purpouses only...

# TECHNOLOGIES USED:

backend = nodejs, express.js
frontend = ejs
database = mysql
web server = apache web server

# TO COMPILE:

1.  Install "NODE.JS" (preferably 10.x).
  1.  Make sure, "APACHE WEB SERVER" and "MYSQL" are installed and running.

2.  Creating database
  1.  Make sure your mysql credentials are the same as ".env" ->(DB_USER/DB_PASS)
  2. After this open terminal in the directory of "package.json" and type:
    ```
        npm install
    ```
        then:
    ```
        npm start
    ```
  3.  Before opening home page create database at mysql, go to ----> localhost:3000/createDB

3.  FINISH
  1.  After that go to ----> localhost:3000/
