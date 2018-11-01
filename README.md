# Getlancer Bidding

Getlancer Bidding, part of Getlancer Suite (Bidding, Quote, Jobs, Portfolio) is an open source service marketplace script that is capable to run sites similar to Freelancer clone. It is written in AngularJS with REST API for high performance in mind.

> This is project is part of Agriya Open Source efforts. Getlancer was originally a paid script and was selling around 60000 Euros. It is now released under dual license (OSL 3.0 & Commercial) for open source community benefits.

![bidding_banner](https://user-images.githubusercontent.com/4700341/47850851-b734fb80-ddfc-11e8-9891-326cbf79601a.png)


## Support

Getlancer Bidding is an open source project. Full commercial support (commercial license, customization, training, etc) are available through [Getlancer  platform support](https://www.agriya.com/products/freelancer-clone)

Theming partner [CSSilize for design and HTML conversions](http://cssilize.com/)

## Getlancer Suite

Agriya Getlancer Suite is a complete freelancer marketplace platform that caters to bidding, quote, jobs and portfolio business models. Any website can be built in combination of these modules, say with bidding and quote, or with all, etc.

* Getlancer Bidding - bidding marketplaces like or clone of Freelancer, Guru, elance, Scriptlance, oDesk, Redbeacon, PeoplePerHour, McroWorkers, etc
* Getlancer Quote - quote marketplaces like or clone of Thumbtack, Zaarly, Localmind, Redbeacon, TaskRabbit, Urgntly, HouseJoy
* Getlancer Jobs - jobs marketplaces like or clone of Startuply, Coroflot, AuthenticJobs, Guru, WorkInStartups, dribbble, behance
* Getlancer Portfolio - portfolio based marketplaces like or clone of dribbble, behance, Coroflot



## How it works

[Freelancer clone](https://www.agriya.com/products/freelancer-clone) script defines two communities, Employer and Freelancer. Employers to post the project with all necessary details and upload it within minutes. Now freelancer browse apt projects and bid. After freelancer completed the project based on winner selected by employer, employer accept that completion and release the payment.

As well as employer can Hire freelancer. Which is used to search suitable freelancer for your projects effortlessly.
 

![bidding_work_done](https://user-images.githubusercontent.com/4700341/47850850-b69c6500-ddfc-11e8-991a-86cf18c26ba3.png)

## Features

### Geo Location Based Listing

Ease of finding your local service provider with our Geo-based listing functionality with crystal clear accuracy.
  
### Intuitive Category Management

Whatever be your business model is, we made our script with dynamic form builder whereby you can create any service to the extent without having any difficulties.

### Dual Sign up

Take pleasure in registering to the freelancer bidding site both as freelancer or employers. It assures hassle-free registration process

### Interoperability

Tired of updating the website whenever the new trend unveils? Agriya's Getlancer Suite is power-packed with Front and Back approach. So you can have an absolute freedom to customize the website easily with your intended data metrics.

### AI Enabled Script

Most of the functionalities are automated as it feels the current stats and takes you to the intended space where you can obtain your needed data as well. We indulged with bot mechanism with the script to make it more friendly with the search engines.

## Getting Started

### Prerequisites

#### For deployment

* PostgreSQL >= 9.4
* PHP >= 5.5.9 with OpenSSL, PDO, Mbstring, JSON and cURL extensions
* Nginx (preferred) or Apache

#### For building (build tools)

* Nodejs
* Composer
* Bower
* Grunt

### Setup

* PHP dependencies are handled through `composer` (Refer `/server/php/Slim/`)
* JavaScript dependencies are handled through `bower` (Refer `/client/`)
* Needs writable permission for `/tmp/` and `/media/` folders found within project path
* Build tasks are handled through `grunt`
* Database schema `/sql/getlancer_with_sample_data.sql`
* Cron with below:
```bash
# Common
*/2 * * * * /{$absolute_project_path}/server/php/Slim/shell/main.sh 1 >> /{$absolute_project_path}/tmp/logs/shell.log 2 >> /{$absolute_project_path}/tmp/logs/shell.log
```

### Contributing

Our approach is similar to Magento. If anything is not clear, please [contact us](https://www.agriya.com/contact).

All Submissions you make to Getlancer through GitHub are subject to the following terms and conditions:

* You grant Agriya a perpetual, worldwide, non-exclusive, no charge, royalty free, irrevocable license under your applicable copyrights and patents to reproduce, prepare derivative works of, display, publicly perform, sublicense and distribute any feedback, ideas, code, or other information ("Submission") you submit through GitHub.
* Your Submission is an original work of authorship and you are the owner or are legally entitled to grant the license stated above. 


### License

Copyright (c) 2014-2018 [Agriya](https://www.agriya.com/).

Dual License (OSL 3.0 & [Commercial License](https://www.agriya.com/contact)) 
