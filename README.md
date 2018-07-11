Installation Steps
------------------
# Server Requirements

    ** PHP Version - PHP >= 5.6
        * Extensions
            GD Version - 2.x+
            PCRE Version - 7.x+
            cURL version - 7.x+
            json version - 1.x+
            OpenSSL
            PDO PHP Extension
            mbstring
        * php.ini settings
            max_execution_time - 180 (not mandatory)
            max_input_time - 6000 (not mandatory)
            memory_limit - 128M (at least 32M)
            safe_mode - off
            open_basedir - No Value
            display_error = On
            magic_quotes_gpc = Off
    ** postgres sql : 9.4
    ** ngnix server
        Nodejs
        Composer
        Bower
        Grunt
    Recommended Linux distributions: Centos / Ubuntu / RedHat

# Server Side

### Composer Updation

To Update the Composer, please run the below command in your Project Path.  

* Path - server/php/Slim

        composer install
    
* The above Updation doesn't work to you, need to install Composer, please refer this link **https://getcomposer.org/**  for "**How to install Composer**".

### Database Settings

	* Path - server/php/config.inc.php

    * define('R_DB_DRIVER', 'pgsql');
	* define('R_DB_HOST', 'localhost');
	* define('R_DB_NAME', 'DBNAME');
	* define('R_DB_USER', 'DBUSER');
	* define('R_DB_PASSWORD', 'DBPASSWORD');

### Create database for your project

* Import db from the script

 	sql/getlancer_with_sample_data.sql

# Front Side: 

### You need to install nodejs, bower, grunt.

Go to the path in command prompt. "/client/

* Run the below command, the bower used to download and installed all front-end development libraries.

        bower install

* The npm used to install the all dependencies in the local node_modules folder.

        npm install    

### Need write permission for following folders recursively
 
		/media
		/tmp
		/client/images
		/scripts(only main folder not recursive)				
		/server/php/Slim/shell
 
### Setting up cron
			
        ## Common
        	*/2 * * * * /##DOC_ROOT_PATH/##PROJECT_NAME/server/php/Slim/shell/main.sh 1» /##DOC_ROOT_PATH/##PROJECT_NAME/tmp/logs/shell.log 2» /##DOC_ROOT_PATH/##PROJECT_NAME/tmp/logs/shell.log

        ## Jobs Plugin
		    */2 * * * * /##DOC_ROOT_PATH/##PROJECT_NAME/server/php/Slim/shell/subscription.sh 1» /##DOC_ROOT_PATH/##PROJECT_NAME/tmp/logs/shell.log 2» /##DOC_ROOT_PATH/##PROJECT_NAME/tmp/logs/shell.log
		
		    */2 * * * * /##DOC_ROOT_PATH/##PROJECT_NAME/server/php/Slim/shell/job.sh 1» /var/www/html/tmp/logs/shell.log 2» /var/www/html/tmp/logs/job.log
     
